/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import type { room } from "../../types/schema/room";

type Props = {
  roomDetails?: room;
};

const RoomDetailsSlider: React.FC<Props> = ({ roomDetails }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!roomDetails?.images?.length) return;

    const $ = (window as any).$ as any;
    if (!$ || !sliderRef.current) return;

    const items =
      sliderRef.current.querySelectorAll<HTMLDivElement>(".set-bg");

    items.forEach((el) => {
      const bg = el.getAttribute("data-setbg");

      if (bg) {
        el.style.backgroundImage = `url(${bg})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
        el.style.height = "500px";
      }
    });

    const $slider = $(sliderRef.current);

    // optional safety if owl already initialized
    if ($slider.hasClass("owl-loaded")) {
      $slider.trigger("destroy.owl.carousel");
      $slider.removeClass("owl-loaded");
      $slider.find(".owl-stage-outer").children().unwrap();
    }

    $slider.owlCarousel({
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3000,
      smartSpeed: 600,
    });

    return () => {
      if ($slider.hasClass("owl-loaded")) {
        $slider.trigger("destroy.owl.carousel");
      }
    };
  }, [roomDetails?.images]);

  return (
    <div className="room-details-slider">
      <div className="container">
        <div
          ref={sliderRef}
          className="room__details__pic__slider owl-carousel"
        >
          {roomDetails?.images?.map((image, index) => (
            <div
              key={image?.id ?? index}
              className="room__details__pic__slider__item set-bg"
              data-setbg={image?.secure_url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsSlider;