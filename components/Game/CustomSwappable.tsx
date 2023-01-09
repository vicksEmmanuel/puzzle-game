import { DragStartEvent } from '@shopify/draggable';
import { isEqual } from 'lodash';
import * as React from 'react';
import { useSwap } from './use.swap';
import { MAXGOLDENBUZZER } from './Puzzle';

const CustomSwappable = ({
  children,
  gridElements,
  onSuccess,
  rowLength,
  goldenBuzzed,
}: {
  children: JSX.Element;
  gridElements: ({ image: string; key: string } | any)[];
  onSuccess?(e: boolean): void;
  rowLength: number;
  goldenBuzzed: any;
}) => {
  const [elements, setElements] = React.useState(gridElements);
  const ringer1Ref = React.useRef<any>(null);
  const ringer2Ref = React.useRef<any>(null);
  const ringer3Ref = React.useRef<any>(null);

  React.useEffect(() => {
    if (gridElements) {
      setElements(gridElements);
    }
  }, [gridElements]);

  React.useEffect(() => {
    if (goldenBuzzed) {
      swapItems({ sourceItemIndex: 0, targetItemIndex: 0 });
    }
  }, [goldenBuzzed]);

  const handleSwap = (e: DragStartEvent) => {
    ringer1Ref.current.play();
  };

  const swapItems = (indexes: {
    sourceItemIndex: number;
    targetItemIndex: number;
  }) => {
    const sourceItemIndex = indexes?.sourceItemIndex;
    const targetItemIndex = indexes?.targetItemIndex;
    if (!(targetItemIndex >= 0) || !(sourceItemIndex >= 0)) {
      return;
    }

    const sourceItem = elements[sourceItemIndex];
    const targetItem = elements[targetItemIndex];

    const result = [...elements];
    result[sourceItemIndex] = targetItem;
    result[targetItemIndex] = sourceItem;

    ringer2Ref.current.play();
    const query = document.querySelectorAll('.block');
    const newSort = Array.from(query).map((i: any) => {
      return Number(i.dataset?.gridkey);
    });

    const sortedArray = new Array(elements.length).fill(1).map((_, idx) => idx);
    const isEqualWhenNotReversed = isEqual(newSort, sortedArray);
    const isEqualWhenReversed = isEqual(newSort.reverse(), sortedArray);

    const isSuccessful = (() => {
      if (rowLength !== 1) return isEqualWhenReversed;
      return isEqualWhenNotReversed;
    })();

    setElements(result);

    if (isSuccessful) {
      ringer3Ref.current.play();
      onSuccess?.(true);
    } else {
      ringer3Ref.current.pause();
      onSuccess?.(false);
    }
  };

  const isWindow = typeof window !== 'undefined';

  useSwap(
    {
      selectors: {
        container: '.grid .block',
        item: '.block',
      },
      onDragStart: (e) => handleSwap(e),
      onSwapped: swapItems,
    },
    [gridElements, typeof window !== 'undefined']
  );

  if (!isWindow) return <></>;

  return (
    <>
      <div className="grid">
        {children}
        <audio
          hidden
          src="assets/game/audio/mixkit-martial-arts-fast-punch-2047.wav"
          ref={ringer1Ref}
        ></audio>
        <audio
          hidden
          src="assets/game/audio/mixkit-bonus-extra-in-a-video-game-2064.wav"
          ref={ringer3Ref}
        ></audio>
        <audio
          hidden
          src="assets/game/audio/mixkit-explainer-video-game-alert-sweep-236.wav"
          ref={ringer2Ref}
        ></audio>
      </div>
    </>
  );
};

export default CustomSwappable;
