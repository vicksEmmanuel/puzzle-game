import * as React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { motion, useTransform } from "framer-motion";
import * as utils from "./utils";

const MotionBox = motion(Box);

const CameraContext = React.createContext<utils.Camera | null>(null);

export const useCamera = () => {
  const camera = React.useContext(CameraContext);
  if (!camera) {
    throw new Error("useCamera can only be called inside of a Camera");
  }
  return camera;
};

interface CameraProps extends BoxProps {}

export const Camera = ({ children, ...otherProps }: CameraProps) => {
  const [camera] = React.useState(() => new utils.Camera());
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    (camera as any).containerEl = containerRef.current;
    (camera as any).contentEl = contentRef.current;
  }, []);

  const translate = useTransform(
    [camera.motionValues.posX, camera.motionValues.posY],
    ([x, y]: any[]) => `${-x}px ${-y}px`
  );

  const transformOrigin = useTransform(
    [camera.motionValues.posX, camera.motionValues.posY],
    ([x, y]) => `calc(50% + ${x}px) calc(50% + ${y}px)`
  );

  return (
    <CameraContext.Provider value={camera}>
      <MotionBox ref={containerRef} overflow="hidden" {...otherProps}>
        <MotionBox
          w="100%"
          h="100%"
          contentRef={contentRef}
          style={{
            translate,
            transformOrigin,
            scale: camera.motionValues.zoom,
          }}
        >
          {children}
        </MotionBox>
      </MotionBox>
    </CameraContext.Provider>
  );
};

export interface CameraTargetProps extends Omit<BoxProps, "children"> {
  children: (
    target: utils.CameraTarget
  ) => React.ReactNode | BoxProps["children"];
}

export const CameraTarget = ({
  children,
  ...otherProps
}: CameraTargetProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const camera = useCamera();
  const [cameraTarget] = React.useState(() => new utils.CameraTarget(camera));

  React.useEffect(() => {
    (cameraTarget as any).el = ref.current;
  }, []);

  return (
    <Box ref={ref} {...otherProps}>
      {typeof children === "function" ? children(cameraTarget) : children}
    </Box>
  );
};
