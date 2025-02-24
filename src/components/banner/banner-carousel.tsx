"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

interface Banner {
  id: number;
  title: string;
  imageUrl: string;
  link: string;
  objectPosition: string;
}

const DUMMY_BANNERS: Banner[] = [
  {
    id: 1,
    title: "아이브(IVE) 신곡 'I AM' 뮤직비디오",
    imageUrl: "/아이브.jpg",
    link: "https://www.hanteochart.com/artistdetail/59230/weekly",
    objectPosition: "center top",
  },
  {
    id: 2,
    title: "BLACKPINK 지수 솔로 데뷔",
    imageUrl: "/지수.jpg",
    link: "https://www.hanteochart.com/artistdetail/48729/weekly",
    objectPosition: "center center",
  },
  {
    id: 3,
    title: "BLACKPINK 로제 'On The Ground'",
    imageUrl: "/로제.jpg",
    link: "https://www.hanteochart.com/artistdetail/48728/weekly",
    objectPosition: "center center",
  },
  {
    id: 4,
    title: "ENHYPEN(엔하이픈) 월드 투어",
    imageUrl: "/엔하이픈.jpg",
    link: "https://www.hanteochart.com/artistdetail/53306/weekly",
    objectPosition: "center center",
  },
  {
    id: 5,
    title: "aespa(에스파) 'Next Level'",
    imageUrl: "/에스파.jpg",
    link: "https://www.hanteochart.com/artistdetail/53509/weekly",
    objectPosition: "center top",
  },
];

const CAROUSEL_AUTOPLAY_DELAY_MS = 3000;

export default function BannerCarousel() {
  const plugins = useRef([
    Autoplay({
      delay: CAROUSEL_AUTOPLAY_DELAY_MS,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full py-6">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        plugins={plugins.current}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {DUMMY_BANNERS.map((banner) => (
            <CarouselItem key={banner.id} className="basis-[90%] pl-2">
              <Link
                href={banner.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="group relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ objectPosition: banner.objectPosition }}
                    priority={banner.id === 1}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <h2 className="text-lg font-semibold text-white md:text-xl">
                      {banner.title}
                    </h2>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex justify-center gap-2">
          {DUMMY_BANNERS.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                current === index ? "bg-primary" : "bg-gray-300",
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`${index + 1}번 배너로 이동`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
