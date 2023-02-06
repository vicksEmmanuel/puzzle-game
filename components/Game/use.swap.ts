import React, { useState, useEffect, useCallback } from "react";

var Swappable: any = null;
var Plugins: any = null;

if (typeof window !== "undefined") {
  var value = require("@shopify/draggable");
  Swappable = value?.Swappable;
  Plugins = value?.Plugins;
}

export function useSwap(
  {
    selectors,
    onDragStart,
    onSwapped,
  }: {
    selectors: { container: string; item: string };
    onDragStart: (ev: any) => void;
    onSwapped: (ev: any) => void;
  },
  deps: any[]
) {
  const [dragState, setDragState] =
    useState<"empty" | "start" | "swap" | "end">("empty");
  const [onDragging, setOnDragging] =
    useState<
      | {
          sourceItemIndex: number | undefined;
          targetItemIndex: number | undefined;
        }
      | undefined
    >(undefined);

  useEffect(() => {
    if (dragState != "swap") return;

    const oldOnDragging = onDragging;

    setOnDragging({ sourceItemIndex: undefined, targetItemIndex: undefined });

    onSwapped(oldOnDragging);
    setDragState("end");
  }, [dragState, onDragging, onSwapped]);

  const onSwappedEventFunction = useCallback(({ data }: { data: any }) => {
    const targetItemIndex = Number(data?.dragEvent?.over?.dataset?.gridkey);
    const sourceItemIndex = Number(data?.dragEvent?.source?.dataset?.gridkey);

    if (targetItemIndex == sourceItemIndex) return;

    setOnDragging({ targetItemIndex, sourceItemIndex });
  }, []);

  const onSwappableStart = useCallback(
    ({ data }: { data: any }) => {
      const sourceItemIndex = Number(data?.dragEvent?.source?.dataset?.gridkey);

      setDragState("start");
      onDragStart(data);

      setOnDragging({
        sourceItemIndex,
        targetItemIndex: undefined,
      });
    },
    [onDragStart]
  );

  useEffect(() => {
    const containers = document.querySelectorAll(selectors.container);
    if (containers.length === 0) return;
    const swappable = new Swappable(containers, {
      draggable: selectors.item,
      delay: {
        mouse: 0,
        drag: 0,
        touch: 200,
      },
      mirror: {
        appendTo: selectors.container,
        constrainDimensions: true,
      },
      plugins: [Plugins.ResizeMirror],
    });
    swappable.on("swappable:start", onSwappableStart);
    swappable.on("swappable:swapped", onSwappedEventFunction);
    swappable.on("swappable:stop", () => setDragState("swap"));
    return () => swappable.destroy();
  }, [...deps]);

  return { onDragging, dragState };
}
