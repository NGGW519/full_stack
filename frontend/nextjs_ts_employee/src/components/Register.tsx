import React, {useState} from 'react';
import type {EmployeeInfo} from "@/components/Main";


export const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

export const labelStyle: React.CSSProperties = {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    color: '#333',
};

export const inputStyle: React.CSSProperties = {
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '14px',
};

const initialEmpInfo: EmployeeInfo
    = {id:0, name: "", age: 0, job: "", language: "", pay: 0}

interface RegisterProps {
    handleRegister: (obj: EmployeeInfo) => void;
}

const Register = ({handleRegister}:RegisterProps) => {
    const [info, setInfo] = useState<EmployeeInfo>(initialEmpInfo);

    const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        // console.log(name, value)
        setInfo(prev => ({...prev, [name]: value})); // id는 그대로 유지
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 이거로 안막어주면 에러난다.
        handleRegister(info);
    }
    return (
        <form style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>
                Name:
                <input
                    type="text"
                    name="name"
                    onChange={handlechange}
                    style={inputStyle}
                    required/>
            </label>
            <label style={labelStyle}>
                Age:
                <input
                    type="number"
                    name="age"
                    min={1}
                    onChange={handlechange}
                    style={inputStyle}
                    required/>
            </label>
            <label style={labelStyle}>
                Job:
                <input
                    type="text"
                    name="job"
                    onChange={handlechange}
                    style={inputStyle}/>
            </label>
            <label style={labelStyle}>
                Language:
                <input
                    type="text"
                    name="language"
                    onChange={handlechange}
                    style={inputStyle}/>
            </label>
            <label style={labelStyle}>
                Pay:
                <input type="number"
                       name="pay" min={0}
                       onChange={handlechange}
                       style={inputStyle}
                       required/>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default Register;