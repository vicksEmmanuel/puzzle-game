import { random, sortBy } from "lodash";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
import useCountDown from "react-countdown-hook";
import { FaMinus, FaPlus } from "react-icons/fa";
import useWindowSize from "react-use/lib/useWindowSize";
import { useDebounce } from "../../utils/hooks/useDebounce";
import CustomSwappable from "./CustomSwappable";
import GameFailureModal from "./GameFailureModal";
import HealthBar from "./HealthBar";
import gameAsset from "./database";

const option = {
  ssr: false,
};

const AllGameImageSlider = dynamic(() => import("./AllGameImageSlider"), {
  ...option,
});

function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e as any) as (keyof E)[];
}
const MAXGAMELENGTH = 6;
const MAXIMAGES = 2;
export const MAXGOLDENBUZZER = 10;
const MAXNUMBEROFTIMERBONUS = 3;

const PuzzleMe = ({ level, images }: { level: any; images: string[] }) => {
  const { width: confettiWidth, height: confettiHeight } = useWindowSize();
  const [isSuccess, setSuccess] = useState(false);
  const [seconds, setSeconds] = useState(90 * 1000);
  const [showFailure, setShowFailure] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [numberOfTimerLeft, setNumberOfTimerLeft] = useState(
    MAXNUMBEROFTIMERBONUS
  );
  const [numberOfGoldenBuzzer, setNumberOfGoldenBuzzer] =
    useState(MAXGOLDENBUZZER);

  const { width, height } = useMemo(() => {
    return { width: 200, height: 200 };
  }, [level]);

  const dimensions = useMemo(() => {
    const widthx = 3 * width;
    const heightx = 3 * height;

    return { width: widthx, height: heightx };
  }, [level]);

  const shuffleArray = (arr: { key: number; image: string }[]) => {
    for (var i = arr.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }

    return arr;
  };

  const [puzzleImageValue, setPuzzleImageValue] = useState<
    {
      key: number;
      image: string;
    }[]
  >(
    shuffleArray(
      images.map((image, key) => ({
        key,
        image,
      })) ?? []
    )
  );

  useEffect(() => {
    setPuzzleImageValue(
      shuffleArray(
        images.map((image, key) => ({
          key,
          image,
        })) ?? []
      )
    );
  }, []);

  const timerBuzzer = () => {
    setNumberOfTimerLeft(numberOfTimerLeft - 1);

    const newTimerBonus = timeLeft + 10000;
    start(newTimerBonus);
  };

  const [timeLeft, { start, pause }] = useCountDown(seconds, 2000);
  const [debounceTimeLeft] = useDebounce(timeLeft, 1000);
  const ringer1Ref = useRef<any>(null);

  useEffect(() => {
    if (debounceTimeLeft <= 0 && !isSuccess && gameStart) {
      setShowFailure(true);
      ringer1Ref.current.play();
    }
  }, [debounceTimeLeft]);

  console.log(puzzleImageValue, " -dd--");

  useEffect(() => {
    // if (isSuccess) {
    //   setTimeout(() => {
    //     setSuccess(false);
    //     start(seconds);
    //   }, 10000);
    // }
  }, [isSuccess]);

  useEffect(() => {
    (() => {
      setTimeout(() => {
        setShowFailure(false);
        setGameStart(true);
        setSuccess(false);
        start();
      }, 1000);
    })();
  }, [level]);

  return (
    <div>
      <div
        className={`relative rounded-md h-[${dimensions.height}px] mt-6`}
        style={{ width: dimensions.width }}
      >
        {useMemo(() => {
          return (
            <CustomSwappable
              gridElements={Array.from(puzzleImageValue)}
              rowLength={3}
              onSuccess={(isSuccessful) => {
                setSuccess(isSuccessful);
              }}
              goldenBuzzed={numberOfGoldenBuzzer}
            >
              <div
                className={`relative rounded-md h-[${dimensions.height}px] mt-6 flex-wrap flex-row flex`}
                style={{ width: dimensions.width }}
                id={"swappable"}
              >
                {Array.from(puzzleImageValue).map((val, idx) => (
                  <span
                    key={idx}
                    className="block"
                    style={{ width, height, borderWidth: 1 }}
                    data-gridKey={val.key}
                  >
                    <Image
                      alt={val.image}
                      src={val.image}
                      width={width}
                      height={height}
                    />
                  </span>
                ))}
              </div>
            </CustomSwappable>
          );
        }, [puzzleImageValue, level, dimensions, numberOfGoldenBuzzer])}
      </div>

      <div className="flex-row flex items-center justify-between mt-10">
        <div className="items-center w-[30%] flex flex-col justify-center">
          {numberOfTimerLeft > 0 && (
            <div
              onClick={timerBuzzer}
              className="cursor-pointer"
              style={{
                zIndex: 1000,
                padding: 5,
                borderRadius: 10,
                paddingRight: 20,
                paddingLeft: 20,
              }}
            >
              <Image
                src={"/assets/game/stopwatch.png"}
                alt={"Stop Watch Bonus"}
                width={30}
                height={30}
              />
              X {numberOfTimerLeft}
            </div>
          )}
        </div>
        <div className="items-center w-[40%] flex flex-col justify-center"></div>
      </div>

      {isSuccess && <Confetti width={confettiWidth} height={confettiHeight} />}

      <GameFailureModal
        isOpen={showFailure}
        onClose={() => {
          setShowFailure(false);
          start(seconds);
        }}
        health={100}
        onOpen={() => {}}
      />

      <audio
        hidden
        src="assets/game/audio/wah-wah-sad-trombone-6347.mp3"
        ref={ringer1Ref}
      ></audio>
    </div>
  );
};

export default PuzzleMe;
