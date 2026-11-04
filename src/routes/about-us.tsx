import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/common/PageTitle";
import { Reveal } from "@/components/common/Reveal";
import { IMAGES } from "@/config/site";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About AutoEx | Used Car Dealer in Irving, TX" },
      { name: "description", content: "Get to know AutoEx — honest, trustworthy, hassle-free car buying in Irving, TX." },
      { property: "og:title", content: "Get to Know AutoEx" },
      { property: "og:description", content: "Honest, trustworthy, hassle-free car buying in Irving, TX." },
      { property: "og:image", content: IMAGES.aboutCar },
      { name: "twitter:image", content: IMAGES.aboutCar },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageTitle title="Get to Know AutoEx" />
      <div className="container-site grid items-center gap-8 pb-14 pt-14 lg:grid-cols-2">
        <Reveal className="space-y-5 text-[1.05rem] leading-relaxed">
          <p>At AutoEx, we take pride in the way we do business.</p>
          <p>
            We believe that the car-buying process should be an exciting, hassle-free process. When you shop at AutoEx, we strive to work
            with you to find the vehicle that meets your needs and budget; not our sales goals. We have been working hard in the Irving area
            to build a reputation for honest, trustworthy sales practices. We’re ready to earn your business and would be proud to earn
            your recommendation.
          </p>
          <p>
            Stop in today and shop our great inventory, check out our affordable financing options, and see if you’re ready to take home
            your next vehicle.
          </p>
        </Reveal>
        <Reveal delay={150} className="overflow-hidden">
          <img
            src={IMAGES.aboutCar}
            alt="AutoEx - About Us"
            width={1920}
            height={900}
            className="aspect-[2.13/1] w-full object-cover transition-transform duration-[1.5s] hover:scale-105"
          />
        </Reveal>
      </div>
    </>
  );
}
