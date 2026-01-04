import { combineReducers } from "redux";
import { AuthReducer } from "./Authentication/AuthReducer";
import { UserDataReducer } from "./UserData/UserDataReducer";
import { DoctorsListReducer } from "./DoctorsList/DoctorsListReducer";
import { AppointmentListReducer } from "./AppointmentList/AppointmentListReducer";
import { FCMTokenReducer } from "./FCMToken/FCMTokenReducer";

export default rootReducer = combineReducers({
    AuthReducer,
    UserDataReducer,
    DoctorsListReducer,
    AppointmentListReducer,
    FCMTokenReducer,
})
