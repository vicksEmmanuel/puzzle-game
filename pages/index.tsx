import React from "react";
import styles from "../styles/Index.module.scss";
import Layout from "../components/Layouts";
import CameraComp from "../components/CameraComp";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Index = () => {
  const route = useRouter();
  const onPlay = () => {
    route.push("/puzzle");
  };

  const onCreatePlay = () => {
    route.push("/me");
  };
  return (
    <div className="w-screen bg-secondary-midnight">
      <div className="h-full">
        <Layout background={"bg-secondary-midnight"}>
          <div className="h-screen w-screen items-center justify-center flex flex-col overflow-scroll">
            <div className="mb-4">
              {"Puzzle Game".split("").map((i, idx) => (
                <span
                  key={idx}
                  className={`${styles.puzzle} char${idx} uppercase text-[50px] md:text-[120px]`}
                >
                  {i}
                </span>
              ))}
            </div>

            <div className="w-screen">
              <CameraComp />
            </div>

            <div className="flex flex-row items-center justify-center mb-10">
              <Button colorScheme="blue" onClick={onPlay}>
                PLAY
              </Button>
              {/* <Button
                colorScheme="orange"
                className="ml-4"
                onClick={onCreatePlay}
              >
                CREATE YOUR OWN PLAY
              </Button> */}
            </div>
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default Index;
