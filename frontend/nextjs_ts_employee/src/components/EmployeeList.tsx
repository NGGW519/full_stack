import React from 'react';
import {EmployeeInfo} from "@/components/Main";
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from "./Main";

interface EmployeeInfoProps {
    selectedId: number;
    infos: EmployeeInfo[]; // 오브젝트 구조를 리스트로 만들기위한 선언
    handleSelectedId: (id: number) => void;
}

const EmployeeList = ({selectedId, infos, handleSelectedId}: EmployeeInfoProps) => {
    return (
        <>
            <div style={buttonBarStyle}>
                {infos?.map(info => (
                    <button
                        key={info.id}
                        onClick={() => handleSelectedId(info.id)}
                    >
                        {info.name}
                    </button>)
                )}
            </div>
            <InfoTable
                selectedId = {selectedId}
                infos = {infos}
            />
        </>
    );
};

export default EmployeeList;