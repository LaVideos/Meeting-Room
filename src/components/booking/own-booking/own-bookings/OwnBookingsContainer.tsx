import styles from "./OwnBookings.module.scss";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "components/interactive-tools/time-picker/styles/styles.module.scss";
import {BookingProps, ownBookingsActions} from "redux&saga/slices/ownBookings.slice";
import {useAppDispatch, useAppSelector} from "hooks/toolkitHooks";
import Loader from "components/loading/loader/Loader";
import OwnBookings from "../own-booking/OwnBookings";

import classNames from 'classnames/bind';

const cn = classNames.bind(styles)

const OwnBookingsContainer = () => {

  const dispatch = useAppDispatch()
  const { bookings, page,totalCount, loading} = useAppSelector(state => state.ownBookings)

  const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
      dispatch(ownBookingsActions.reset())
      dispatch(ownBookingsActions.getOwnBookings({ page: 1 }))
  }, [dispatch])

    useEffect(()=>{},[bookings])

  const handleMoreData = () => {
          dispatch(ownBookingsActions.getOwnBookings({page: page}))
          dispatch(ownBookingsActions.setPage(page + 1))
  }

  return (
      <div className={cn('myRoomsContainer')} data-testid="my-rooms">
          <p className={cn('labelMyRooms')}>my bookings</p>

        <InfiniteScroll
            height="55vh"
            dataLength={page}
            next={handleMoreData}
            hasMore={hasMore}
            className={cn('scroll')}
            loader={
             !loading && <div className={cn('loader')}>
                    <Loader size="small"></Loader>
                </div>
            }
        >
            <div className={cn('roomsCardsContainer')}>
            {
            bookings.map((booking:BookingProps) =>{
            return <OwnBookings key={booking.bookingId} booking={booking} index={booking.bookingId}></OwnBookings>})
          }
            </div>
        </InfiniteScroll>
      </div>
  )

};
export default OwnBookingsContainer;
