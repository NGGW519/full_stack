'use client'
import React, {useMemo, useState} from 'react';
import EmployeeList from "@/components/EmployeeList";
import Upgrade from "@/components/Upgrade";
import Register from "@/components/Register";

export const buttonBarStyle:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
}

// API를 주고 받기 위한 데이터
export type EmployeeInfo = {
    id: number,
    name: string,
    age: number, // |는 or의 뜻으로 쓴 것
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
type Mode = "" | "register" | "upgrade" | "delete" | "reset"  // ""은 초기값을 넣기 위한 초기화용 문자열

const initialEmpInfo: EmployeeInfo
    = {id:1, name: "John", age: 35, job: "frontend", language: "react", pay: 1}

const Main = () => {
    const [infos, setInfos] = useState<EmployeeInfo[]>(initialTotal); //() 안의 것은 type을 동적할당하는 것.
    const [upInfo, setUpInfo] = useState<EmployeeInfo>(initialEmpInfo);
    const [selectedId, setSelectedId] = useState<number>(0);
    const [mode, setMode] = useState<Mode>('');
    const modes = useMemo(() => [{id:"register" as const, label:"register"}, // as const는, Mode가 type이 안정해져있기에 type을 적은것.
            {id:"upgrade" as const, label:"upgrade"},
            {id:"delete" as const, label:"delete"},
            {id:"reset" as const, label:"reset"},
        ], [])  // 의존성 배열. 이 값은 어떤 state/props에도 의존하지 않으므로
                // 처음 렌더링 때 한 번만 계산하고 이후에는 다시 계산하지 않음. useMemo로 감싸므로써 첫 화면만 뜰때 뜨고 이후로는 실행되지 않고 그대로있음.
                // 부모가 state가 바뀌면 자식도 바뀌는데, 이때 자식은 바뀔 필요가 없다고 판단된다면 useMemo로 감싸서 재렌더링되지 않도록 한다.>> 부하를 줄이고자 함
        ;
    const handleMode = (mode:Mode) => {
        setMode(mode)
    }

    const handleSelectedId = (id: number) => {
        setSelectedId(id)
        const found: EmployeeInfo | null =
            infos.filter(info => info.id === id)[0] ?? null
        setUpInfo(found);
    }

    const handleRegister = (obj: EmployeeInfo) => {
        const nextId = infos.length ? Math.max(...infos.map(i => i.id)) + 1 : 1;
        setInfos(prev => ([...prev, {...obj, id:nextId}]))
    }

    const handleUpgrade = (obj: EmployeeInfo) => {
        setInfos(prev => prev.map(item =>
            obj.id === obj.id ? // 사망연산자 사용
                {...item,
                job: obj.job,
                language: obj.language,
                pay: obj.pay,
                } : item // id에 맞는 값을 바꿔넣고, 아니라면, : 뒤의 값인 item 그대로 다시 넣어라.
        ));
        setMode('')
    }

    return ( // return에서 화면 구성에 대해 표현한다.
        <>
            <div>
                <EmployeeList
                    infos = {infos}
                    selectedId = {selectedId}
                    handleSelectedId = {handleSelectedId}
                /> {/*자식: InfoTable*/}
            </div>
            <div style={buttonBarStyle}>
                {modes.map(mode => (
                    <button key={mode.id} onClick={()=>handleMode(mode.id)}>{mode.label}</button>     // key는 각 요소를 고유하게 식별하기 위한 값.
                                                                    // React는 리스트를 렌더링할 때 이전 리스트와 비교(diff)하여 필요한 부분만 업데이트하는데,
                                                                    // key가 없으면 어떤 항목이 변경·추가·삭제되었는지 정확히 판단할 수 없음.
                                                                    // 그 결과 잘못된 요소를 재사용하거나 불필요한 렌더링이 발생할 수 있어 warning이 뜬다.
                ))}
            </div>
            <div> {/*mode 값이 무엇이냐에 따라 렌더링되는 컴포넌트를 설정. 조건문같은거임. if mode == "register" 같은것. */}
                {mode==="register" && <Register handleRegister = {handleRegister}/>}
                {mode==="upgrade" && <Upgrade
                    selectedId={selectedId}
                    upInfo = {upInfo}
                    handleUpgrade={handleUpgrade}/>}
            </div>
        </>
    );
};

export default Main;