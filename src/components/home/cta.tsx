
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Cta() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background */}
      <Image
        src="/assets/CTA.png"
        alt="Airplane flying over a tropical island"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center text-white sm:px-6 sm:py-28 md:py-32">
        <h2 className="text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-4 text-base text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>
        <Link
          href="/destinations"
          className="mt-8 flex items-center justify-center gap-3 bg-white px-5 py-4 text-center text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-white/90 sm:px-8 sm:text-sm md:mt-10"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}