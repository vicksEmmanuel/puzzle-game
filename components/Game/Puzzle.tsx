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

const Puzzle = () => {
  const database = gameAsset;

  const [level, setLevel] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [randomSelector] = useState(random(0, MAXIMAGES, false));
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
  const healthBarPercentage = useMemo(() => {
    return (level / 5) * 100; //TODO: Revisit scoring
  }, [level]);

  const { width, height } = useMemo(() => {
    if (database[level].type.col > 3 || database[level].type.row >= 3) {
      return { width: 130, height: 130 };
    }
    return { width: 110, height: 110 };
  }, [database[level], level]);

  const dimensions = useMemo(() => {
    const widthx = database[level].type.col * width;
    const heightx = database[level].type.row * height;

    return { width: widthx, height: heightx };
  }, [database[level], level]);

  const levelsInvolved = useMemo(() => {
    const selectedLevel = database[level].result;

    const allLevels = enumKeys(selectedLevel);

    const temp = allLevels[0];
    allLevels[0] = allLevels[randomSelector];
    allLevels[randomSelector] = temp;

    const allLevelsInvolved = allLevels.map((i) => {
      return selectedLevel[i];
    });

    return allLevelsInvolved;
  }, [level, randomSelector]);

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
      levelsInvolved[imageIndex]?.images.map((image, key) => ({
        key,
        image,
      })) ?? []
    )
  );

  useEffect(() => {
    if (levelsInvolved) {
      setPuzzleImageValue(
        shuffleArray(
          levelsInvolved[imageIndex]?.images.map((image, key) => ({
            key,
            image,
          })) ?? []
        )
      );
    }
  }, [levelsInvolved, imageIndex]);

  const changeImage = () => {
    changeImageInc();
  };

  const changeImageInc = () => {
    let newIndex = levelsInvolved.length - 1;
    if (imageIndex + 1 >= levelsInvolved.length) {
      return newIndex;
    } else {
      newIndex = imageIndex + 1;
    }

    setImageIndex(newIndex);
    setLevel(0);
    setSuccess(false);
    return newIndex;
  };

  const changeImageDec = () => {
    let newIndex = 0;
    if (imageIndex - 1 < 0) {
      return newIndex;
    } else {
      newIndex = imageIndex - 1;
    }

    setImageIndex(newIndex);
    setLevel(0);
    setSuccess(false);
    return newIndex;
  };

  const goldenBuzzer = () => {
    if (database[level].type.row !== 1) {
      const temp = [];

      const puzzleSize = puzzleImageValue.length - 1;
      for (let i = puzzleSize; i >= 0; i--) {
        if (i === puzzleImageValue[Math.abs(i - puzzleSize)].key) {
          temp.push(puzzleImageValue[Math.abs(i - puzzleSize)].key);
        } else {
          break;
        }
      }

      const lastIndexWithTheRightSort = temp.length;
      if (!(puzzleSize >= lastIndexWithTheRightSort) || isSuccess) return;

      const tempPuzzleImageValue = Array.from(puzzleImageValue);
      const tempIndexHolder = tempPuzzleImageValue[lastIndexWithTheRightSort];
      const sortedQuery = sortBy(tempPuzzleImageValue, "key").reverse();

      const valueOfKey = sortedQuery[lastIndexWithTheRightSort].key;
      const indexOfKey = tempPuzzleImageValue.findIndex(
        (i) => i.key === valueOfKey
      );

      tempPuzzleImageValue[lastIndexWithTheRightSort] =
        sortedQuery[lastIndexWithTheRightSort];
      tempPuzzleImageValue[indexOfKey] = tempIndexHolder;

      setPuzzleImageValue(tempPuzzleImageValue);

      setNumberOfGoldenBuzzer(numberOfGoldenBuzzer - 1);
    } else {
      const temp = [];
      for (let i = 0; i < puzzleImageValue.length - 1; i++) {
        if (i === puzzleImageValue[i].key) {
          temp.push(puzzleImageValue[i]);
        } else {
          break;
        }
      }

      const lastIndexWithTheRightSort = temp.length;
      if (!(puzzleImageValue.length >= lastIndexWithTheRightSort) || isSuccess)
        return;

      const tempPuzzleImageValue = Array.from(puzzleImageValue);
      const tempIndexHolder = tempPuzzleImageValue[lastIndexWithTheRightSort];
      const sortedQuery = sortBy(tempPuzzleImageValue, "key");

      const valueOfKey = sortedQuery[lastIndexWithTheRightSort].key;
      const indexOfKey = tempPuzzleImageValue.findIndex(
        (i) => i.key === valueOfKey
      );

      tempPuzzleImageValue[lastIndexWithTheRightSort] =
        sortedQuery[lastIndexWithTheRightSort];
      tempPuzzleImageValue[indexOfKey] = tempIndexHolder;

      setPuzzleImageValue(tempPuzzleImageValue);

      setNumberOfGoldenBuzzer(numberOfGoldenBuzzer - 1);
    }
  };

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

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setSuccess(false);
        if (level + 1 > MAXGAMELENGTH) return;
        setLevel(level + 1);
        start(seconds);
      }, 10000);
    }
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
    <div className="justify-center items-center flex flex-col">
      <div className="flex-row flex items-center justify-between w-full">
        <div className="items-center w-[100px] flex flex-col justify-center">
          <div className="cursor-pointer" style={{ zIndex: 1000 }}>
            <FaPlus size={20} />
          </div>
          <div className="text-sm">Level {level + 1}</div>
          <div
            onClick={() => {
              if (level - 1 < 0) return;
              setLevel(level - 1);
              setSuccess(false);
            }}
            className="cursor-pointer"
            style={{ zIndex: 1000 }}
          >
            <FaMinus size={20} />
          </div>
        </div>

        <div className="text-lg flex flex-col items-center mt-3">
          <div className="mb-4">{timeLeft / 1000}</div>
          <HealthBar hp={healthBarPercentage} />
        </div>

        <div className="w-[100px]">
          <AllGameImageSlider
            images={levelsInvolved.map((i) => i?.default)}
            onChangeDec={changeImageDec}
            onChangeInc={changeImageInc}
          />
        </div>
      </div>

      <div
        className={`relative rounded-md h-[${dimensions.height}px] mt-6`}
        style={{ width: dimensions.width }}
      >
        {useMemo(() => {
          return (
            <CustomSwappable
              gridElements={Array.from(puzzleImageValue)}
              rowLength={database[level].type.row}
              onSuccess={(isSuccessful) => {
                setSuccess(isSuccessful);
              }}
              goldenBuzzed={numberOfGoldenBuzzer}
            >
              <div
                className={`
                relative rounded-md h-[${dimensions.height}px] w-[${dimensions.width}px] 
                mt-6 flex-wrap flex-row flex items-center justify-center
                `}
                id={"swappable"}
              >
                {Array.from(puzzleImageValue).map((val, idx) => (
                  <span
                    key={idx}
                    className={`block w-[${width}px] h-[${height}px]`}
                    style={{ borderWidth: 1 }}
                    data-gridKey={val.key}
                  >
                    <img
                      alt={val.image}
                      src={val.image}
                      className={`w-[110px] h-[110px]`}
                    />
                  </span>
                ))}
              </div>
            </CustomSwappable>
          );
        }, [
          puzzleImageValue,
          database[level],
          dimensions,
          numberOfGoldenBuzzer,
        ])}
      </div>

      <div className="flex-row flex items-center justify-between mt-10 w-full">
        <div className="items-center w-[30%] flex flex-col justify-center">
          {numberOfGoldenBuzzer > 0 && (
            <div
              onClick={goldenBuzzer}
              className="cursor-pointer text-md"
              style={{
                zIndex: 1000,
                backgroundColor: "orange",
                padding: 5,
                borderRadius: 10,
                paddingRight: 20,
                paddingLeft: 20,
              }}
            >
              <div>{numberOfGoldenBuzzer} X</div>
            </div>
          )}
        </div>

        <div className="items-center w-[30%] flex flex-col justify-center">
          {numberOfTimerLeft > 0 && (
            <div
              onClick={timerBuzzer}
              className="cursor-pointer text-md"
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
      </div>

      {isSuccess && <Confetti width={confettiWidth} height={confettiHeight} />}

      <GameFailureModal
        isOpen={showFailure}
        onClose={() => {
          changeImage();
          setShowFailure(false);
          start(seconds);
        }}
        health={healthBarPercentage}
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

export default Puzzle;
