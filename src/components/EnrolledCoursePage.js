import './Studenthome.css'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import axios from 'axios';

async function Qfun({queryKey})
{
    return await axios.get(`http://localhost:3001/Courses/${queryKey}`)
}

export default function EnrolledCoursePage()
{
    let id = useParams().id;
    const {data,isLoading}=useQuery([id],Qfun)
    if(isLoading)
    {
        return <h1>Wait!!!!!!!!!!</h1>
    }
    else{
        console.log("ddaaaaaaaaaattttaaa ",data)
    }

    return(
        <>
            <div className="enrolledcoursepage">
                 <h1>{data.data.name}</h1>
                 <img src={data.data.image}></img>
                 <div className='subjectpage'>

                   <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P'target="_blank"  >Pointers</a></div>

                    <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Data Structures</a></div>

                    <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">C++ STL</a></div>

                    <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Graphs</a></div>
                
            </div>
            </div>
        
        </>
    )
}