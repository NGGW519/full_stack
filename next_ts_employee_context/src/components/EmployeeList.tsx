'use client';
import React from 'react';
import {useEmployee} from "@/context/EmployeeContext";
import InfoTable from "@/components/InfoTable";
import {buttonBarStyle} from './Main';


const EmployeeList = () => {
    const {infos, selectedId, handleSelectedId} = useEmployee();
    return (
        <>
            <div style={buttonBarStyle}>
                {infos?.map(info => (
                        <button
                            key={info.id}
                            onClick={() => handleSelectedId(info.id)}
                        >
                            {info.name}
                        </button>
                    )
                )
                }
            </div>
            <InfoTable
                selectedId = {selectedId}
                infos = {infos}
            />

        </>

    );
};

export default EmployeeList;