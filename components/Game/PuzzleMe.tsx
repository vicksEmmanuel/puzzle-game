import { useEffect, useMemo, useState } from "react";
import useCountDown from "react-countdown-hook";
import PuzzleGame from "./PuzzleGame";

const PuzzleMe = ({
  level,
  images,
  gameId,
}: {
  level: any;
  images: string[];
  gameId: string | undefined;
}) => {
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

  const [seconds, setSeconds] = useState(90 * 1000);
  const [timeLeft, { start, pause }] = useCountDown(seconds, 2000);
  const [isSuccess, setSuccess] = useState(false);

  return (
    <div>
      <PuzzleGame
        gameId={gameId ?? "xxxx"}
        dimensions={dimensions}
        height={height}
        width={width}
        puzzleImageValue={puzzleImageValue}
        healthBarPercentage={100}
        onFailureModalClose={() => {}}
        setPuzzleImageValue={(e) => setPuzzleImageValue(e)}
        level={level}
        rowLength={level}
        isSuccess={isSuccess}
        seconds={seconds}
        setSuccess={setSuccess}
        start={start}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default PuzzleMe;
