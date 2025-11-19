import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    fetchDeleteEmployeeInfoById,
    fetchGetEmployeeInfos,
    fetchPostEmployeeInfo,
    fetchPutEmployeeInfoById
} from "@/redux/api/employeeAPI";


////////////////////// 여러가지 타입을 갖게하기 위한 타입 지정 //////////////////////
export type Mode = "" | "register" | "upgrade" | "delete" | "reset"  // ""은 초기값을 넣기 위한 초기화용 문자열


interface ModeItem{
    id: Mode;
    label:string;
}

////////////////////// mode data //////////////////////
const modes: ModeItem[] = [
    {id: "register" as Mode, label: "Register" as string},
    {id: "upgrade" as Mode, label: "upgrade" as string},
    {id: "delete" as Mode, label: "delete" as string},
    {id: "reset" as Mode, label: "reset" as string}]

export type EmployeeInfo = {
    id: number,
    name: string,
    age: number | string,
    job: string,
    language: string,
    pay: number | string,
}

interface EmployeeStateType {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo | null;
    selectedId: number| null;
    error: string | null;
    loading: boolean;
}

////////////////////// initialState 설정 (키값을 의미) //////////////////////
const initialState: EmployeeStateType = {
    mode: '',
    modes, // 이름이 같아서 그냥 modes라고만 적는다.
    infos: [],
    upInfo: null,
    selectedId: 0,
    error: null,
    loading: false
}


////////////////////// Action Reducers 설정 //////////////////////
const handleModeReducer = (
    state: EmployeeStateType,
    action: PayloadAction<Mode>,
) => {
    const mode = action.payload

    if (mode === "delete") {
        if (!state.selectedId) {
            alert("직원을 선택하세요.")
            return;
        }
        const targetObj = state.infos.find(x => x.id === state.selectedId);
        if (!targetObj) {
            alert("해당 직원을 찾을 수 없습니다.")
            return;
        }
        if (confirm(`${targetObj.name} 직원을 삭제하시겠습니까?`)) {
            state.infos = [...state.infos].filter(item => item.id !== state.selectedId);
            state.mode = "";
            state.upInfo = null;
            state.selectedId = null;
        }
        return;
    }
    if (mode === "reset") {
        if (confirm("목록을 초기 데이터로 되돌릴까요?")) {
            state.infos = [];
            state.mode = "";
            state.upInfo = null;
            state.selectedId = null;
        }
        return;
    }
    if (mode === "upgrade"){
        if(!state.selectedId){
            alert("수정할 직원을 선택해주세요.")
            return;
        }
    }

    state.mode = mode
}

const handleSelectedIdReducer = (
    state:EmployeeStateType,
    action:PayloadAction<number>
) => {
    const id = action.payload; // 아래에서 action.payload.id 라고 써야하는 걸 그냥 id라고 적을 수 있게 함
    state.selectedId = id;
    state.upInfo = state.infos.filter(info => info.id === id)[0] ?? null;
}

// api 설계시 Register의 handleSubmit에 직접 넣음으로서 주석처리
// const handleRegisterReducer = (
//     state: EmployeeStateType,
//     action: PayloadAction<EmployeeInfo>
// ) => {
//     const obj = action.payload;
//     if (!obj.name) {
//         alert("이름은 필수입니다.")
//         return;
//     }
//     if (!obj.age || Number(obj.age) < 0) {
//         alert("나이는 필수입니다.")
//         return;
//     }
//     if (!obj.pay || Number(obj.pay) < 0) {
//         alert("급여는 필수입니다.")
//         return;
//     }
//     if (state.infos.some(item => item.name === obj.name)) {
//         alert("이미 존재하는 이름입니다.")
//         return;
//     }
//     const nextId = state.infos.length ? Math.max(...state.infos.map((i) => i.id)) + 1 : 1;
//     state.infos = [...state.infos, {...obj, id: nextId}];
// }


// api 설계시 Upgrade의 handleSubmit에 직접 넣음으로서 주석처리
// const handleUpgradeReducer = (
//     state: EmployeeStateType,
//     action: PayloadAction<EmployeeInfo>
// ) => {
//     const obj = action.payload;
//     if (Number(obj.age) < 0) {
//         alert("0 이상의 숫자를 입력하세요.")
//         return;
//     }
//     if (Number(obj.pay) < 0) {
//         alert("0 이상의 숫자를 입력하세요.")
//         return;
//     }
//     state.infos = [...state.infos].map(item =>
//         item.id === obj.id ? // 사망연산자 사용
//             {...item,
//             age: obj.age,
//             job: obj.job,
//             language: obj.language,
//             pay: obj.pay,
//             } : item // id에 맞는 값을 바꿔넣고, 아니라면, : 뒤의 값인 item 그대로 다시 넣어라.
//     );
//
//     state.mode = '';
// }


////////////////////// thunk Slice에 담기 //////////////////////
const employeeSlice = createSlice({
    name: "employeeSlice",
    initialState,
    reducers:{ // reducers는 key값이고, 여기에 함수를 value로서 나열해준다.
        handleMode: handleModeReducer,
        // handleRegister: handleRegisterReducer,
        // handleUpgrade: handleUpgradeReducer,
        handleSelectedId: handleSelectedIdReducer,
    },
    extraReducers:(builder) => { // 아래 내용은 promise 설정. pending은 로딩, fulfilled는 성공, rejected는 실패
        // GET 방식으로 전체 데이터 가져오기. fetchGetEmployeeInfos
        builder
            .addCase(fetchGetEmployeeInfos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGetEmployeeInfos.fulfilled, (state, action) => {
                state.loading = false;
                state.infos = action.payload;
            })
            .addCase(fetchGetEmployeeInfos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "로드 실패";
            })
        // PUT 방식으로 데이터 수정하기
        builder
            .addCase(fetchPutEmployeeInfoById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPutEmployeeInfoById.fulfilled, (state, action) => {
                state.loading = false;
                state.upInfo = action.payload;
            })
            .addCase(fetchPutEmployeeInfoById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "수정 실패";
            })

    }

});

////////////////////// export 시키기 //////////////////////
export const {
    handleMode,
    // handleRegister,
    // handleUpgrade,
    handleSelectedId,
} = employeeSlice.actions;

export default employeeSlice.reducer;