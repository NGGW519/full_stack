'use client'
import React, {useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {EmployeeInfo} from "@/redux/slice/employeeSlice";

const tableStyle: React.CSSProperties = {
    width: "800px",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    tableLayout: "fixed",
};

const thStyle: React.CSSProperties = {
    backgroundColor: "#f2f2f2",
    color: "#333",
    padding: "12px 15px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "0.9em",
};

const tdStyle: React.CSSProperties = {
    padding: "12px 15px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
    color: "#555",
};


const InfoTable = () => {
    const {infos, selectedId} = useSelector((state: RootState) => state.emp);

    const infoObject: EmployeeInfo | undefined = useMemo(()=>  // info 뒤에 Object라고 명시함. 이후 useMemo로 감싼다.
        infos.find(info => info.id === selectedId),[selectedId, infos]);

    // 위에서 infoObject가 undefined도 가능하다고 했으므로, 구체적으로 어떤 type이 될건지 조건문을 걸어줘야한다.
    // undefined인 경우는 어떻게 할지를 정해줘야 밑에서 infoObject부분에서 에러가 안뜬다.
    if (!infoObject) return <div>선택된 정보가 없습니다.</div>

    // const info = infos.filter(info => info.id === selectedId)[0];  >>> 윗줄과 같은 코드

    return (
        <table style={tableStyle}>
            <thead>
                <tr>
                    {Object.keys(infoObject)
                        .filter(entry => entry !=="id")
                        .map(key => <th key={key} style={thStyle}>{key}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.values(infoObject)
                        .filter((_, idx) => idx !== 0)
                        .map((value) => (<td key={value} style={tdStyle}>{value}</td>))
                    }
                </tr>
            </tbody>
        </table>
    );
};

export default InfoTable;