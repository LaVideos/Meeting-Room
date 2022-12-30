import {Box} from '@mui/material'
import SideBar from '../../pages/layout/sideBar/SideBar';
import {Outlet} from 'react-router-dom';
import styles from "./AppMain.container.scss";
import React from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)

const AppMain: React.FunctionComponent = () => {
      return (
    <div className={cn('main-container')}>
      <div className={cn('outlet-container')}>
        <Outlet />
      </div>
      <div className={cn('sidebar-container')}>
        <SideBar/>
      </div>
    </div>
  )
}

export default AppMain
