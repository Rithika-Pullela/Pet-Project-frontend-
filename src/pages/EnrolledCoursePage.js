import '../components/Studenthome.css'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import axios from 'axios';
import Assignmentboxantd from '../components/Assignmentboxantd';
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

async function Qfun({ queryKey }) {
    return await axios.get(`http://localhost:3001/Courses/${queryKey[1]}?_embed=assignments`)
}

export default function EnrolledCoursePage() {
    let id = useParams().id;
    const { data:CourseRelatedAssignmentData, isLoading } = useQuery(['courseAssignemts',id], Qfun)
    if (isLoading) {
        return <h1>
            <Spin indicator={antIcon} />Wait!!!!!!!!!!</h1>
    }

    return (
        <>
            <div className="enrolledcoursepage">
                <h1>{CourseRelatedAssignmentData.data.name}</h1>
                <div className='assignmentsection' >
                    { CourseRelatedAssignmentData?.data.assignments.length==0 && <h3>No Assignments!</h3>}
                {CourseRelatedAssignmentData?.data.assignments.map(item => <Assignmentboxantd assignment={item} key={item.id} />)}
                </div>
               
            </div>

        </>
    )
}