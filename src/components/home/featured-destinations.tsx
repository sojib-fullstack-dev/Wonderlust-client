"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { IDestination } from "@/components/type/apiType";

function FeaturedControls() {
  const { scrollPrev, scrollNext } = useCarousel();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        aria-label="Previous destinations"
        variant="outline"
        size="icon-sm"
        onClick={scrollPrev}
        className="size-10 rounded-full border-[#00A8E8]/40 text-[#00A8E8]"
      >
        <ArrowLeft className="size-4" />
      </Button>
      <Button
        type="button"
        aria-label="Next destinations"
        variant="outline"
        size="icon-sm"
        onClick={scrollNext}
        className="size-10 rounded-full border-[#00A8E8]/40 text-[#00A8E8]"
      >
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

export function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
        if (!response.ok) {
          throw new Error("Unable to load destinations");
        }

        const data: unknown = await response.json();
        if (Array.isArray(data)) {
          const seenIds = new Set<string>();
          const uniqueDestinations = (data as IDestination[]).filter((destination) => {
            if (!destination._id || seenIds.has(destination._id)) {
              return false;
            }

            seenIds.add(destination._id);
            return true;
          });

          setDestinations(uniqueDestinations);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (isLoading || destinations.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-4xl font-light tracking-tight text-foreground md:text-5xl">
                Featured Destinations
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Handpicked travel experiences for the adventure seekers
              </p>
            </div>
            <Link
              href="/destinations"
              className="hidden items-center gap-2 border border-[#00A8E8] px-5 py-2.5 text-xs font-medium text-[#00A8E8] transition-colors hover:bg-[#00A8E8] hover:text-white sm:flex"
            >
              All Destinations
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <CarouselContent className="mt-8 -ml-4">
            {destinations.map((destination, index) => (
              <CarouselItem
                key={`${destination._id}-${index}`}
                className="basis-[85%] pl-4 sm:basis-[65%] lg:basis-1/3"
              >
                <article className="overflow-hidden border border-border bg-white">
                  <Link
                    href={`/destinations/${encodeURIComponent(destination._id)}`}
                    className="relative block aspect-16/10 overflow-hidden bg-muted"
                  >
                    <Image
                      src={destination.imageUrl}
                      alt={destination.name}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 560px"
                      className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                    <span className="absolute right-3 top-3 bg-white px-2 py-1 text-xs font-medium">
                      4.5 *
                    </span>
                  </Link>

                  <div className="p-5">
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3.5" />
                      {destination.country}
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <h3 className="text-lg font-medium">{destination.name}</h3>
                      <p className="shrink-0 text-lg font-medium">
                        ${destination.price}
                        <span className="text-xs font-normal text-muted-foreground">/Person</span>
                      </p>
                    </div>
                    <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {destination.duration}
                    </p>
                    <Link
                      href={`/destinations/${encodeURIComponent(destination._id)}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#00A8E8]"
                    >
                      Book Now
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              1/{Math.max(destinations.length, 1)}
            </p>
            <FeaturedControls />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
