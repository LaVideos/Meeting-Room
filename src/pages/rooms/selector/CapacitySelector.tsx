import styles from "./selector.module.scss";
import {useState} from "react";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)


const CapacitySelector = () => {
  const [openRoom, setOpenRoom] = useState(false);
  const [counter, setCounter] = useState(1);

  return (
    <ul className={cn('dropdown')}>
      <input
        className={cn('input')}
        type="text"
        value={`${counter} capacity`}
        onClick={() => setOpenRoom((prev) => !prev)}
        readOnly={true}
      />
      <div className={cn('ico', openRoom && 'open')}></div>
      <div
        className={cn('options', openRoom && 'show', 'capacity')}
      >
        <div
          className={cn('box')}
          onClick={(event) => {
            setCounter((prev) => (prev > 1 ? prev - 1 : prev));
          }}
        >
          -
        </div>
        <div className={cn('box', 'boxInset')}>{counter}</div>
        <div
          className={cn('box')}
          onClick={() => setCounter((prev) => prev + 1)}
        >
          +
        </div>
      </div>
    </ul>
  );
};

export default CapacitySelector;
