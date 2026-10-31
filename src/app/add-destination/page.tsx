"use client";

import { useState } from "react";
import { PackageCheck, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getTokenClient } from "@/lib/tokenFromClient";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

export default function AddDestinationPage() {
  const [form, setForm] = useState(initialForm);

  const update = (field: keyof typeof form, value: string) =>
  setForm((current) => ({ ...current, [field]: value }));

 const handleSubmit= async (event: React.FormEvent<HTMLFormElement>)=>{
       event.preventDefault(); 

    const token=await getTokenClient();
      //  console.log('token',token)

         try {
               const res=  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add-destination`,{
        method:'post',
        headers:{
        "Content-Type": "application/json",
        authorization:` Bearer ${token}`
        } ,
        body:JSON.stringify(form)
       })
       const result=await res.json()
            if(result){
              toast.success('Add Travel Successed')
            }  

         } catch (error) {
          if(error){
           toast.error('Not Add Travel Successed')
          }
          
          console.log(error)
         }
      
 }


  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-12">

        <h1 className="mx-auto max-w-2xl text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl" >
          Add New Travel Package
        </h1>

      <div className="mx-auto max-w-2xl">
      

        <form onSubmit={handleSubmit}
    
          className="mt-6 rounded-sm border border-border bg-white p-4 shadow-sm sm:mt-10 sm:p-8"
        >
          <div className="grid gap-5">
            {/* Destination Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Destination Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                value={form.name}
                onChange={(event) => update("name", event.target.value)}
                required
              />
            </div>

            {/* Country + Category */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Your Country"
                  value={form.country}
                  onChange={(event) => update("country", event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(value) => update("category", value ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Beach" />
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

            {/* Price + Duration */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 1299"
                  value={form.price}
                  onChange={(event) => update("price", event.target.value)}
                  required
                  min="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  value={form.duration}
                  onChange={(event) => update("duration", event.target.value)}
                  required
                />
              </div>
            </div>

            {/* Departure Date */}
            <div className="grid gap-2">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
                type="date"
                value={form.departureDate}
                onChange={(event) =>
                  update("departureDate", event.target.value)
                }
                required
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl}
                onChange={(event) => update("imageUrl", event.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the travel experience..."
                className="min-h-36"
                value={form.description}
                onChange={(event) => update("description", event.target.value)}
                required
              />
            </div>
          </div>

    

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="w-full border-destructive/30 bg-background text-destructive hover:bg-destructive/5 hover:text-destructive sm:w-auto"
            >
              <Trash2 />
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full bg-[#00A8E8] text-white hover:bg-[#0095d1] sm:w-auto"
            >
              <PackageCheck />
              Add Travel Package
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}