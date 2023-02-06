import { Tooltip } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";

export interface AllGameImageSliderProps {
  images?: (string | undefined)[];
  onChangeDec?(): number;
  onChangeInc?(): number;
  randomSelector?: number;
}

const AllGameSlides = ({ images }: AllGameImageSliderProps) => {
  return (
    <div className="flex flex-row">
      <div className="w-[200px] ml-3 mt-4">
        <Swiper
          spaceBetween={200}
          slidesPerView={1}
          width={70}
          allowTouchMove={false}
          onSlideChange={(i) => console.log(i)}
          onSwiper={(swiper) => console.log(swiper)}
          draggable={false}
        >
          {(images ?? []).map((i, idx) => {
            return (
              <SwiperSlide key={idx}>
                <Image
                  alt={"images"}
                  src={i as string}
                  width={100}
                  height={50}
                  className="rounded-md"
                />
              </SwiperSlide>
            );
          })}

          {/* <NextImage
            onChangeInc={onChangeInc}
            onChangeDec={onChangeDec}
            randomSelector={randomSelector}
          /> */}
        </Swiper>
      </div>
    </div>
  );
};

const NextImage = ({
  onChangeDec,
  onChangeInc,
  randomSelector,
}: AllGameImageSliderProps) => {
  const swiper = useSwiper();
  const { t } = useTranslation();

  useEffect(() => {
    if (randomSelector) {
      swiper.slideTo(randomSelector);
    }
  }, [randomSelector]);

  return (
    <div style={{ zIndex: 3000000, marginLeft: 10 }}>
      <Tooltip title={t("Change Image")}>
        <div className="flex flex-row">
          <div
            onClick={() => {
              const newIndex = onChangeDec?.();
              swiper.slideTo(newIndex!);
            }}
            className="w-[30px] h-[30px] border-2 cursor-pointer flex items-center justify-center rounded-full"
          >
            <BsArrowLeft
              size={12}
              data-testid="bsarrowupright"
              color={"#fff"}
            />
          </div>

          <div
            onClick={() => {
              const newIndex = onChangeInc?.();
              swiper.slideTo(newIndex!);
            }}
            className="w-[30px] h-[30px] ml-5 border-2 cursor-pointer flex items-center justify-center rounded-full"
          >
            <BsArrowRight
              size={12}
              data-testid="bsarrowupright"
              color={"#fff"}
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default AllGameSlides;
