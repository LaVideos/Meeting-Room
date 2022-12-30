import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface BookingProps {
  bookingId: number;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  isRecurring: boolean;
  creatorId_FK: number;
  room_FK: number;
  invitations:Array<number>;
}
export interface InitialStateBooking {
  bookings: Array<BookingProps>
  totalCount: number;
  limit: number;
  page:number;
  loading: boolean;
}

export interface GetOwnBookingsPayload {
  page: number;
}

export interface GetOwnBookingsSuccessPayload {
  bookings: BookingProps[];
  totalCount: number;
}

const initialState: InitialStateBooking = {
  bookings: [],
  totalCount: 0,
  limit:0,
  page:2,
  loading: false

};

const ownBookingsSlice = createSlice({
  name: "ownBookings",
  initialState,
  reducers: {
    getTotal(state, { payload }) {},
    setTotal(state, { payload }) {
      state.totalCount = payload.totalCount;
      state.limit = payload.limit;
    },
    reset(state) {
      state.totalCount = 0;
      state.bookings = [];
      state.limit = 0;
      state.page = 2;
    },

    loading(state,action){
      state.loading = action.payload
    },

    getOwnBookings(state, action: PayloadAction<GetOwnBookingsPayload>) {
      // state.loading = false
    },
    getOwnBookingsSuccess(state, action: PayloadAction<GetOwnBookingsSuccessPayload>) {
      state.bookings = [...state.bookings, ...action.payload.bookings]
      state.totalCount = action.payload.totalCount
      state.loading = false
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
});
export const ownBookingsActions = ownBookingsSlice.actions;

const ownBookingsReducer = ownBookingsSlice.reducer;

export default ownBookingsReducer;
