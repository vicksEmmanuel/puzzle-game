import { DragStartEvent } from "@shopify/draggable";
import io from "Socket.IO-client";
import { isEqual } from "lodash";
import * as React from "react";
import { useSwap } from "./use.swap";
import { createClient } from "@supabase/supabase-js";
let socket: any;

const CustomSwappable = ({
  children,
  gridElements,
  onSuccess,
  rowLength,
  goldenBuzzed,
  gameId,
  setPuzzleImageValue,
  user,
}: {
  children: JSX.Element;
  gridElements: ({ image: string; key: string } | any)[];
  onSuccess?(e: boolean): void;
  rowLength: number;
  goldenBuzzed: any;
  gameId: string;
  user: string;
  setPuzzleImageValue: any;
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

  React.useEffect(() => {
    // socketInitializer();
    // superbaseInitializer();
  }, []);

  const superbaseInitializer = () => {
    const supabase = createClient(
      "https://rqgaffnblqqeapouqkat.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxZ2FmZm5ibHFxZWFwb3Vxa2F0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxNzIzNzUsImV4cCI6MTk5MTc0ODM3NX0.ymuFPcfE5Iljwb81qByBpWM7mRihWKNBvCZe6Su83Js",
      {
        realtime: {
          params: {
            eventsPerSecond: 10,
          },
        },
      }
    );

    console.log(gameId, "===s=sss");

    const channel = supabase.channel(gameId);

    channel
      .on("broadcast", { event: "game-change" }, ({ payload }: any) => {
        const userWhoBroadcasted = payload?.user;
        console.log(user, userWhoBroadcasted, " ====");
        if (user !== userWhoBroadcasted) {
          setPuzzleImageValue?.(payload?.result);
        }
      })
      .on("presence", { event: "join" }, ({ key, newPresences }) => {
        console.log(key, newPresences, "=w====ww");
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          socket = channel;
        }
      });
  };

  const socketInitializer = async () => {
    await fetch(`/api/socket?id=${gameId}`);
    socket = io();

    socket.on("connect", () => {
      console.log("connected =====");
    });

    socket.on("update-game", (msg: any) => {
      console.log("update-game =====", msg);
      setPuzzleImageValue?.(msg);
    });
  };

  const handleSwap = (e: DragStartEvent) => {
    (ringer1Ref?.current as any)?.play();
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

    (ringer2Ref?.current as any)?.play();
    const query = document.querySelectorAll(".block");
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

    // socket?.emit("game-change", result);
    // socket?.send({
    //   type: "broadcast",
    //   event: "game-change",
    //   payload: {
    //     user,
    //     result,
    //   },
    // });

    if (isSuccessful) {
      (ringer3Ref?.current as any)?.play();
      onSuccess?.(true);
    } else {
      (ringer3Ref?.current as any)?.pause();
      onSuccess?.(false);
    }
  };

  const isWindow = typeof window !== "undefined";

  useSwap(
    {
      selectors: {
        container: ".grid .block",
        item: ".block",
      },
      onDragStart: (e) => handleSwap(e),
      onSwapped: swapItems,
    },
    [gridElements, typeof window !== "undefined"]
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
