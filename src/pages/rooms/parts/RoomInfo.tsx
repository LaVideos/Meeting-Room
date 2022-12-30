import styles from "../rooms.module.scss";
import Loader from "components/loading/loader/Loader";
import "../rooms.module.scss";
import {useAppSelector} from "hooks/toolkitHooks";
import InfiniteScroll from "react-infinite-scroll-component";
import dayjs from "dayjs";
import classNames from "classnames/bind";

const cn = classNames.bind(styles)

interface RoomInfo{
  openInfo:boolean,
  setOpenInfo:any,
  setOpen:any
}

const RoomInfo = ({ openInfo, setOpenInfo, setOpen }:RoomInfo) => {
  const roomInfo = useAppSelector(
    (state) => state.rooms.roomSoonestBookingsDays
  );
  const length = roomInfo.length;
  const roomSoonestBookingsDays = length != 0 ? roomInfo[0].bookings : [];
  return (
    <div
      data-testid="info-box"
      data-info={openInfo}
      className={cn('infoBox')}
      onMouseEnter={(event) => {
        event?.preventDefault();
      }}
    >
      <span className={cn('text')}>
        <InfiniteScroll
          next={() => {}}
          hasMore={length == 0 ? true : false}
          loader={
            <div className={cn('loaderCont')}>
              <Loader size="small"></Loader>
            </div>
          }
          dataLength={1}
          className={cn('infinite')}
        >
          <div className={cn('infiniteContainer')}>
            {length != 0 ? (
              roomSoonestBookingsDays.map((booking: any,index:any) => {
                return (
                  <div key={index} className={cn('soonestBooking')}>
                    <div className={cn('soonestBookingTitle')}>
                      {booking.title}
                    </div>
                    {/* <div className={styles.soonestBookingDesc}>Time</div> */}
                    <div className={cn('soonestBookingDesc')}>
                      Starts:
                      <span>
                        {dayjs(booking.startDateTime).format("HH:mm")}{" | "}
                        {dayjs(booking.startDateTime).format("DD MMMM YYYY")}
                      </span>
                    </div>
                    <div className={cn('soonestBookingDesc')}>
                      Ends:
                      <span>
                        {dayjs(booking.endDateTime).format("HH:mm")} {" | "}
                        {dayjs(booking.endDateTime).format("DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={cn('thisRoom')}>
               Please wait, maybe this room is available for the next 10 days
              </p>
            )}
          </div>
        </InfiniteScroll>
      </span>
    </div>
  );
};
export default RoomInfo;