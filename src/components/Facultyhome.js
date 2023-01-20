import './Facultyhome.css'
import { useCourse } from './useCourse';
import FacIdval from './FacIdval';
import { useRecoilState } from 'recoil';
import Navbar2 from './Navbar2';
import { UserProvider } from './userContextf';
import {  useFetch } from './useFetch';
import { AllFacCourses } from './AllFacCourses';
import { useQuery } from 'react-query'
import axios from 'axios'
import Studentbox from './Studentbox'
import { AddRemainder } from './AddRemainder';

async function Qfun()
{
    return await axios.get(`http://localhost:3001/student`);
}

export default function Facutlyhome() {
    const idval = useRecoilState(FacIdval);
    const { data: d, isLoading } = useFetch("faculty");
    const {data:s,isLoading:l}=useQuery([idval],Qfun)

    let currentFacultyData = d;
   
    const y=localStorage.getItem('lfid');
    if (isLoading) {
        return <h2>Wait pls!!!!</h2>
    }
    else {        
       currentFacultyData = d.data.filter((item) => item.id === y);
       console.log("current fac data ", currentFacultyData);
    }

    
    if(l)
    {
        return <h1>Wait!!</h1>
    }
    else{
        console.log("data is student",s.data)

    }

    return (
        <>
            <Navbar2 />
            <div className='fimage'>
                <img src='https://i0.wp.com/anamikamishra.com/wp-content/uploads/2021/09/quote-teacher.jpg?fit=800%2C543&ssl=1'></img>
            </div>
            <div className='Fpage'>         
                    { currentFacultyData[0] && currentFacultyData[0].CourseId.map((item)=>                   
                        <div className='facCourses'> <AllFacCourses obj={item}/></div>                    
                     )}
                     <div >
                            <h1>Student's List</h1>
                            { s.data && s.data.map((item)=>                   
                                <div className='studentslist'> <Studentbox obj={item}/></div>                    
                            )}
                     </div>

                     <AddRemainder/>

            </div> 
                        
            
                        
               
            
        </>

    )
}


