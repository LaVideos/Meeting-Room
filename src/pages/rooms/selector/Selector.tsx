import { useState } from "react";

import styles from "./selector.module.scss";
import FloorSelector from "./FloorSelector";
import RoomsSelector from "./RoomsSelector";
import CapacitySelector from "./CapacitySelector";
import classNames from "classnames/bind";
interface selector {
  floor?: string;
  name?: string;
}

const cn = classNames.bind(styles)


const Selector = ({ floor = "1", name }: selector) => {
  const floorCount = 4;
  const arr = Array.from({ length: floorCount }, (_, i) => i + 1);
  const [currentFloor, setFloor] = useState(floor);

  return (
    <div className={cn('container')}>
      <FloorSelector arr={arr} floor={currentFloor} setFloor={setFloor} />
      <CapacitySelector></CapacitySelector>
    </div>
  );
};

export default Selector;
