import React, { useEffect, useState } from "react";
import { getCollectionCursor, addDocument, updateDocument, deleteDocument } from "@/lib/mongoService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";

interface MongoCollectionTableProps {
  collectionName: string;
  fields: Array<{ name: string; label: string; type: string }>;
}

export default function MongoCollectionTable({ collectionName, fields }: MongoCollectionTableProps) {
  const [items, setItems] = useState<any[]>([]);
  const [lastId, setLastId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { toast } = useToast();

  const fetchItems = async (reset = false) => {
    setLoading(true);
    try {
      const data = await getCollectionCursor(collectionName, reset ? null : lastId, 5);
      
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setLastId(data[data.length - 1]._id);
        setItems(prev => reset ? data : [...prev, ...data]);
        setHasMore(data.length === 5);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(true);
  }, [collectionName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateDocument(collectionName, editingId, formData);
        toast({ title: "Success", description: "Item updated successfully" });
      } else {
        await addDocument(collectionName, formData);
        toast({ title: "Success", description: "Item added successfully" });
      }

      setFormData({});
      setEditingId(null);
      setItems([]);
      setLastId(null);
      setHasMore(true);
      fetchItems(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Operation failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item._id);
    const data: Record<string, string> = {};
    fields.forEach(field => {
      data[field.name] = item[field.name] || "";
    });
    setFormData(data);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setLoading(true);
    try {
      await deleteDocument(collectionName, id);
      toast({ title: "Success", description: "Item deleted successfully" });
      setItems([]);
      setLastId(null);
      setHasMore(true);
      fetchItems(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{collectionName.toUpperCase()} Management</CardTitle>
        <CardDescription>
          Manage your {collectionName} collection with cursor-based pagination
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(field => (
              <Input
                key={field.name}
                type={field.type}
                value={formData[field.name] || ""}
                onChange={e => setFormData({ ...formData, [field.name]: e.target.value })}
                placeholder={field.label}
                required
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editingId ? (
                <>
                  <Pencil className="h-4 w-4 mr-2" />
                  Update
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </>
              )}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {fields.map(field => (
                  <TableHead key={field.name}>{field.label}</TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={fields.length + 1} className="text-center text-muted-foreground">
                    No items found
                  </TableCell>
                </TableRow>
              ) : (
                items.map(item => (
                  <TableRow key={item._id}>
                    {fields.map(field => (
                      <TableCell key={field.name}>{item[field.name]}</TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          disabled={loading}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(item._id)}
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {hasMore && (
          <Button
            onClick={() => fetchItems(false)}
            disabled={loading}
            variant="outline"
            className="w-full mt-4"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Load More
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
