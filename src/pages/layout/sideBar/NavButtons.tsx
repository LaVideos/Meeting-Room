import { Link } from "react-router-dom";
import styles from "./navButtons.module.scss";
import cn from "classnames";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "hooks/toolkitHooks";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import { SlLocationPin,SlHome } from "react-icons/sl";
import {BsCalendar4Week} from "react-icons/bs";



const NavButtons = () => {
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.rooms);
  const setLocation = (loc: any) => {
    dispatch(roomsActions.setLocation(loc));
  };
  useEffect(() => {}, [location]);
  return (
    <div className={styles.navButton}>
      <Link
        to="/rooms"
        onClick={() => setLocation("/rooms")}
        className={cn(
          styles.link,
          location == "/rooms" && styles.current,
          styles.rooms
        )}
      > <SlHome/> </Link>
      <Link
        to="/calendar"
        onClick={() => setLocation("/calendar")}
        className={cn(
          styles.link,
          location == "/calendar" && styles.current,
          styles.calendar
        )}
      ><BsCalendar4Week/></Link>
      <Link
        to="/map"
        onClick={() => setLocation("/map")}
        className={cn(
          styles.link,
          location == "/map" && styles.current,
          styles.map
        )}
      ><SlLocationPin/></Link>
    </div>
  );
};
export default NavButtons;
