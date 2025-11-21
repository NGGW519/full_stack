"use client"

import React, {
    useMemo,
    useCallback,
    useState,
    createContext,
    PropsWithChildren, useContext,
} from "react";


// API를 주고 받기 위한 데이터
export type EmployeeInfo = {
    id: number,
    name: string,
    age: number | string,
    job: string,
    language: string,
    pay: number | string,
}

// Fact Table(전체 데이터, 사실 데이터)
// 아래의 내용이 스키마의 역할을 한다.
const initialTotal: EmployeeInfo[] = [ //EmployeeInfo[] << 대괄호를 붙인게, 오브젝트가 하나가 아니라 여러개다 라는 의미임.
    {id:1, name: "John", age: 35, job: "frontend", language: "react", pay: 1},
    {id:2, name: "Peter", age: 35, job: "frontend", language: "react", pay: 1},
    {id:3, name: "Sue", age: 35, job: "frontend", language: "react", pay: 1},
    {id:4, name: "Suzan", age: 35, job: "frontend", language: "react", pay: 1},
]

// 여러가지 타입을 갖게하기 위한 타입 지정
export type Mode = "" | "register" | "upgrade" | "delete" | "reset"  // ""은 초기값을 넣기 위한 초기화용 문자열

const initialEmpInfo: EmployeeInfo
    = {id:0, name: "Jo", age: 0, job: "f", language: "", pay: 0}

interface ModeItem{
    id: Mode;
    label:string;
}


interface EmployeeContextValue {
    mode: Mode;
    modes: ModeItem[];
    infos: EmployeeInfo[];
    upInfo: EmployeeInfo;
    selectedId: number | null;
    handleMode: (mode: Mode) => void;
    handleSelectedId: (id: number) => void;
    handleRegister: (obj: EmployeeInfo) => void;
    handleUpgrade: (obj: EmployeeInfo) => void;

}

export const EmployeeContext = createContext<EmployeeContextValue | undefined>(undefined); //EmployeeContext 얘가 브로드캐스팅하는 것.


export const EmployeeProvider = ({children}:PropsWithChildren) => { //PropsWithChildren >> 자식들 전체에게 props를 날리겠단 것.
    const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal); //() 안의 것은 type을 동적할당하는 것.
    const [upInfo, setUpInfo] = useState<EmployeeInfo | null>(initialEmpInfo);
    const [selectedId, setSelectedId] = useState<number | string | null>(0);
    const [mode, setMode] = useState<Mode | string>('');

    const modes = useMemo<ModeItem[]>(() => [
            {id: "register" as Mode, label: "register"},
            {id: "upgrade" as Mode, label: "upgrade"},
            {id: "delete" as Mode, label: "delete"},
            {id: "reset" as Mode, label: "reset"}], [])
        // 의존성 배열. 이 값은 어떤 state/props에도 의존하지 않으므로
                // 처음 렌더링 때 한 번만 계산하고 이후에는 다시 계산하지 않음. useMemo로 감싸므로써 첫 화면만 뜰때 뜨고 이후로는 실행되지 않고 그대로있음.
                // 부모가 state가 바뀌면 자식도 바뀌는데, 이때 자식은 바뀔 필요가 없다고 판단된다면 useMemo로 감싸서 재렌더링되지 않도록 한다.>> 부하를 줄이고자 함
    ;
    const handleMode = (mode: Mode) => {
        if (mode === "delete") {
            if (!selectedId) {
                alert("직원을 선택하세요.")
                return;
            }
            const targetObj = infos.find(x => x.id === selectedId);
            if (!targetObj) {
                alert("해당 직원을 찾을 수 없습니다.")
                return;
            }
            if (confirm(`${targetObj.name} 직원을 삭제하시겠습니까?`)) {
                setInfos(prev => prev.filter(item => item.id !== selectedId));
                setMode("");
                setUpInfo(null);
                setSelectedId("");
            }
            return;
        }
        if (mode === "reset") {
            if (confirm("목록을 초기 데이터로 되돌릴까요?")) {
                setInfos(initialTotal);
                setMode("");
                setUpInfo(null);
                setSelectedId("");
            }
            return;
        }
        if (mode === "upgrade"){
            if(!selectedId){
                alert("수정할 직원을 선택해주세요.")
                return;
            }
        }

        setMode(mode)
    }

    const handleSelectedId = (id: number) => {
        setSelectedId(id)
        const found: EmployeeInfo | null =
            infos.filter(info => info.id === id)[0] ?? null;
        setUpInfo(found);
    }

    const handleRegister = (obj: EmployeeInfo) => {
        if (!obj.name) {
            alert("이름은 필수입니다.")
            return;
        }
        if (!obj.age || Number(obj.age) < 0) {
            alert("나이는 필수입니다.")
            return;
        }
        if (!obj.pay || Number(obj.pay) < 0) {
            alert("급여는 필수입니다.")
            return;
        }
        if (infos.some(item => item.name === obj.name)) {
            alert("이미 존재하는 이름입니다.")
            return;
        }
        const nextId = infos.length ? Math.max(...infos.map((i) => i.id)) + 1 : 1;
        setInfos(prev => ([...prev, {...obj, id: nextId}]))
    }

    const handleUpgrade = (obj: EmployeeInfo) => {
        if (Number(obj.age) < 0) {
            alert("0 이상의 숫자를 입력하세요.")
            return;
        }
        if (Number(obj.pay) < 0) {
            alert("0 이상의 숫자를 입력하세요.")
            return;
        }
        setInfos(prev => prev.map(item =>
            item.id === obj.id ? // 사망연산자 사용
                {...item,
                    age: obj.age,
                    job: obj.job,
                    language: obj.language,
                    pay: obj.pay,
                } : item // id에 맞는 값을 바꿔넣고, 아니라면, : 뒤의 값인 item 그대로 다시 넣어라.
        ));
        setMode('')
    }
    const value = useMemo(() => (
        {mode, infos, modes, upInfo, selectedId, handleMode, handleRegister, handleUpgrade, handleSelectedId}
        ), [mode, infos, modes, upInfo, selectedId, handleMode, handleRegister, handleUpgrade, handleSelectedId])

    return(
        <EmployeeContext.Provider value={value}>
            {children}
        </EmployeeContext.Provider>
    )
}

// 사용자 hook: 맨 앞에 use 사용
export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if(!context){
        throw new Error("useContext() not found")
    }
    return context;
}