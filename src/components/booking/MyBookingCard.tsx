"use client"

import { Card } from "../ui/card";
import Image from "next/image";
import { Calendar, Eye, Ticket, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { IDestination } from "../type/apiType";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const MyBookingCard = ({ booking }: { booking: IDestination}) => {
 const router = useRouter();
 const [isCancelling, setIsCancelling] = useState(false);
//  console.log('anaa ',booking)

 const handleCancleBooking = async() => {
    setIsCancelling(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${encodeURIComponent(booking._id)}`,
        { method: "DELETE" }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      if (data.deletedCount !== 1) {
        throw new Error("Booking not found or already cancelled");
      }
       toast.success('Cancel Successful')
      router.refresh();
    } catch (error) {
      console.error(error);
      window.alert(error instanceof Error ? error.message : "Failed to cancel booking");
    } finally {
      setIsCancelling(false);
    }
 }
    return (
    <Card
      key={booking._id}
      className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative h-48 w-full shrink-0 sm:h-52 md:h-auto md:w-75">
          <Image
            height={400}
            width={400}
            src={booking.imageUrl}
            alt={booking.name}
            className="size-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-4 sm:p-5 md:p-6">
          {/* Top section: Status & Details */}
          <div>
            <h2 className="text-xl font-medium text-slate-900 sm:text-2xl">
              {booking.name}
            </h2>

            <div className="mt-3 space-y-1.5 text-sm text-slate-500">
              <div className="flex min-w-0 items-start gap-2">
                <Calendar className="w-4 h-4" />
                <span className="min-w-0 break-words">Departure: {booking.departureDate}</span>
              </div>
              <div className="flex min-w-0 items-start gap-2">
                <Ticket className="w-4 h-4" />
                <span className="min-w-0 break-all">Booking ID: {booking._id}</span>
              </div>
            </div>

            <div className="mt-4 text-2xl font-medium text-blue-500">
              ${booking.price}
            </div>
          </div>

          {/* Bottom section: Action Buttons */}
          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
            onClick={handleCancleBooking}
              disabled={isCancelling}
              variant="outline"
              className="w-full gap-2 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 sm:w-auto"
            >
              <XCircle className="w-4 h-4" />
              Cancel
            </Button>
         <Link href={`/destinations`} className="w-full sm:w-auto">
             <Button className="w-full gap-2 bg-blue-600 text-white hover:bg-blue-700 sm:w-auto">
              <Eye className="w-4 h-4" />
              View
            </Button>
         </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MyBookingCard;