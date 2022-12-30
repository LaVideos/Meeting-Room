import styles from "./selector.module.scss";
import { useState, useEffect } from "react";
import MockedData from "../parts/MockedData";
import classNames from "classnames/bind";

interface RoomsSelector{
    floor:string,
    name:string
}

const cn = classNames.bind(styles)

const RoomsSelector = ({ floor, name = MockedData[0].name }:RoomsSelector) => {
  const [room, setRoom] = useState(name);
  const [openRoom, setOpenRoom] = useState(false);

  return (
    <ul className={cn('dropdown')}>
      <input
        className={cn('input')}
        type="text"
        value={room}
        onClick={() => setOpenRoom((prev) => !prev)}
        readOnly={true}
      />
      <div className={cn(cn('ico'), openRoom && cn('open'))}></div>
      <ul className={cn('options', openRoom && 'show')}>
        {MockedData.map((data) => {
          if (data.floor.toString() == floor.toString()) {
            return (
              <li
                key={data.name}
                className={cn('item')}
                onClick={() => {
                  setOpenRoom(false);
                  setRoom(data.name);
                }}
              >
                {data.name}
              </li>
            );
          }
        })}
      </ul>
    </ul>
  );
};

export default RoomsSelector;
