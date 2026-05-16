import React, { useEffect, useRef } from "react";

const RoomDetailsSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const $ = (window as any).$;

    if (!$) {
      console.error("jQuery not loaded");
      return;
    }

    // 🔹 1) Apply set-bg (data-setbg → inline background)
    const items = sliderRef.current?.querySelectorAll(".set-bg") || [];
    items.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      if (bg) {
        el.style.backgroundImage = `url(${bg})`;
        el.style.backgroundSize = "cover";
        el.style.backgroundPosition = "center";
      }
    });

    // 🔹 2) Init Owl Carousel (guard + re-init safe)
    if ($.fn && $.fn.owlCarousel && sliderRef.current) {
      const $slider = $(sliderRef.current);

      // destroy if already initialized (important on remount)
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
    } else {
      console.error("Owl Carousel not loaded");
    }

    // 🔹 3) Cleanup on unmount
    return () => {
      if ($ && $.fn && $.fn.owlCarousel && sliderRef.current) {
        const $slider = $(sliderRef.current);
        if ($slider.hasClass("owl-loaded")) {
          $slider.trigger("destroy.owl.carousel");
        }
      }
    };
  }, []);

  return (
    <div className="room-details-slider">
      <div className="container">
        <div
          ref={sliderRef}
          className="room__details__pic__slider owl-carousel"
        >
          <div
            className="room__details__pic__slider__item set-bg"
            data-setbg="/assets/img/rooms/details/rd-1.jpg"
          ></div>

          <div
            className="room__details__pic__slider__item set-bg"
            data-setbg="/assets/img/rooms/details/rd-2.jpg"
          ></div>

          <div
            className="room__details__pic__slider__item set-bg"
            data-setbg="/assets/img/rooms/details/rd-3.jpg"
          ></div>

          <div
            className="room__details__pic__slider__item set-bg"
            data-setbg="/assets/img/rooms/details/rd-4.jpg"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsSlider;