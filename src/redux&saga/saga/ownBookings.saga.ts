import {all, call, fork, put, take, takeEvery} from "redux-saga/effects";
import {GetOwnBookingsPayload, ownBookingsActions} from "redux&saga/slices/ownBookings.slice";
import {AxiosResponse} from "axios";
import {OwnBookingsService} from "../../services/room.service/ownBookings.service";
import {PayloadAction} from "@reduxjs/toolkit";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";


dayjs.extend(utc);

function* workerGetOwnBookings(action: PayloadAction<GetOwnBookingsPayload>) {
  const { page } = action.payload
  try {
    const response: AxiosResponse = yield call(OwnBookingsService.getOwnBookings,page)
    const { bookings, totalCount } = response.data

    if( bookings.length>0){
      yield put(ownBookingsActions.loading(false))
      yield put(ownBookingsActions.getOwnBookingsSuccess({ bookings, totalCount }))
    }else {
      yield put(ownBookingsActions.loading(true))
    }
  } catch (error: any) {
    console.log(error);
  }
}



export default function* ownBookingsSaga() {
  yield takeEvery("ownBookings/getOwnBookings", workerGetOwnBookings);
}


// function* workerOwnBookings(a: any) {
//   try {
//     const data: AxiosResponse = yield call(
//       OwnBookingsService.getOwnBookings,
//       a.payload
//     );
//     yield put(ownBookingsActions.setOwnBookings(data?.data.bookings));
//   } catch (error) {
//     console.log(error);
//   }
// }
// function* workerTotalCounts(a: any) {
//   try {
//     const data: AxiosResponse = yield call(
//       OwnBookingsService.getOwnBookings,
//       a.payload
//     );
//     const total = {
//       totalCount: data?.data.totalCount,
//       limit: data?.data.limit,
//     };
//
//     yield put(ownBookingsActions.setTotal(total));
//     yield put(ownBookingsActions.getOwnBookingsSuccess(data?.data.bookings));
//   } catch (error) {
//     console.log(error);
//   }
// }
//
// function* watchTotalCounts() {
//   while (true) {
//     const action: PayloadAction = yield take(ownBookingsActions.getTotal.type);
//     yield fork(workerTotalCounts, action);
//   }
// }
// function* watchOwnBookings() {
//   while (true) {
//     const action: PayloadAction = yield take(
//       ownBookingsActions.getOwnBookings.type
//     );
//     // @ts-ignore
//     yield fork(workerGetOwnBookings, action);
//   }
// }
// export default function* ownBookingsSaga() {
//   yield all([fork(watchOwnBookings), fork(watchTotalCounts)]);
// }