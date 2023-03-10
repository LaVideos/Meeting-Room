import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { Dayjs } from "dayjs";
import styles from "./bookingForm.module.scss";
import DateAndTimePicker from "components/interactive-tools/date-time-picker";
import Button from "components/interactive-tools/button";
import { Link } from "react-router-dom";
import ConfirmDialog from "components/popup-modal-dialog/confirm-dialog";
import { useAppDispatch, useAppSelector } from "hooks/toolkitHooks";
import {
  setRoomId,
  setBookingError,
  setDaysOfWeek,
  setDescription,
  setEnd,
  setFloor,
  setStart,
  setTitle,
} from "redux&saga/slices/booking.slice";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InviteCoworkers from "./invite-coworkers/InviteCoworkers";
import { SelectChangeEvent } from "@mui/material/Select";
import { daysOfTheWeek } from "constants/booking-form";
import SelectorMultiple from "./selector/SelectorMultiple";
import { Errors } from "constants/errors";
import SelectorFloorAndRoom from "components/booking/selector-floor-and-room/SelectorFloorAndRoom";
import { roomsActions } from "redux&saga/slices/rooms.slice";
import classNames from "classnames/bind";
import InputRe from "../../interactive-tools/input/InputRe";
import {useForm} from "react-hook-form"; //added
interface BookingFormProps {
  edit: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleRemoveEvent: () => void;
  linkToCalendar?: boolean;
}


const cn = classNames.bind(styles)

const BookingForm = ({
  linkToCalendar = false,
  edit,
  handleSubmit,
  handleRemoveEvent,
}: BookingFormProps) => {
  const [openConfirmation, setOpenConfirmation] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const { title, start, end, floor, errors, description, roomId, daysOfWeek } =
    useAppSelector((state) => state.booking);

  const {
    reset,
    register,
    formState: { isDirty },
  } = useForm({ mode: "all" });

  const onConfirm = () => {
    handleRemoveEvent();
    setOpenConfirmation(false);
  };
  const onDismiss = () => {
    setOpenConfirmation(false);
  };

  const handleBlurTitle = () => {
    if (title?.trim().length > 40 || title?.trim().length < 5) {
      dispatch(setBookingError({ title: Errors.titleLength }));
    } else dispatch(setBookingError({ title: "" }));
  };
  const handleBlurDescription = () => {
    if (description?.trim().length > 200 || description?.trim().length < 5) {
      dispatch(setBookingError({ description: Errors.descriptionLength }));
    } else dispatch(setBookingError({ description: "" }));
  };

  const handleChangeRoom = (e: SelectChangeEvent<string>) => {
    dispatch(setRoomId(Number(e.target.value)));
    dispatch(setBookingError({ roomId: "" }));
  };
  const handleChangeFloor = (e: SelectChangeEvent<string>) => {
    dispatch(setFloor(e.target.value));
    dispatch(setRoomId(null));
    dispatch(setBookingError({ floor: "" }));
  };

  const handleChangeStart = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(setStart(event.format("YYYY-MM-DDTHH:mm")));
    }
  };
  const handleChangeEnd = (event: Dayjs | null) => {
    if (event !== null) {
      dispatch(setEnd(event.format("YYYY-MM-DDTHH:mm")));
    }
  };

  const handleChangeWeek = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value;
    dispatch(
      setDaysOfWeek(typeof value === "string" ? value.split(",") : value)
    );
  };
  const handleGoToCalendar = () => {
    //added
    dispatch(roomsActions.setLocation("/calendar")); //added
  }; //added
  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mb: "20px",
          textAlign: "center",
          color: "var(--accent-text-color)",
        }}
      >
        Booking
      </Typography>
      <form
          className={cn('form')}
        // sx={{ displa: "flex", flexDirection: "column", p: "20px" }}
        // component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Grid container maxWidth={1000} spacing={3}>
          <Grid item xs={6}>
            <div className={cn('input-container')}>
              <TextField
                error={Boolean(errors.title)}
                autoFocus
                label="Title"
                data-testid="input-title"
                fullWidth
                value={title}
                onBlur={handleBlurTitle}
                onChange={(event) => dispatch(setTitle(event.target.value))}
                helperText={errors.title ? errors.title : ""}
              />
            </div>
            <Box className={cn('input-container','input-description')}
              sx={{
                mb: "25px",
                height: "120px",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "25px",
                },
              }}
            >
              <TextField
                  className={cn('input-description')}
                value={description}
                onChange={(event) =>
                  dispatch(setDescription(event.target.value))
                }
                label="Description"
                fullWidth
                multiline
                rows={3}
                onBlur={handleBlurDescription}
                data-testid="input-description"
                error={Boolean(errors.description)}
                helperText={errors.description ? errors.description : ""}
              />

            </Box>
            <div
                className={cn('input-and-date-container')}
            >
              <DateAndTimePicker
                date={start}
                errorMsg={errors.start}
                onChange={handleChangeStart}
                label="Start"
              />
              <DateAndTimePicker
                date={end}
                minDate={start}
                errorMsg={errors.end}
                onChange={handleChangeEnd}
                label="End"
              />
            </div>
            
          </Grid>
          <Grid item xs={6}>
            <div
                className={cn('input-container-days-of-the-week')}
            >
              <SelectorMultiple
                value={daysOfWeek ? daysOfWeek : []}
                dataTestId="selector-multiple"
                label="Days of week"
                daysOfWeek={daysOfTheWeek}
                onChange={handleChangeWeek}
              />
            </div>
            <div className={cn('input-invite-coworker')}>
              <InviteCoworkers edit={edit}/>
            </div>
            <div
                className={cn('input-selector-floor-and-room')}
            >
              <SelectorFloorAndRoom
                edit={edit}
                valueFloor={floor}
                valueRoom={roomId?.toString() || ""}
                onChangeFloor={handleChangeFloor}
                onChangeRoom={handleChangeRoom}
                errorMsg={errors}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <div
                className={cn('button-container')}
            >
              {edit && (
                <Button
                  styleType="error"
                  dataTestId="button-delete"
                  onclick={() => setOpenConfirmation(true)}
                >
                  Delete
                </Button>
              )}
              <Button
                disabled={Boolean(Object.values(errors).join(""))}
                type="submit"
                onclick={() => {}}
                dataTestId="button-submit"
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
      <ConfirmDialog
        open={openConfirmation}
        message="Do you want to delete event"
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {linkToCalendar && (
        <Link to="/calendar">
          <div
            className={cn('linkToCalendarContainer')}
            onClick={() => handleGoToCalendar()}
          >
            {/* added onClick */}
            <span className={cn('goToCalendar')}>
              Can't find a free date? Go to the calendar{" "}
            </span>
            <svg
              className={cn('svg')}
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                fillRule="nonzero"
              />
            </svg>
          </div>
        </Link>
      )}
    </>
  );
};

export default BookingForm;
