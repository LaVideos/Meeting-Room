import React, {useState} from "react";
import ActionButton from "../../../../components/icon-button/IconButton";
import styles from "./OwnBooking.module.scss";
import stylesModal from "./modal.module.scss";
import Modal from "../../../../components/modal/Modal";
import Button from "../../../../components/button";
import {useAppDispatch, useAppSelector} from "hooks/toolkitHooks";
import dayjs from "dayjs";
import {deleteBookingById, editOwnBooking, resetState, setBookingId,} from "redux&saga/slices/booking.slice";
import ModalOwnRooms from "./ModalOwnBookings";
import {BookingProps, ownBookingsActions} from "../../../../redux&saga/slices/ownBookings.slice";
import classNames from "classnames/bind";
import TimeStartAndEnd from "../../../../components/time-start-and-end/TimeStartAndEnd";

const cn = classNames.bind(styles)


interface OwnBookingsProps{
    booking:BookingProps;
    index:number
}


const OwnBookings = ({ booking, index }:OwnBookingsProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { roomsByFloor, floors, filter, rooms, statuses } = useAppSelector(
    (state) => state.rooms
  );
  const { bookingId, start, end } = useAppSelector((state) => state.booking);

  const floor = rooms.filter((el) => el.roomId == booking.room_FK);

  const handleEdit = () => {
    const invitations = booking.invitations.map((id:any)=>id.invitedId_FK);

    dispatch(
      editOwnBooking({
        title: booking.title,
        start:  dayjs.utc(booking.startDateTime).format("YYYY-MM-DDTHH:mm"),
        end:dayjs.utc(booking.endDateTime).format("YYYY-MM-DDTHH:mm") ,
        roomId: booking.room_FK,
        description: booking.description,
        bookingId: booking.bookingId,
        floor: floor[0].floor,
        isRecurring: booking.isRecurring,
        invitedId: invitations,
      })
    );
  };
  const handleDelete = () => {
    dispatch(setBookingId(booking.bookingId));
  };

  const handleCloseModal = () => {
    setOpenDelete(false);
    dispatch(resetState());
  };

  const handleRemoveEvent = () => {
    if (bookingId) {
      dispatch(
        deleteBookingById({
          id: bookingId,
          isRecurring: false,
        })
      );
        dispatch(ownBookingsActions.reset())
    }
    setOpenDelete(false);
  };
  return (
    <>
      <div className={cn('roomCardContainer')} key={index}>
        <div className={cn('headerRoomCard')}>
            <div className={cn('text-container')}>
                <div className={cn('labelRoomName')}>{booking.title}</div>
                {booking.description !== "" && (
                    <div className={cn('labelDescription')}>{booking.description}</div>
                )}</div>

          <div className={cn('button-box')}>
            <ActionButton
              size="small"
              type="edit"
              onclick={() => {
                setOpenEdit(true);
                handleEdit();
              }}
            />
            <ActionButton
              mg={true}
              size="small"
              type="delete"
              onclick={() => {
                setOpenDelete(true);
                handleDelete();
              }}
            />
          </div>
        </div>

        <div className={cn('labelTime')}>
          <div className={cn('labelTimeHeading')}>
              <TimeStartAndEnd start={booking.startDateTime} end={booking.endDateTime}/>
          </div>
        </div>
      </div>

      {/* {openModal && (
        <Modal closeModal={handleCloseModal}>
          <BookingForm
            handleSubmit={handleSubmit}
            handleRemoveEvent={handleRemoveEvent}
            edit={Boolean(bookingData.extendedProps.bookingId)}
          />
        </Modal>
      )} */}
      {openEdit && (
        <ModalOwnRooms booking={booking} setOpenModal={setOpenEdit} />
      )}
      {openDelete && (
        <Modal closeModal={handleCloseModal}>
          <form>
            <h1 className={cn('modalh1')}>Delete?</h1>
            <p className={cn('modalp')}>
              Are you sure you want to delete this booking?
            </p>
            <div className={cn('modalDeleteButtons')}>
              <Button
                type="submit"
                styleType="error"
                onclick={() => handleRemoveEvent()}
              >
                Accept
              </Button>
              <Button type="submit" onclick={() => handleCloseModal()}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
export default OwnBookings;

