import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Star,
} from "lucide-react";
import EditDestination from "@/components/destination/EditDestination";
import DeletDestination from "@/components/destination/DeletDestination";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenServer } from "@/lib/tokenFromServer";


interface Destination {
  _id: string;
  name: string;
  country: string;
  category: "Beach" | "Mountain" | "City" | "Adventure" | "Cultural";
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

function parseDestination(value: unknown): Destination | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const destination = value as Record<string, unknown>;
  const price = Number(destination.price);
  const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

  if (
    typeof destination._id !== "string" ||
    typeof destination.name !== "string" ||
    typeof destination.country !== "string" ||
    typeof destination.category !== "string" ||
    !categories.includes(destination.category) ||
    !Number.isFinite(price) ||
    typeof destination.duration !== "string" ||
    typeof destination.departureDate !== "string" ||
    typeof destination.imageUrl !== "string" ||
    typeof destination.description !== "string"
  ) {
    return null;
  }

  return {
    ...(destination as unknown as Destination),
    price,
  };
}

function formatDepartureDate(date: string) {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

export default async function DestinationDetailsPage({
  params,
}: PageProps<"/destinations/[destinationId]">) {
  const { destinationId } = await params;
  const trimmedDestinationId = destinationId.trim();

  if (!trimmedDestinationId) {
    notFound();
  }

  if (!/^[0-9a-fA-F]{24}$/.test(trimmedDestinationId)) {
    notFound();
  }
  
  const token=await getTokenServer();

  //  console.log(token)

  let response: Response;

  try {
    response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${encodeURIComponent(trimmedDestinationId)}`,
      {
        headers: {
        authorization: `Bearer ${token}`,
        },
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      },
    );
  } catch {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Destinations
        </Link>
        <p role="alert" className="mt-8 text-sm text-red-700">
          We couldn&apos;t connect to the destinations service. Please try again
          later.
        </p>
      </main>
    );
  }

  if (response.status === 404) {
    notFound();
  }

  const responseBody = await response.text();

  if (!response.ok) {
    let detail = "";
    if (responseBody) {
      try {
        const body = JSON.parse(responseBody) as unknown;
        if (typeof body === "object" && body !== null && "message" in body) {
          const message = (body as Record<string, unknown>).message;
          if (typeof message === "string") {
            detail = message;
          }
        } else if (typeof body === "string") {
          detail = body;
        }
      } catch {
        detail = responseBody.slice(0, 200);
      }
    }

    throw new Error(
      `Unable to load destination (${response.status})${detail ? `: ${detail}` : "."}`,
    );
  }

  if (!responseBody) {
    notFound();
  }

  let data: unknown;
  try {
    data = JSON.parse(responseBody);
  } catch {
    throw new Error("The destination response is not valid JSON.");
  }

  let destinationData = data;
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    const responseData = data as Record<string, unknown>;
    if ("destination" in responseData) {
      destinationData = responseData.destination;
    } else if ("data" in responseData) {
      destinationData = responseData.data;
    }
  }

  const destination = parseDestination(destinationData);
  if (!destination) {
    throw new Error("The destination response has an unexpected format.");
  }

const highlights = [
    { label: destination.country, icon: MapPin },
    { label: destination.category, icon: Star },
    { label: destination.duration, icon: Clock3 },
    { label: formatDepartureDate(destination.departureDate), icon: CalendarDays },
  ];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <Link
          href="/destinations"
          className="inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:gap-2 sm:text-sm"
        >
          <ArrowLeft aria-hidden="true" className="size-3.5 shrink-0 sm:size-4" />
          Back to Destinations
        </Link>

        <div className="flex shrink-0 items-center gap-1">
          <div >   
            <EditDestination destination={destination} />
          </div>
          <div
            
            className="inline-flex items-center gap-1.5  px-2.5 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 sm:px-3 sm:py-2"
          >
            <DeletDestination destination={destination}/>
            
          </div>
        </div>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-sm bg-muted sm:aspect-[2.7/1]">
        <Image
          src={destination.imageUrl}
          alt={`${destination.name}, ${destination.country}`}
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 border-t border-border pt-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
        <article className="min-w-0">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin aria-hidden="true" className="size-3.5" />
            {destination.country}
          </p>
          <h1 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">
            {destination.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <Star
                aria-hidden="true"
                className="size-3.5 fill-emerald-600 text-emerald-600"
              />
              <span className="font-medium">4.5</span>
              <span className="text-muted-foreground">Rating</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <CalendarDays aria-hidden="true" className="size-3.5" />
              {destination.duration}
            </span>
          </div>

          <section className="mt-8">
            <h2 className="text-lg font-medium">Overview</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {destination.description}
            </p>
          </section>

          <section className="mt-7">
            <h2 className="text-lg font-medium">Trip details</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Explore this {destination.category.toLowerCase()} destination in{" "}
              {destination.country}. Your trip is planned for{" "}
              {destination.duration}, departing{" "}
              {formatDepartureDate(destination.departureDate)}.
            </p>
            <ul className="mt-4 grid gap-x-6 gap-y-3 text-xs text-muted-foreground sm:grid-cols-2">
              {highlights.map(({ label, icon: Icon }) => (
                <li key={label} className="flex items-center gap-2">
                  <Check
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-emerald-600"
                  />
                  <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </section>
        </article>
            <BookingCard destination={destination} />

      </div>
    </main>
  );
}