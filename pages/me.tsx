import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import WormHole from "../assets/icons/WormHole";
import UserAddImage from "../components/Game/UserAddImage";
import Layout from "../components/Layouts";
import styles from "../styles/footer.module.css";
import PuzzleMe from "../components/Game/PuzzleMe";

const MyPuzzle = () => {
  const [openPanel, setOpenPanel] = useState(false);

  const [splitNumber, setSplitNumber] = useState(5);
  const [image, setImage] = useState<string[]>([]);

  const playGame = (image: string, level: number) => {
    var canvas = document.createElement("canvas"); // In memory canvas
    var ctx = canvas.getContext("2d");
    const parts: string[] = []; // to push into oud base64 strings
    let img = new Image();

    function split_4(this: any) {
      var w2 = img.width / 2,
        h2 = img.height / 2;

      for (var i = 0; i < level; i++) {
        var x = (-w2 * i) % (w2 * 2),
          y = h2 * i <= h2 ? 0 : -h2;

        canvas.width = w2;
        canvas.height = h2;

        ctx?.drawImage(this, x, y, w2 * 2, h2 * 2); // img, x, y, w, h
        parts.push(canvas.toDataURL()); // ("image/jpeg") for jpeg
      }

      setImage(parts);
    }

    img.onload = split_4;
    img.src = image;
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

            {image.length <= 0 && (
              <>
                <div
                  className={`h-[80vh]  flex justify-center items-center bg-secondary-midnight text-white`}
                  style={{ zIndex: 1000 }}
                  onClick={() => setOpenPanel(true)}
                >
                  <div className="flex flex-col w-full px-8">
                    <div className="w-[300px] h-[300px] bg-white opacity-[0.7] z-20 rounded-xl flex items-center justify-center cursor-pointer">
                      <FaPlus color="grey" size={50} />
                    </div>
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
            )}

            {image.length > 0 && <PuzzleMe images={image} level={3} />}
          </Layout>
        </div>
      </div>
    </>
  );
};

export default MyPuzzle;
