import { supabase } from "@/integrations/supabase/client";

const FUNCTION_NAME = "mongoHandler";

/**
 * Generic MongoDB service for multi-collection CRUD operations
 */

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
  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: { collection, limit },
    method: "GET",
  });

  if (error) throw error;
  return data || [];
}

/**
 * Get documents with cursor-based pagination
 */
export async function getCollectionCursor(
  collection: string,
  lastId: string | null = null,
  limit: number = 5
): Promise<MongoDocument[]> {
  const path = `${collection}/cursor`;
  const params = new URLSearchParams();
  if (lastId) params.append("lastId", lastId);
  params.append("limit", limit.toString());

  const { data, error } = await supabase.functions.invoke(
    `${FUNCTION_NAME}/${path}?${params.toString()}`,
    { method: "GET" }
  );

  if (error) throw error;
  return data || [];
}

/**
 * Add a new document to a collection
 */
export async function addDocument(
  collection: string,
  doc: Omit<MongoDocument, "_id" | "createdAt">
): Promise<{ success: boolean; insertedId: string }> {
  const { data, error } = await supabase.functions.invoke(
    `${FUNCTION_NAME}/${collection}`,
    {
      method: "POST",
      body: doc,
    }
  );

  if (error) throw error;
  return data;
}

/**
 * Update an existing document
 */
export async function updateDocument(
  collection: string,
  id: string,
  updates: Partial<MongoDocument>
): Promise<{ success: boolean; modifiedCount: number }> {
  const { data, error } = await supabase.functions.invoke(
    `${FUNCTION_NAME}/${collection}/${id}`,
    {
      method: "PUT",
      body: updates,
    }
  );

  if (error) throw error;
  return data;
}

/**
 * Delete a document by ID
 */
export async function deleteDocument(
  collection: string,
  id: string
): Promise<{ success: boolean; deletedCount: number }> {
  const { data, error } = await supabase.functions.invoke(
    `${FUNCTION_NAME}/${collection}/${id}`,
    { method: "DELETE" }
  );

  if (error) throw error;
  return data;
}
