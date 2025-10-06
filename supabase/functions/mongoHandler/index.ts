import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient, ObjectId } from "npm:mongodb@6.3.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MONGODB_URI = Deno.env.get("MONGODB_ATLAS_KEY");
if (!MONGODB_URI) {
  throw new Error("MONGODB_ATLAS_KEY environment variable is not set");
}

const client = new MongoClient(MONGODB_URI);
let db: any = null;

async function connectDB() {
  if (!db) {
    await client.connect();
    db = client.db("shopping_matrix");
    console.log("✅ MongoDB Connected to shopping_matrix database");
  }
  return db;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace('/mongoHandler', '').split("/").filter(Boolean);
    const params = url.searchParams;
    const database = await connectDB();

    console.log(`📥 Request: ${req.method} ${url.pathname}`);

    if (path.length === 0) {
      return new Response(JSON.stringify({ error: "Collection name required" }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const collectionName = path[0];
    const collection = database.collection(collectionName);

    // GET all with optional limit
    if (req.method === "GET" && path.length === 1) {
      const limit = parseInt(params.get("limit") || "20");
      console.log(`📋 Fetching ${collectionName} with limit ${limit}`);
      const data = await collection.find().sort({ createdAt: -1 }).limit(limit).toArray();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // GET with cursor-based pagination
    if (req.method === "GET" && path.length === 2 && path[1] === "cursor") {
      const lastId = params.get("lastId");
      const limit = parseInt(params.get("limit") || "5");
      console.log(`🔄 Cursor pagination for ${collectionName}, lastId: ${lastId}, limit: ${limit}`);
      
      const query = lastId ? { _id: { $lt: new ObjectId(lastId) } } : {};
      const data = await collection.find(query).sort({ _id: -1 }).limit(limit).toArray();
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST create document
    if (req.method === "POST" && path.length === 1) {
      const body = await req.json();
      body.createdAt = new Date();
      console.log(`➕ Creating document in ${collectionName}:`, body);
      
      const result = await collection.insertOne(body);
      return new Response(JSON.stringify({ 
        success: true, 
        insertedId: result.insertedId 
      }), {
        status: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // PUT update document
    if (req.method === "PUT" && path.length === 2) {
      const id = path[1];
      const body = await req.json();
      console.log(`✏️ Updating document ${id} in ${collectionName}:`, body);
      
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...body, updatedAt: new Date() } }
      );
      
      return new Response(JSON.stringify({ 
        success: true, 
        modifiedCount: result.modifiedCount 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // DELETE document
    if (req.method === "DELETE" && path.length === 2) {
      const id = path[1];
      console.log(`🗑️ Deleting document ${id} from ${collectionName}`);
      
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return new Response(JSON.stringify({ 
        success: true, 
        deletedCount: result.deletedCount 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: "Route not found" }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    console.error("❌ MongoDB Handler Error:", err);
    return new Response(JSON.stringify({ 
      error: err.message,
      stack: err.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
