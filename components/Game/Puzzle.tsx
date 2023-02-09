import { random } from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import useCountDown from "react-countdown-hook";
import { FaMinus, FaPlus } from "react-icons/fa";
import HealthBar from "./HealthBar";
import PuzzleGame from "./PuzzleGame";
import gameAsset from "./database";
let socket: any;

const option = {
  ssr: false,
};

const AllGameImageSlider = dynamic(() => import("./AllGameImageSlider"), {
  ...option,
});

function enumKeys<E>(e: E): (keyof E)[] {
  return Object.keys(e as any) as (keyof E)[];
}
const MAXIMAGES = 2;
export const MAXGOLDENBUZZER = 10;

const Puzzle = () => {
  const database = gameAsset;

  const [level, setLevel] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [randomSelector] = useState(random(0, MAXIMAGES, false));

  const [isSuccess, setSuccess] = useState(false);
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

  const [seconds, setSeconds] = useState(90 * 1000);
  const [timeLeft, { start, pause }] = useCountDown(seconds, 2000);

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
          <AllGameImageSlider images={levelsInvolved.map((i) => i?.default)} />
        </div>
      </div>

      <PuzzleGame
        puzzleImageValue={Array.from(puzzleImageValue)}
        dimensions={dimensions}
        gameId="xxxx"
        height={height}
        width={width}
        healthBarPercentage={healthBarPercentage}
        level={database[level]}
        rowLength={database[level].type.row}
        setPuzzleImageValue={(e) => setPuzzleImageValue(e)}
        setLevel={setLevel}
        onFailureModalClose={() => changeImage()}
        seconds={seconds}
        start={start}
        timeLeft={timeLeft}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
      />
    </div>
  );
};

export default Puzzle;
