
import { useParams } from 'react-router-dom';
import { useSubjects } from './useSubjects';
import './Studenthome.css'

export default function Syt()
{
    let id = useParams().id;
    console.log("id is: ",id)
    const { data,isLoading} =useSubjects(id);
    if(isLoading)
    {
        return <h3>Loading Subject Details </h3>
    }
    else{
        console.log("data is : ",data)
    }

    
    return(
        <>
            <div className='subjectpage'>
                <h1>{data.data.name}</h1>
                

                   <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P'target="_blank"  >Pointers</a></div>

                    <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Data Structures</a></div>

                    <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">C++ STL</a></div>

                    <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Graphs</a></div>
                
            </div>
        
        </>
    )
}