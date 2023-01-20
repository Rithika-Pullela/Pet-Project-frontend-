import './Studenthome.css'
import Navbar from './Navbar'
import { useCourse } from './useCourse';
import StdIdval from './StdIdval';
import { useRecoilState } from 'recoil';
import Coursebox from './Coursebox';
import { useQuery } from 'react-query';
import axios from 'axios';
import Enrolledcoursebox from './Enrolledcoursebox'

async function Qfun()
{
    return await axios.get(`http://localhost:4002/Subjects`);
}

export default function Studenthome() {
    const { data: d, isLoading } = useCourse("student");
    const idval = useRecoilState(StdIdval);

    const {data:d2,isLoading:isl2}=useQuery([idval],Qfun);
    let currentStudentData = d;
    
    console.log(localStorage.getItem('lsid'));
    const x=localStorage.getItem('lsid');
    // console.log(d);
    // console.log(idval)
    if (isLoading) {
        return <h1>Wait until it loads</h1>
    }

    else {
        // console.log("all students data", d.data)
        currentStudentData = d.data.filter((item) => item.id === x);
        // console.log("current student's data", currentStudentData)
        // console.log("current student's Courses", currentStudentData[0].Courses);
    }

    if (isl2) {
        return <h1>Subjects Loading</h1>
    }


    return (
        <>     
            <Navbar/>
            <div className='simage'></div>
            <div className='Spage'> 
                       <h1> Get Started With The Basics!!!</h1>
                       <div className='courses'> 
                            {d2?.data.map(item => <Coursebox obj={item} key={item.id}/>)}
                       </div>    
                      <h1 >Courses Enrolled</h1>
                       <div className='enrolled'>                    
                           {currentStudentData[0] && currentStudentData[0].Courses.map(item =><Enrolledcoursebox obj={item} key={item.id}/> )}
                       </div>                     
            </div> 
        </>
    )

    
}