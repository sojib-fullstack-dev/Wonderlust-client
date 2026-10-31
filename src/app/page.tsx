import { Banner } from "@/components/home/bannner";
import { Cta } from "@/components/home/cta";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { FeaturedDestinations } from "@/components/home/featured-destinations";

export default function Home() {
  return (
  <div>
    <Banner/>
    <FeaturedDestinations />
    <WhyChooseUs/>
    <Testimonials />
    <Cta />
  </div>
  );
}
