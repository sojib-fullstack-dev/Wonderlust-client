"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin, Star } from "lucide-react";
import Link from "next/link";

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

type PriceRange = "all" | "under-500" | "500-1000" | "over-1000";
type SortOrder = "recommended" | "price-asc" | "price-desc" | "name-asc";

const categories: Destination["category"][] = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
];

function parseDestination(value: unknown): Destination | null {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const destination = value as Record<string, unknown>;
  const price = Number(destination.price);

  if (
    typeof destination._id !== "string" ||
    typeof destination.name !== "string" ||
    typeof destination.country !== "string" ||
    typeof destination.category !== "string" ||
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

const DestinationPages = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<PriceRange>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recommended");

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
        if (!res.ok) {
          throw new Error(`Unable to load destinations (${res.status}).`);
        }

        const data: unknown = await res.json();
        
        if (!Array.isArray(data)) {
          throw new Error("The destinations response has an unexpected format.");
        }

        const seenIds = new Set<string>();
        const validDestinations = data
          .map(parseDestination)
          .filter((destination): destination is Destination => destination !== null)
          .filter((destination) => {
            if (seenIds.has(destination._id)) {
              return false;
            }

            seenIds.add(destination._id);
            return true;
          });

        setDestinations(validDestinations);
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Something went wrong while loading destinations.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    const filtered = destinations.filter((destination) => {
      const matchesCategory =
        category === "all" || destination.category === category;
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-500" && destination.price < 500) ||
        (priceRange === "500-1000" &&
          destination.price >= 500 &&
          destination.price <= 1000) ||
        (priceRange === "over-1000" && destination.price > 1000);

      return matchesCategory && matchesPrice;
    });

    if (sortOrder === "price-asc") {
      return filtered.sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "price-desc") {
      return filtered.sort((a, b) => b.price - a.price);
    }
    if (sortOrder === "name-asc") {
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [category, destinations, priceRange, sortOrder]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <header className="mb-7">
        <h1 className="text-3xl font-normal tracking-tight sm:text-4xl">
          Explore All Destinations
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Find your perfect travel experience from our curated collection
        </p>
      </header>

      <div className="grid overflow-hidden rounded-sm border border-border sm:grid-cols-3">
        <label className="flex min-h-12 items-center justify-between border-b border-border px-4 text-xs font-medium uppercase tracking-wide sm:border-b-0 sm:border-r">
          <span className="sr-only">Category</span>
          <select
            aria-label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full cursor-pointer appearance-none bg-transparent p-5 pr-4 text-foreground outline-none"
          >
            <option value="all">Category</option>
            {categories.map((item) => (
              
              <option key={item} value={item}>
                {item}
                
              </option>
              
            ))}
          </select>
          <span aria-hidden="true" className="pointer-events-none -ml-5 text-muted-foreground">
            ⌄
          </span>
        </label>

        <label className="flex min-h-12 items-center justify-between border-b border-border px-4 text-xs font-medium uppercase tracking-wide sm:border-b-0 sm:border-r">
          <span className="sr-only">Price range</span>
          <select
            aria-label="Price range"
            value={priceRange}
            onChange={(event) =>
              setPriceRange(event.target.value as PriceRange)
            }
            className="w-full cursor-pointer appearance-none bg-transparent p-5 pr-4 text-foreground outline-none"
          >
            <option value="all">Price range</option>
            <option value="under-500">Under $500</option>
            <option value="500-1000">$500 – $1,000</option>
            <option value="over-1000">Over $1,000</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none -ml-5 text-muted-foreground">
            ⌄
          </span>
        </label>

        <label className="flex min-h-12 items-center justify-between px-4 text-xs font-medium uppercase tracking-wide ">
          <span className="sr-only">Sort by</span>
          <select
            aria-label="Sort by"
            value={sortOrder}
            onChange={(event) =>
              setSortOrder(event.target.value as SortOrder)
            }
            className="w-full cursor-pointer appearance-none bg-transparent p-5 pr-4 text-foreground outline-none "
          >
            <option value="recommended">Sort by</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name-asc">Name: A–Z</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none -ml-5 text-muted-foreground">
            ⌄
          </span>
        </label>
      </div>

      <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
        Showing {filteredDestinations.length}{" "}
        {filteredDestinations.length === 1 ? "destination" : "destinations"}
      </p>

      {isLoading ? (
        <div
          className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Loading destinations"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-video rounded-sm bg-muted" />
              <div className="mt-3 h-3 w-24 rounded bg-muted" />
              <div className="mt-2 h-4 w-2/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p
          role="alert"
          className="mt-8 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      ) : filteredDestinations.length === 0 ? (
        <p className="mt-8 rounded-sm border border-border px-4 py-8 text-center text-sm text-muted-foreground">
          {destinations.length === 0
            ? "No destinations are available right now."
            : "No destinations match your filters. Try adjusting your selections."}
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination, index) => (
            <article key={`${destination._id}-${index}`} className="group min-w-0">
              <div className="relative aspect-video overflow-hidden rounded-sm bg-muted">
                <Image
                  src={destination.imageUrl}
                  alt={destination.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <span className="absolute right-2 top-2 inline-flex items-center gap-1 bg-white/90 px-2 py-1 text-xs font-medium text-foreground">
                  4.5 <Star aria-hidden="true" className="size-3 fill-current" />
                </span>
              </div>

              <div className="pt-2">
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {destination.country}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <h2 className="truncate text-sm font-medium">
                    {destination.name}
                  </h2>
                  <p className="shrink-0 text-sm font-medium">
                    ${destination.price}
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}
                      /Person
                    </span>
                  </p>
                </div>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  {destination.duration}
                </p>
                <Link
                  href={`/destinations/${destination._id}`}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sky-600 underline-offset-4 transition-colors hover:text-sky-800 hover:underline"
                >
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  Book Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default DestinationPages;
