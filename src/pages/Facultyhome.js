import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import '../components/Facultyhome.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import UploadAssignment from '../components/UploadAssignment';
import { Link } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Table} from 'antd';
const { Header, Content } = Layout;
const { Column } = Table;
const data = [
    {
        key: '1',
        id: "1292",
        name: "Rithika",

    },
    {
        key: '2',
        id: "1286",
        name: "sravya",

    },
    {
        key: '3',
        id: "1294",
        name: "Akshara",

    },
    {
        key: '4',
        id: "1296",
        name: "Ravi",

    },
    {
        key: '5',
        id: "1298",
        name: "Sameer",

    },
];


const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);


async function Qfun2({ queryKey }) {
    return await axios.get(`http://localhost:3001/faculty/${queryKey}`);
}

const Facutlyhome = () => {

    const currentFacultyId = localStorage.getItem('lfid');
    const navigate = useNavigate();
    const { data: currentFacultyData, isLoading:loadingCurrentFacultyData } = useQuery([currentFacultyId], Qfun2);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { token: { colorBgContainer },} = theme.useToken();

    localStorage.setItem(currentFacultyId, currentFacultyData?.data.CourseId)
    
    if (loadingCurrentFacultyData) {
        return <h2>
            <Spin indicator={antIcon} />Wait pls!!!!</h2>
    }

    function handleLogout() {
        localStorage.removeItem('lfid')
        navigate('/', { replace: true });
        localStorage.removeItem('flogin')
    }


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
            <div className='Fpid1'>
                <Link to={"/studentprogresscheck"} style={{ textDecoration: 'none' }}>
                    <Table dataSource={data}>
                        <Column title="Name" dataIndex="name" key="name" />
                        <Column title="ID" dataIndex="id" key="id" />
                    </Table>
                </Link>

            </div>
    );
};
export default Facutlyhome;



