import {configureStore} from "@reduxjs/toolkit";
import emp from "@/redux/employeeSlice";
//위에 보면, from 뒤에있는 파일을 보면 맨 밑에 export default가 employeeSlice이므로, employeeSlice가 import 될 것이다. 따라서 emp라고 적머 alias처럼 써먹는다.

export const store = configureStore({ // 여기에 Slice를 계속해서 추가해준다.
    reducer: {
        emp, // 원래 emp: emp라고 썼을것인데, 두 단어가 같으므로 그냥 emp라 적음
    }
});

export type RootState = ReturnType<typeof store.getState>; // state
export type RootDispatch = typeof store.dispatch; // action