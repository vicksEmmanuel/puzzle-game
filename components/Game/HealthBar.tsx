import React from "react";
import styles from "./Puzzle.module.scss";

const HealthBar = ({ maxHp = 100, hp = 100 } = {}) => {
  const barWidth = (hp / maxHp) * 100;
  return (
    <div>
      <div className={styles["health-bar"]}>
        <div className={styles["bar"]} style={{ width: `${barWidth}%` }}></div>
        <div className={styles["hit"]} style={{ width: `${0}%` }}></div>

        <div
          style={{
            position: "absolute",
            top: "5px",
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          className="text-xs bottom-5 items-center justify-center"
        >
          {hp} / {maxHp}
        </div>
      </div>

      <br />
    </div>
  );
};

export default HealthBar;
