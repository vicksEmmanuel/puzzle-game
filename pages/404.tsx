import WormHole from "../assets/icons/WormHole";
import Layout from "../components/Layouts";
import styles from "../styles/footer.module.css";

const FourOhFour = () => {
  return (
    <div className="w-screen bg-secondary-midnight">
      <div className="h-full">
        <Layout background={"bg-secondary-midnight"}>
          <div className="px-5 w-screen h-screen absolute">
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
          <div className="h-[20vh] w-screen" />
        </Layout>
      </div>
    </div>
  );
};
export default FourOhFour;

// #0A2345
