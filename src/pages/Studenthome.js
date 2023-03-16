import Coursebox from '../components/Coursebox';
import AllCoursesbox from '../components/AllCoursesbox';
import { useQuery } from 'react-query';
import axios from 'axios';
import Enrolledcoursebox from '../components/Enrolledcoursebox'
import '../components/Studenthome.css'
import { useCourse } from '../fetching/useCourse';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import { useGetAllCourses } from '../fetching/useGetAllCourses';

const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

async function Qfun() {
    return await axios.get(`http://localhost:4002/Subjects`);
}

const Studenthome = () => {

    const currentStudentId = localStorage.getItem('lsid');
    const { data: currentStudentData, isLoading: loadingUserCoursesData } = useCourse(currentStudentId);
    const { data: basicSubjectsData, isLoading: loadingBasicSubjectsData } = useQuery('subjectsapi', Qfun);
    const { data: allCoursesData, isLoading: loadingAllCoursesData } = useGetAllCourses();
    if (loadingAllCoursesData) {
        return <h1><Spin indicator={antIcon} />Wait until it loads</h1>
    }

    console.log(allCoursesData.data)

    if (loadingUserCoursesData) {
        return <h1><Spin indicator={antIcon} />Wait until it loads</h1>
    }

    if (loadingBasicSubjectsData) {
        return <h1><Spin indicator={antIcon} />Subjects Loading</h1>
    }


    return (
        <div>
            <div className='Spage'>
            <h1>Available Courses</h1>

                <div className='courses'>   
                     {allCoursesData && allCoursesData.data.Courses.map(item => <AllCoursesbox coursedata={item} key={item.ID}/>)}
                </div>
                
               
                <h1> Get Started With The Basics!!!</h1>
                <div className='courses'>
                    {basicSubjectsData.data.map(item => <Coursebox courseinfo={item} key={item.id} />)}
                </div>

                <h1 >Courses Enrolled</h1>
                <div className='enrolled' id='ce'>
                    {currentStudentData && currentStudentData.data.Courses.map(item => <Enrolledcoursebox enrolledcourseinfo={item} key={item.id} />)}
                </div>

            </div>

        </div>
    );
};
export default Studenthome;