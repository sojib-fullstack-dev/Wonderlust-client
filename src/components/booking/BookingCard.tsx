'use client'
import { ArrowRight, Check } from "lucide-react";
import { IDestination } from "../type/apiType";

import { authClient } from "@/lib/auth-client";
import React from "react";
import { Input } from "@base-ui/react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useState } from "react";


const BookingCard = ({ destination }: { destination: IDestination }) => {
  // console.log(destination)
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isBooking, setIsBooking] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  // console.log(user)

  const handleBooking = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()
    setIsBooking(true);
    const departureDate = e.target.departureDate.value;
    // console.log(departureDate)
    const bookingData = {
      username: user?.name,
      email: user?.email,
      image: user?.image,
      ...destination,
      departureDate: departureDate,
      bookingDate: new Date()
    }
    // console.log(data)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      setIsBooked(true);
      toast.success("Booking Successful");
      await res.json();
    } catch (error) {
      console.error(error);
      toast.error("Booking failed");
    } finally {
      setIsBooking(false);
    }
}

return (
  <div>
    <aside className="h-fit w-full min-w-0 border border-border bg-white p-4 shadow-sm lg:sticky lg:top-24">
      <p className="text-xs text-muted-foreground">Starting from</p>
      <p className="mt-1 text-2xl font-semibold text-sky-600">
        ${destination.price}
      </p>
      <p className="text-xs text-muted-foreground">per person</p>

      <form onSubmit={handleBooking}>
        <Input
          type="date"
          name="departureDate"
          aria-label="Departure date"
          defaultValue={destination.departureDate}
          className="mt-4"
        />

        <Button
          type="submit"
          disabled={isBooking || isBooked}
          className="mt-4 w-full bg-[#00A8E8] text-white hover:bg-[#0095d1] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBooking ? "Booking..." : isBooked ? "Booked" : "Book Now"}
          <ArrowRight />
        </Button>

      </form>

      <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <Check
            aria-hidden="true"
            className="size-3.5 text-emerald-600"
          />
          Departure date shown above
        </li>
        <li className="flex items-center gap-2">
          <Check
            aria-hidden="true"
            className="size-3.5 text-emerald-600"
          />
          {destination.duration} travel package
        </li>
        <li className="flex items-center gap-2">
          <Check
            aria-hidden="true"
            className="size-3.5 text-emerald-600"
          />
          Contact us for booking support
        </li>
      </ul>
    </aside>
  </div>
);
};

export default BookingCard;