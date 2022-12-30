import RoomCard from "../parts/RoomCard";
import styles from "./Floor.module.scss";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import classNames from "classnames/bind";
interface floor {
  currentFloor: number;
}
interface room {
  name: string;
  floor: number;
  equipment: {
    projector: boolean;
    TV: boolean;
  };
  capacity: string;
}
interface devices {
  deviceId: number;
  name: string;
}
interface rooms {
  roomId: number;
  name: string;
  floor: number;
  capacity: number;
  office_FK: number;
  devices: Array<devices>;
}

const cn = classNames.bind(styles)


const Floors = ({ currentFloor }: floor) => {
  const dataFloor = useAppSelector(
    (state) => state.rooms.roomsByFloor[currentFloor-1]
  );
  //@ts-ignore

  const length = dataFloor.length;
  const filter = useAppSelector((state) => state.rooms.filter);
  return (
    <div key={length}>
      {dataFloor.length > 0 && (
        <>
          {filter == "all" && (
            <p className={cn('pFloor')}>Floor {currentFloor}</p>
          )}
          <div className={cn('floor')}>
            {length > 0 &&
              dataFloor?.map((currentData, index) => (
                <RoomCard
                  data={currentData}
                  key={currentData.roomId}
                ></RoomCard>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Floors;
