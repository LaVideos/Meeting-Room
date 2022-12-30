import {Box, Typography} from "@mui/material"

import dayjs from "dayjs";

import styles from "./TimeStartAndEnd.module.scss";
import "components/interactive-tools/time-picker/styles/styles.module.scss";

import classNames from 'classnames/bind';
import {TbClock, TbClockOff} from "react-icons/tb";

const cn = classNames.bind(styles)

interface CardProps {
    start: string;
    end: string;
}

const TimeStartAndEnd = ({start, end}: CardProps) => {

    const startHour = dayjs(start).format('HH:mm');
    const startDate = dayjs(start).format('DD MMMM YYYY');
    const endHour = dayjs(end).format('HH:mm');
    const endDate = dayjs(end).format('DD MMMM YYYY');

    return (
        <div className={cn('time-container')}>
            <span className={cn('divider')}></span>
            <div className={cn('start-end-container')}>
                <span className={cn('svg-box')}><TbClock/></span>
                <div className={cn('start-data')}>
                    {startHour + ' | ' + startDate}
                </div>
            </div>


            <div className={cn('start-end-container')}>
                <span className={cn('svg-box')}><TbClockOff/></span>
                <div className={cn('end-data')}>
                    {endHour + ' | ' + endDate}
                </div>
            </div>
        </div>
    )
}

export default TimeStartAndEnd