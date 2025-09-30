const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID;
const BASE_URL = `https://${PROJECT_ID}.supabase.co/functions/v1/mongoHandler`;

export interface MongoDocument {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: any;
}

/**
 * Get all documents from a collection with optional limit
 */
export async function getCollection(
  collection: string,
  limit: number = 20
): Promise<MongoDocument[]> {
  const res = await fetch(`${BASE_URL}/${collection}?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to fetch ${collection}`);
  return res.json();
}

/**
 * Get documents with cursor-based pagination
 */
export async function getCollectionCursor(
  collection: string,
  lastId: string | null = null,
  limit: number = 5
): Promise<MongoDocument[]> {
  const url = new URL(`${BASE_URL}/${collection}/cursor`);
  if (lastId) url.searchParams.append("lastId", lastId);
  url.searchParams.append("limit", limit.toString());
  
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Failed to fetch ${collection} with cursor`);
  return res.json();
}

/**
 * Add a new document to a collection
 */
export async function addDocument(
  collection: string,
  doc: Omit<MongoDocument, "_id" | "createdAt">
): Promise<{ success: boolean; insertedId: string }> {
  const res = await fetch(`${BASE_URL}/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(doc),
  });
  
  if (!res.ok) throw new Error(`Failed to add document to ${collection}`);
  return res.json();
}

/**
 * Update an existing document
 */
export async function updateDocument(
  collection: string,
  id: string,
  updates: Partial<MongoDocument>
): Promise<{ success: boolean; modifiedCount: number }> {
  const res = await fetch(`${BASE_URL}/${collection}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  
  if (!res.ok) throw new Error(`Failed to update document in ${collection}`);
  return res.json();
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(
  collection: string,
  id: string
): Promise<{ success: boolean; deletedCount: number }> {
  const res = await fetch(`${BASE_URL}/${collection}/${id}`, {
    method: "DELETE",
  });
  
  if (!res.ok) throw new Error(`Failed to delete document from ${collection}`);
  return res.json();
}
