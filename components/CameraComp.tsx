import { Center, Grid, GridItem, Image } from "@chakra-ui/react";
import * as React from "react";
import { utils } from "./camera";
import { Camera, CameraTarget, useCamera } from "./camera/components";

const GRID_AREAS = "abcdefgh";

const ImageGrid = () => {
  const camera = useCamera();
  const [target, setTarget] = React.useState<utils.CameraTarget | null>(null);

  const puzzleLevels = [
    "/assets/game/col3row2/inheadenhomepage/theorist.png",
    "/assets/game/col3row2/inheadenhomepage/hell.png",
    "/assets/game/col3row2/inheadenhomepage/morsel.png",
    "/assets/game/col3row2/inheadenhomepage/resignation.png",
    "/assets/game/col3row2/inheadenhomepage/negative.png",
    "/assets/game/col3row2/inheadenhomepage/wonder.png",
  ];

  React.useEffect(() => {
    if (target) {
      camera.panTo(target.center);
      camera.setZoom(3);
    } else {
      camera.panTo(new utils.Vector(0, 0));
      camera.setZoom(1);
    }
  }, [camera, target]);

  return (
    <Center
      h="100%"
      onClick={() => {
        setTarget(null);
      }}
    >
      <Grid
        templateAreas={`
        ". a a a a . . . ."
        ". a a a a b b . ."
        ". a a a a b b . ."
        "c c c d d d e e ."
        "c c c d d d e e ."
        "c c c d d d f f f"
        ". g g h h h f f f"
        ". g g h h h f f f"
        ". . . h h h . . ."
        ". . . h h h . . ."
        `}
        gridTemplateColumns={"repeat(9, 6vh)"}
        gridTemplateRows={"repeat(10, 6vh)"}
        gap={2}
      >
        {puzzleLevels.map((image, index) => (
          <GridItem
            key={index}
            area={GRID_AREAS[index]}
            rounded="xl"
            overflow="hidden"
            transform="translateZ(0)"
            bg="gray.100"
          >
            <CameraTarget w="100%" h="100%">
              {(target) => (
                <Image
                  src={image}
                  w={"100%"}
                  h={"100%"}
                  objectFit="cover"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTarget((prev) => (prev !== target ? target : null));
                  }}
                />
              )}
            </CameraTarget>
          </GridItem>
        ))}
      </Grid>
    </Center>
  );
};

const CameraComp = () => {
  return (
    <Camera h="100%" w={"w-100%"}>
      <ImageGrid />
    </Camera>
  );
};

export default CameraComp;
