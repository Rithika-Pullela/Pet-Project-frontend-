import { useQuery } from 'react-query'
import axios from 'axios'
import Assignmentbox from '../components/Assignmentbox';
import '../components/Facultyhome.css'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);


async function Queryfun({queryKey}) {
    return await axios.get(`http://localhost:3001/Courses/${queryKey[1]}?_embed=assignments`);
}

async function Qfun({queryKey}){
    return await axios.get(`http://localhost:3001/Courses/${queryKey[1]}`)
}

export default function StudentProgressCheck() {
   const facid=localStorage.getItem('lfid')
   const CourseId=localStorage.getItem(facid)
  const { data:courseAssignmentsInfo, isLoading:loadingCourseAssignmentsInfo } = useQuery(['assignmentInfo',CourseId], Queryfun)
    const{data:courseinfo,isLoading:loadingCourseDetails}=useQuery(['facultyTeachingCourseDetails',CourseId],Qfun)
    if (loadingCourseAssignmentsInfo) {
        return <h1><Spin indicator={antIcon} />Loading Assignments...</h1>
    }
    if(loadingCourseDetails)
    {
        return <h1><Spin indicator={antIcon} />Loading Course Details...</h1>
    }


    return (
        <>
       
            <div className="studentprogresscheckpage">
                <div className='courseinfo'>
                    <h1> {courseinfo && courseinfo.data.name} Assignments</h1>
                </div>
                {courseAssignmentsInfo?.data.assignments.map(item => <Assignmentbox assignmentinfo={item} key={item.id} />)}
            </div>
            
        </>
    )


}