"use client";

import { useState } from "react";
import { PackageCheck, Pencil, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { IDestination } from "../type/apiType";
import { useRouter } from "next/navigation";
import { getTokenClient } from "@/lib/tokenFromClient";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
];

// const initialForm = {
//   name: "",
//   country: "",
//   category: "",
//   price: "",
//   duration: "",
//   departureDate: "",
//   imageUrl: "",
//   description: "",
// };

const EditDestination = ({destination}:{destination:IDestination}) => {

    // console.log('destination',destination)
    const router=useRouter()

  const [form, setForm] = useState(destination);
  const [loading, setLoading] = useState(false);
  const updatedData = Object.fromEntries(
    Object.entries(form).filter(([key]) => key !== "_id"),
  );

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
     
    const token=await getTokenClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
              authorization:` Bearer ${token}`
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to save destination");
      }

      toast.success("Destination Edit successfully!", {
        style: {
          background: "linear-gradient(to right, #6366f1, #a855f7)",
          color: "#ffffff",
          border: "none",
        },
         
      });
      router.refresh()
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className="gap-2">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Destination Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Your Country"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(value) =>
                  update("category", value ?? "")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                placeholder="e.g., 1299"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="7 Days/6 Nights"
                value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="departureDate">Departure Date</Label>
            <Input
              id="departureDate"
              type="date"
              value={form.departureDate}
              onChange={(e) =>
                update("departureDate", e.target.value)
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              className="min-h-32"
              value={form.description}
              onChange={(e) =>
                update("description", e.target.value)
              }
              required
            />
          </div>

          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <DialogClose
              render={
                <Button type="button" variant="outline">
                  <X className="size-4" />
                  Cancel
                </Button>
              }
            />

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#00A8E8] text-white hover:bg-[#0095d1]"
            >
              <PackageCheck className="size-4" />
              {loading ? "Saving..." : "Save Destination"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestination;