import styles from "./SideBar.module.scss";
import React, {useEffect} from "react";

import ActionButton from "../../components/interactive-tools/icon-button/IconButton";
import NavButtons from "components/sidebar/nav-button/NavButtons";
import {NavLink, useLocation} from "react-router-dom";
import {PseudoAvatar} from "../../components";
import {useModal} from "../../hooks/show.modal";
import {DialogComponent} from "../../components/popup-modal-dialog/dialog/DialogComponent";
import AdminModalTool from "../../components/admin/admin-modal-tools/AdminModalTool";
import BadgeRe from "../../components/interactive-tools/badge/BadgeRe";
import {getUserData} from "../../services/local-storage.service";
import {colorsFn} from "../../utils/colors.arr";
import classNames from "classnames/bind";
import {FaToolbox} from "react-icons/fa";
import OwnBookingsContainer from "../../components/booking/own-booking/own-bookings/OwnBookingsContainer";

const cn = classNames.bind(styles)



const SideBar = () => {
  const location = useLocation();
  let {isShowing, toggle} = useModal();
  const {firstName,lastName,role} = getUserData();
  useEffect(()=>{},[colorsFn])
  
  return (
    <div className={cn('position')}>
      {role==="admin"&&
          isShowing&&
          <div>
            <DialogComponent
                isShowing={isShowing}
                children={<AdminModalTool onclick={toggle}/>}
            />
          </div>}
      <div className={cn('sideBar')}>
        <div className={cn('settContainer')}>
          <div className={cn('userImg')}>
            <PseudoAvatar firstname={firstName[0]} lastname={lastName[0]} color={colorsFn}/>
          </div>
          <span className={cn('label')}>{firstName + ' ' + lastName}</span>
          <NavLink state={{ from: location }} to="/profile">
            <ActionButton
              type="settings"
              size="medium"
              onclick={() => {}}
            ></ActionButton>
          </NavLink>
        </div>
        {role==="admin"&&
            <div className={cn('tools')}>
              <div className={cn('tool-container')} onClick={toggle}><BadgeRe component={<FaToolbox/>} variant={"dot"} badgeColor={"mint"}/></div>
        </div>}
        <OwnBookingsContainer />
      </div>
      <NavButtons />
    </div>
  );
};

export default SideBar;
