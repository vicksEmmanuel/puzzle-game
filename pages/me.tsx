import { useState } from "react";
import { BsShare, BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import WormHole from "../assets/icons/WormHole";
import UserAddImage from "../components/Game/UserAddImage";
import Layout from "../components/Layouts";
import {
  Game_Insert_Input,
  Uuid_Comparison_Exp,
} from "../modules/api/generated";
import { useGeneralState } from "../state/useGeneralState";
import styles from "../styles/footer.module.css";
import { useGraphql } from "../utils/hooks/useGraphql";
import { useRouter } from "next/router";

const MyPuzzle = () => {
  const [openPanel, setOpenPanel] = useState(false);
  const graphql = useGraphql();
  const router = useRouter();

  const copyEmailToClipboard = (text: string) => {
    navigator.clipboard
      ?.writeText(text)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch(() => {
        toast.error("Could not copy link");
      });
  };

  const { setGameIds, gameIds, removeGameId } = useGeneralState();
  const { refetch, data: games } = useQuery(["games"], () =>
    graphql().Game({ gameId: { _in: gameIds } })
  );
  const [splitNumber, setSplitNumber] = useState(5);

  const addImage = useMutation(
    (game: Game_Insert_Input) => {
      return graphql().InsertOrUpdateGame({ game });
    },
    {
      onSuccess: (e) => {
        setGameIds(e.insert_Game?.returning?.[0]?.id);
        refetch();
        setOpenPanel(false);
      },
      onError: () => {},
    }
  );

  const removeGame = useMutation(
    (id: Uuid_Comparison_Exp) => {
      return graphql().deleteGame({ id });
    },
    {
      onSuccess: (e) => {
        refetch();
        removeGameId(e.delete_Game?.returning?.[0]?.id);
      },
      onError: () => {},
    }
  );

  const playGame = (image: string, level: number) => {
    var canvas = document.createElement("canvas"); // In memory canvas
    var ctx = canvas.getContext("2d");
    const parts: string[] = []; // to push into oud base64 strings
    let img = new Image();

    function split_4(this: any) {
      var w2 = img.width / 2,
        h2 = img.height / 2;

      canvas.height = 400;
      canvas.width = 400;
      ctx?.drawImage(this, 0, 0, 400, 400);
      const imagePreview = canvas.toDataURL();

      for (var i = 0; i < level; i++) {
        var x = (-w2 * i) % (w2 * 2),
          y = h2 * i <= h2 ? 0 : -h2;

        canvas.width = w2;
        canvas.height = h2;

        ctx?.drawImage(this, x, y, w2 * 2, h2 * 2); // img, x, y, w, h
        parts.push(canvas.toDataURL()); // ("image/jpeg") for jpeg
      }

      addImage.mutate({
        imageData: JSON.stringify(parts),
        level: splitNumber,
        imagePreview,
      });
    }

    img.onload = split_4;
    img.src = image;
  };

  const onPlay = (id: string) => {
    router.push(`/yy/${id}`);
  };
  const onDelete = (id: string) => {
    removeGame.mutate({ _eq: id });
  };
  const onCopy = (id: string) => {
    copyEmailToClipboard(
      `https://harmonious-strudel-a24299.netlify.app/yy/${id}`
    );
  };

  return (
    <>
      <div className="w-screen bg-secondary-midnight">
        <div className="h-full">
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
            <>
              <div
                className={`h-[80vh] justify-center items-center bg-secondary-midnight text-white`}
                style={{ zIndex: 1000 }}
              >
                <div className="mb-10 self-center text-center">
                  {"You'd see your puzzle game files here"
                    .split("")
                    .map((i, idx) => (
                      <span
                        key={idx}
                        className={`${styles.puzzle} char${idx} uppercase text-[20px]`}
                      >
                        {i}
                      </span>
                    ))}
                </div>

                <div className="flex flex-row w-full px-8 flex-wrap">
                  <div
                    onClick={() => setOpenPanel(true)}
                    className="w-[200px] h-[200px] bg-white opacity-[0.7] z-20 rounded-xl flex items-center justify-center cursor-pointer mx-3 my-3"
                  >
                    <FaPlus color="grey" size={50} />
                  </div>

                  {games?.Game.map((i) => {
                    return (
                      <div
                        onClick={() => onPlay(i.id)}
                        className="w-[200px] h-[200px] bg-white z-20 rounded-xl flex items-center justify-center cursor-pointer mx-3 my-3 relative"
                      >
                        <img
                          src={i.imagePreview!}
                          className="w-full h-full rounded-lg absolute"
                        />

                        <div className="flex flex-row relative self-end items-end w-full justify-end">
                          <div
                            className="bg-black  p-4"
                            onClick={() => {
                              onCopy(i.id);
                            }}
                          >
                            <BsShare size={15} />
                          </div>

                          <div
                            className="bg-black p-4"
                            onClick={() => onDelete(i.id)}
                          >
                            <BsTrash size={15} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-[40vh] w-screen" />

              <UserAddImage
                isOpen={openPanel}
                onClose={() => {
                  setOpenPanel(false);
                }}
                onChange={(image, level) => {
                  playGame(image, level);
                }}
              />
            </>

            {/* {image.length > 0 && <PuzzleMe images={image} level={3} />} */}
          </Layout>
        </div>
      </div>
    </>
  );
};

export default MyPuzzle;
