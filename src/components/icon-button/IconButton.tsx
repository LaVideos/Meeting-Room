import { useState } from "react";
import {ReactComponent as Delete} from '../../assets/icons/svg/garbage.svg'
import {ReactComponent as Settings} from '../../assets/icons/svg/settings.svg'
import {ReactComponent as Edit} from '../../assets/icons/svg/edit.svg'
import {ReactComponent as Close} from '../../assets/icons/svg/close.svg'

import styles from "./iconButton.module.scss";
import cn from "classnames";
interface btn {
  type?: string;
  mg?: boolean;
  size?: string;
  onclick?: () => void;
}
const IconButton = ({
  type = "edit",
  size = "medium",
  onclick = () => {},
  mg = false,
}: btn) => {
  const MainCn = cn(
    styles.button,
    styles[type],
    styles[size],
    mg ? styles.margin : styles.none
  );

  return (
    <button
      data-testid="iconButton"
      className={MainCn}
      onClick={() => onclick()}
    >
      {type==='delete'&&<Delete/>}
      {type==='edit'&&<Edit/>}
      {type==='settings'&&<Settings/>}
      {type==='close'&&<Close/>}
    </button>
  );
};

export default IconButton;
