import { Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import { QueryClientProvider, QueryClient } from 'react-query'
import React from 'react';
import Studenthome from './pages/Studenthome';
import Facutlyhome from './pages/Facultyhome'
import Syt from './pages/Syt';
import EnrolledCoursePage from './pages/EnrolledCoursePage';
import StudentProgressCheck from './pages/StudentProgressCheck';
import Fprofile from './components/Fprofile';
import Sprofile from './components/Sprofile';
import ProtectedRoutesFaculty from './pages/ProtectedRoutesFaculty';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { Breadcrumb, Layout, Menu, theme, Button, Drawer, Modal } from 'antd';
import { NavLink, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import UserDetails from './store/UserDetails';
import { useState } from 'react';
import Remainders from './pages/Remainders';
import UploadAssignment from './components/UploadAssignment';
import StudentEnrollRequestPage from './pages/StudentEnrollRequestPage';

const { Header, Content } = Layout;
const queryClient = new QueryClient();

function App() {

  const [userData, setuserData] = useRecoilState(UserDetails)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  function handleStudentLogout() {
    localStorage.removeItem('lsid')
    navigate('/', { replace: true });
    setuserData('')
  }

  function handleFacultyLogout() {
    localStorage.removeItem('lfid')
    localStorage.removeItem(localStorage.getItem('lfid'))
    navigate('/', { replace: true });
    setuserData('')
  }

  return (

    <QueryClientProvider client={queryClient}>

      <Layout className="layout">
        <Header>
          <div className="logo" />

          {userData == 'Student' &&
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key={0}>
                <NavLink to={"/shome"}><strong>Courses</strong></NavLink>
              </Menu.Item>

              <Menu.Item key={1}>
                <NavLink to={"/profile"}><strong><UserOutlined style={{ fontSize: '16px', margin: '3px', marginLeft: '950px' }} />Profile</strong></NavLink>
              </Menu.Item>
              <Menu.Item key={2}>
                <Button type="primary" onClick={showDrawer}>Reminders</Button>
                <Drawer title="Reminders" placement="right" onClose={onClose} open={open}>
                  <Remainders />
                </Drawer>
              </Menu.Item >
              <Menu.Item key={3}>
                <button className='logoutbtn' onClick={handleStudentLogout}><strong><LogoutOutlined style={{ fontSize: '18px', margin: '3px' }} /></strong></button>
              </Menu.Item>
            </Menu>
          }


          {userData == 'Faculty' &&

            <Menu theme="dark" mode="horizontal">
              <Menu.Item key={2}>
                <NavLink to={"/fhome"}><strong>Home</strong></NavLink>
              </Menu.Item>

              <Menu.Item key={0}>
                <Button type="primary" onClick={showModal} style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bolder' }}> Upload Assignment</Button>
                <Modal title="Upload Assignment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                  <UploadAssignment />
                </Modal>
              </Menu.Item>

              <Menu.Item key={1}>
                <NavLink to={"/fprofile"}><strong><UserOutlined style={{ fontSize: '16px', margin: '3px', marginLeft: '900px' }} />Profile</strong></NavLink>
              </Menu.Item>

              <Menu.Item key={3}>
                <button className='logoutbtn' onClick={handleFacultyLogout}><strong><LogoutOutlined style={{ fontSize: '18px', margin: '3px' }} /></strong></button>
              </Menu.Item>
            </Menu>

          }

        </Header>
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '30px 0',
            }}
          >

          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path='/' element={<Login />}> </Route>
              <Route path='/shome' element={<ProtectedRoutes Component={Studenthome} />}></Route>
              <Route path='/fhome' element={<ProtectedRoutesFaculty Component={Facutlyhome} />}></Route>
              <Route path='/subjects/:id' element={<Syt />}></Route>
              <Route path='/Courses/:id' element={<EnrolledCoursePage />}> </Route>
              <Route path='/availableCourses/:id' element={<StudentEnrollRequestPage />}> </Route>
              <Route path='/studentprogresscheck' element={<StudentProgressCheck />}></Route>
              <Route path='/profile' element={<ProtectedRoutes Component={Sprofile} />}></Route>
              <Route path='/fprofile' element={<ProtectedRoutesFaculty Component={Fprofile} />}></Route>

            </Routes>
          </div>
        </Content>
      </Layout>


    </QueryClientProvider >
  );
}
export default App;



