'use client'
import React from 'react';
import EmployeeList from "@/components/EmployeeList";
import Upgrade from "@/components/Upgrade";
import Register from "@/components/Register";
import {useDispatch, useSelector} from "react-redux";
import {RootState, RootDispatch} from "@/redux/store";
import {handleMode} from "@/redux/employeeSlice";

export const buttonBarStyle:React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    padding: "20px",
}

const Main = () => {
    const {mode, modes} = useSelector((state: RootState) => state.emp);
    const dispatch = useDispatch<RootDispatch>();


    return ( // return에서 화면 구성에 대해 표현한다.
        <>
            <div>
                <EmployeeList/> {/*자식: InfoTable*/}
            </div>
            <div style={buttonBarStyle}>
                {modes.map(item => (
                    <button key={item.id} onClick={()=>dispatch(handleMode(item.id))}>
                        {item.label}
                    </button>
                    // key는 각 요소를 고유하게 식별하기 위한 값.
                    // React는 리스트를 렌더링할 때 이전 리스트와 비교(diff)하여 필요한 부분만 업데이트하는데,
                    // key가 없으면 어떤 항목이 변경·추가·삭제되었는지 정확히 판단할 수 없음.
                    // 그 결과 잘못된 요소를 재사용하거나 불필요한 렌더링이 발생할 수 있어 warning이 뜬다.
                ))}
            </div>
            <div>
                {/*mode 값이 무엇이냐에 따라 렌더링되는 컴포넌트를 설정. 조건문같은거임. if mode == "register" 같은것.*/}
                {mode==="register" && <Register/>}
                {mode==="upgrade" && <Upgrade/>}
            </div>
        </>
    );
};

export default Main;