import styles from "./selector.module.scss";
import {useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)

interface FloorSelectorProps{
    arr:number[],
    floor:string,
    setFloor:any
}

const FloorSelector = ({ arr, floor,setFloor }:FloorSelectorProps) => {
  const [openFloor, setOpenFloor] = useState(false);

  return (
    <ul className={cn('dropdown')}>
      <input
        className={cn('input')}
        type="text"
        value={`${floor} Floor`}
        readOnly={true}
        onClick={() => setOpenFloor((prev) => !prev)}
      />
      <div className={cn('ico', openFloor && 'open')}></div>
      <ul className={cn('options', openFloor && 'show')}>
        {arr.map((currentFloor:any) => {
          return (
            <li
              key={currentFloor}
              onClick={() => {
                setOpenFloor(false);
                setFloor(currentFloor.toString());
              }}
              className={cn('item')}
            >
              {currentFloor}
            </li>
          );
        })}
      </ul>
    </ul>
  );
};

export default FloorSelector;