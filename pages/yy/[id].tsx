import { isUndefined } from "lodash";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "react-query";
import WormHole from "../../assets/icons/WormHole";
import PuzzleMe from "../../components/Game/PuzzleMe";
import Layout from "../../components/Layouts";
import styles from "../../styles/footer.module.css";
import { useGraphql } from "../../utils/hooks/useGraphql";

const UsersGame = () => {
  const router = useRouter();
  const id = router.query?.id as string;
  const graphql = useGraphql();
  const { data } = useQuery(
    ["game", id],
    () => {
      return graphql().Game({ gameId: { _eq: id } });
    },
    {
      enabled: !isUndefined(id),
    }
  );

  const gameData = useMemo(() => {
    if (!data) return;

    return {
      image: JSON.parse(data.Game?.[0]?.imageData),
      level: data?.Game?.[0]?.level,
    };
  }, [data]);

  return (
    <div className="w-screen bg-secondary-midnight">
      <div className="h-screen">
        <Layout background={"bg-secondary-midnight"}>
          <div className="px-5 py-3 w-screen h-screen absolute">
            <div className="invisible sm:visible lg:visible md:visible xl:visible overflow-visible">
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[110%] left-[10%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[30%] left-[10%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[55%] left-[22%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[22%] left-[50%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[65%] left-[85%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[40%] left-[79%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[22%] left-[87%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[32%] left-[65%]`}
              />
              <div
                className={`${styles["four-pointed-star_medium"]} motion-safe:animate-pulse absolute top-[110%] left-[75%]`}
              />
            </div>
            <div className="invisible sm:visible lg:visible md:visible xl:visible overflow-visible">
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[85%] left-[15%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[80%] left-[23%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[50%] left-[20%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[25%] left-[30%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[110%] left-[30%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[70%] left-[58%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[20%] left-[63%]`}
              />
              <div
                className={`${styles["four-pointed-star_small"]} motion-safe:animate-pulse absolute top-[90%] left-[70%]`}
              />
            </div>

            <div className="md:w-screen xl:max-w-screen lg:max-w-screen w-screen absolute xl:top-[60%] lg:top-[60%] md:top-[63%] sm:top-[65%] top-[85%]  flex items-center justify-center">
              <div className="w-[80%]">
                <div className="w-full relative">
                  <WormHole />
                </div>
              </div>
            </div>
          </div>

          <div className="h-[15vh] w-screen" />

          <div className="justify-center items-center flex">
            {!isUndefined(data) && (
              <PuzzleMe
                images={gameData?.image}
                level={gameData?.level}
                gameId={id}
              />
            )}
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default UsersGame;
