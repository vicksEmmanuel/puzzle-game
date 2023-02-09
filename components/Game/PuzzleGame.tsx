import { sortBy } from "lodash";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { useDebounce } from "../../utils/hooks/useDebounce";
import CustomSwappable from "./CustomSwappable";
import GameFailureModal from "./GameFailureModal";

export interface PuzzleGameProps {
  puzzleImageValue: any[];
  rowLength: number;
  setPuzzleImageValue?(e: any[]): void;
  level: any;
  dimensions: { width: number; height: number };
  width: number;
  height: number;
  onFailureModalClose?(): void;
  healthBarPercentage: number;
  gameId: string;
  setLevel?: Dispatch<SetStateAction<number>>;
  start: (ttc?: number | undefined) => void;
  seconds: number;
  timeLeft: number;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  isSuccess: boolean;
}

const MAXGAMELENGTH = 6;
export const MAXGOLDENBUZZER = 10;
const MAXNUMBEROFTIMERBONUS = 3;

const PuzzleGame = ({
  puzzleImageValue,
  rowLength,
  setPuzzleImageValue,
  level,
  dimensions,
  width,
  height,
  onFailureModalClose,
  healthBarPercentage,
  gameId,
  setLevel,
  timeLeft,
  seconds,
  start,
  setSuccess,
  isSuccess,
}: PuzzleGameProps) => {
  const { width: confettiWidth, height: confettiHeight } = useWindowSize();

  const [numberOfTimerLeft, setNumberOfTimerLeft] = useState(
    MAXNUMBEROFTIMERBONUS
  );
  const [numberOfGoldenBuzzer, setNumberOfGoldenBuzzer] =
    useState(MAXGOLDENBUZZER);

  const [showFailure, setShowFailure] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const goldenBuzzer = () => {
    if (rowLength !== 1) {
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

      setPuzzleImageValue?.(tempPuzzleImageValue);

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

      setPuzzleImageValue?.(tempPuzzleImageValue);

      setNumberOfGoldenBuzzer(numberOfGoldenBuzzer - 1);
    }
  };

  const timerBuzzer = () => {
    setNumberOfTimerLeft(numberOfTimerLeft - 1);

    const newTimerBonus = timeLeft + 10000;
    start(newTimerBonus);
  };

  const [debounceTimeLeft] = useDebounce(timeLeft, 1000);
  const ringer1Ref = useRef<any>(null);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setSuccess(false);
        if (level + 1 > MAXGAMELENGTH) return;
        setLevel?.(level + 1);
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

  useEffect(() => {
    if (debounceTimeLeft <= 0 && !isSuccess && gameStart) {
      setShowFailure(true);
      ringer1Ref.current.play();
    }
  }, [debounceTimeLeft]);

  return (
    <>
      <div
        className={`relative rounded-md h-[${dimensions.height}px] mt-6`}
        style={{ width: dimensions.width }}
      >
        {useMemo(() => {
          return (
            <CustomSwappable
              gridElements={puzzleImageValue}
              rowLength={rowLength}
              setPuzzleImageValue={setPuzzleImageValue}
              onSuccess={(isSuccessful) => {
                setSuccess(isSuccessful);
              }}
              gameId={gameId ?? "xxx-xxx"}
              goldenBuzzed={numberOfGoldenBuzzer}
            >
              <div
                className={`
                relative rounded-md h-[${dimensions.height}px] w-[${dimensions.width}px] 
                mt-6 flex-wrap flex-row flex items-center justify-center
                `}
                id={"swappable"}
              >
                {puzzleImageValue.map((val, idx) => (
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
        }, [puzzleImageValue, level, dimensions, numberOfGoldenBuzzer])}
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
          onFailureModalClose?.();
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
    </>
  );
};

export default PuzzleGame;
