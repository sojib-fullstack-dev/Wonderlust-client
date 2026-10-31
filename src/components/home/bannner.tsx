import banner from "/public/assets/Banner.png"
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background */}
      <Image
        src={banner}
        alt="Aerial view of a hidden beach cove"
        fill
        priority
        className="object-cover"
      />
     

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-16 pb-72 text-center text-white sm:px-6 sm:pt-20 sm:pb-56 md:pt-28 md:pb-48">
        <h1 className="text-4xl leading-[1.1] font-light tracking-tight sm:text-5xl md:text-7xl">
          Discover Your
          <br />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>
        <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mt-10">
          <Link
            href="/destinations"
            className="flex items-center justify-center gap-3 bg-[#00A8E8] px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase transition-colors hover:bg-[#0095d1]"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="bg-white/30 px-7 py-3.5 text-sm font-semibold tracking-widest text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/40"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 grid w-full grid-cols-2 sm:grid-cols-3 md:flex md:grid-cols-none">
        {searchFields.map((field) => (
          <div
            key={field.label}
            className="min-w-0 flex-1 border-r border-b border-white/20 bg-black/40 px-3 py-3 backdrop-blur-sm sm:px-4 md:border-b-0 md:px-6 md:py-3.5"
          >
            <p className="text-sm font-semibold text-white">{field.label}</p>
            <p className="mt-0.5 text-xs text-white/70">{field.placeholder}</p>
          </div>
        ))}
        <button
          type="button"
          className="col-span-2 min-h-12 bg-[#00A8E8] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0095d1] sm:col-span-1 md:w-auto md:px-12"
        >
          Search
        </button>
      </div>
    </section>
  );
}