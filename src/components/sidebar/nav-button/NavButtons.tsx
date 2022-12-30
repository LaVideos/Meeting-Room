import {NavLink} from "react-router-dom";
import styles from "./navButtons.module.scss";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "hooks/toolkitHooks";
import {roomsActions} from "redux&saga/slices/rooms.slice";
import {SlHome, SlLocationPin} from "react-icons/sl";
import {BsCalendar4Week} from "react-icons/bs";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)


const NavButtons = () => {
  const dispatch = useAppDispatch();
  const { location } = useAppSelector((state) => state.rooms);
  const setLocation = (loc: any) => {
    dispatch(roomsActions.setLocation(loc));
  };
  useEffect(() => {}, [location]);
  return (
    <div className={cn('navButton')}>

        <div className={cn('nav')}>

            <div className={cn('link-box')}>
                <NavLink
                    to="/rooms"
                    onClick={() => setLocation("/rooms")}
                > <SlHome/> </NavLink>
            </div>

            <div className={cn('link-box')}>

                <NavLink
                    to="/calendar"
                    onClick={() => setLocation("/calendar")}
                ><BsCalendar4Week/></NavLink>

            </div>

            <div className={cn('link-box')}>

                <NavLink
                    to="/map"
                    onClick={() => setLocation("/map")}
                ><SlLocationPin/></NavLink>

            </div>
        </div>

    </div>
  );
};
export default NavButtons;
