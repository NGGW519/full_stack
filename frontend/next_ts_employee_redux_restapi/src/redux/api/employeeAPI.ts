import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";
import EmployeeList from "@/components/EmployeeList";
import {thunk} from "redux-thunk";


const API_URL = "http://localhost:3001";

/////////////////// GET 방식으로 전체 데이터(infos) 가져오기 ///////////////////
export const fetchGetEmployeeInfos = createAsyncThunk<EmployeeInfo[], void, {rejectValue: string}>(
    "employeeApi/fetchGetEmployeeInfos",
    async (_, thunkAPI) => {
        // 함수를 실행하는 자리에 async를 적는다. 즉 파라미터 자리 앞에!
        // react는 object로 넘기기 때문에 파라미터는 1개만 받으면된다. thunkAPI는 에러잡는 곳
        try{
            const response = await axios.get(`${API_URL}/app/emp`); // api를 던지면 받을때까지 기다린다.
            return response.data;
        }catch{
            return thunkAPI.rejectWithValue("데이터 로드 실패")
        }

    }
);

/////////////////// POST 방식으로 데이터 전송하기 ///////////////////
export const fetchPostEmployeeInfo = createAsyncThunk<EmployeeInfo, EmployeeInfo, {rejectValue: string}>(
    "employeeApi/fetchPostEmployeeInfo",
    async (obj, thunkAPI) => {
        // post는 form 태그를 통해 오브젝트를 받아야한다.
        try{
            const response = await axios.post<EmployeeInfo>(`${API_URL}/app/emp`, obj);
            return response.data; // 얘가 action.payload 임
        }catch{
            return thunkAPI.rejectWithValue("데이터 전송 실패")
        }
    }
);

/////////////////// PUT 방식으로 데이터 수정하기 ///////////////////
export const fetchPutEmployeeInfoById = createAsyncThunk<EmployeeInfo, EmployeeInfo, {rejectValue: string}>(
    "employeeApi/fetchPutEmployeeInfoById",
    async (emp, thunkAPI) => {
        try{
            const response = await axios.put<EmployeeInfo>(`${API_URL}/app/emp/${emp.id}`, emp);
            return response.data;
        }catch{
            return thunkAPI.rejectWithValue("데이터 수정 실패")
        }
    }
)

/////////////////// Delete selectedId 기반 ///////////////////
export const fetchDeleteEmployeeInfoById = createAsyncThunk<number, number, {rejectValue: string}>(
    "employeeApi/fetchDeleteEmployeeById",
    async (id, thunkAPI) => {
        try{
            await axios.delete(`${API_URL}/app/emp/${id}`)
            return id; // 보냈던 id를 삭제했다는 의미로 id를 받음
        }catch{
            return thunkAPI.rejectWithValue("데이터 삭제 실패")
        }
    }
)

