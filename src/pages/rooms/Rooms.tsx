import styles from "./rooms.module.scss";
import Header from "./header/Header";
import Floors from "./main/Floor";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { useEffect } from "react";
import moment, { now } from "moment";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import Loader from "components/loading/loader/Loader";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)

const Rooms = () => {
  const {
    roomsByFloor,
    floors,
    filter,
    rooms,
    timeStatusUdated,
    statusUpdatedCounter,
  } = useAppSelector((state) => state.rooms);

  const dispatch = useAppDispatch();
  const HandleStatus = () => {
    if (rooms.length > 0) {
      const timeStatus = Date.now();
        dispatch(roomsActions.setTimeStatusUdated(timeStatus));
        dispatch(roomsActions.setStatusUpdatedCounter());
        dispatch(roomsActions.getRoomsStatus(rooms));
    }
  };
  useEffect(() => {
    rooms.length == 0 && dispatch(roomsActions.getRooms());
  }, []);
  useEffect(() => {
    if (rooms.length > 0) {
      setInterval(HandleStatus, 60000);
      statusUpdatedCounter == 0 && HandleStatus();
    }
  }, [rooms]);

  return (
    <div className={cn('roomsContainer')}>
      <div className={cn('mainContainer')}>
        <Header />
        <div className={cn('roomsList')}>
          <div className={cn('boxInset')}></div>
          <div className={cn('boxOutset')}></div>

          {Object.keys(roomsByFloor).length > 0 && filter == "all" ? (
            floors.map((currentFloor, index) => {
              return <Floors key={index} currentFloor={currentFloor}></Floors>;
            })
          ) : filter !== "all" ? (
            Object.keys(roomsByFloor).length > 0 ? (
              <Floors currentFloor={Number(filter)}></Floors>
            ) : (
              <p className={cn('noFloor')}>
                There are no meeting rooms on this floor
              </p>
            )
          ) : (
            <div className={cn('loader')}>
              <Loader size="large" />
            </div>
          )}
          <div className={cn('boxInset2')}></div>
          <div className={cn('boxOutset2')}></div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
