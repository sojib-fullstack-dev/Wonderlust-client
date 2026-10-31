import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingCard from "@/components/booking/MyBookingCard";
import { IDestination } from "@/components/type/apiType";



const MyBookingsPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  let bookings: IDestination[] = [];

  if (user?.email) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/my-bookings/${encodeURIComponent(user.email)}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        bookings = data as IDestination[];
      }
    }
  }



  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-normal tracking-tight">
          My Bookings ({bookings.length})
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Manage and view your upcoming travel plans
        </p>
        <p></p>
      </div>

      {/* Bookings List */}
      <div className="flex flex-col gap-6">
        {bookings.length === 0 ? (
          <div className="rounded-lg border border-dashed py-16 text-center">
            <p className="text-lg font-medium text-slate-700">No booking</p>
            <p className="mt-1 text-sm text-muted-foreground">
              You haven&apos;t made any bookings yet.
            </p>
          </div>
        ) : (
          bookings.map((booking) => (
            <MyBookingCard booking={booking} key={booking._id}/>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookingsPage;