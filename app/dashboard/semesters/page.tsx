"use client";

import useGetSemesters from "@/hooks/useGetSemesters";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import api from "@/lib/axios";
// import { description } from "@/components/chart-area-interactive";

interface Semester {
  //   id: string;
  //   name_ar: string;
  name_en: string;
  price: number;
  descriptionEn: string;
  image_url_en: File;
  createdAt: string;
}

const page = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  //   const [slug, setSlug] = useState("");
  const [imageEn, setImageEn] = useState<File | null>(null);
  const [price, setPrice] = useState<number | string>("");
  const [createdAt, setCreatedAt] = useState(""); // fetch semesters
  const { data: semesters, isError, error, isLoading } = useGetSemesters();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name_en", nameEn);
      formData.append("price", price.toString());
      formData.append("description_en", descriptionEn);
      if (imageEn) formData.append("image_url_en", imageEn);
      formData.append("created_at", createdAt);

      const response = await api.post("/semesters", formData);

      console.log("✅ Created semester:", response.data);
      setIsDialogOpen(false);
      // Consider refreshing semester list here
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Server responded with:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isError) {
    console.log(error);

    <>Error...</>;
  }

  console.log("data", semesters);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Semesters</h1>

      <div className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Semesters</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Semester</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Semester</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  type="text"
                  placeholder="English name"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  required
                />

                <Input
                  type="text"
                  placeholder="English Description"
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                />

                <Input
                  type="file"
                  placeholder="Image..."
                  onChange={(e) => setImageEn(e.target.files?.[0] || null)}
                  accept="image/*"
                />

                <Input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min="0"
                  step="0.01"
                />

                <Input
                  type="datetime-local"
                  placeholder="Created at "
                  value={createdAt}
                  onChange={(e) => setCreatedAt(e.target.value)}
                />

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Semester"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Semester Name</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Price After Discount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {semesters?.map((semester) => (
              <TableRow key={semester.id}>
                <TableCell>{semester.name_en}</TableCell>
                <TableCell>
                  {new Date(semester.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{semester.price_after_discount ?? "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;
