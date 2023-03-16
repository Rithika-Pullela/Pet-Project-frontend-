import './Login.css'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import { Button, Space } from 'antd';

export default function Login() {
    const [togglerForStudentFacutlyLogin, settogglerForStudentFacutlyLogin] = useState(false);

    function studentclick() {
        settogglerForStudentFacutlyLogin(false)
    }
    function facultyclick() {
        settogglerForStudentFacutlyLogin(true)
    }

    return (
        <>
            <div>
                <div className='loginpage'>
                    <div className='loginpart1'></div>
                    <div className='loginpart2'>
                        <div className='xyz'>
                            <h1>Login</h1>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '36%',
                                    margin: '3%',
                                }}
                            >
                                <Button type="primary" block onClick={studentclick} style={{ background: "white", color: "black", fontSize: "bold" }}>Student</Button>
                                <Button type="primary" block onClick={facultyclick} style={{ background: "white", color: "black", fontSize: "bold" }}>Faculty</Button>
                            </Space>
                        </div>
                        <div className='center'>
                            {togglerForStudentFacutlyLogin && <LoginForm user={"Faculty"} />}
                            {!togglerForStudentFacutlyLogin && <LoginForm user={"Student"} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
