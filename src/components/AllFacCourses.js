import { useQuery } from 'react-query'
import axios from 'axios'
import './Facultyhome.css'
import { Link } from 'react-router-dom'

const Qfun = async ({queryKey}) => {
    return await axios.get(`http://localhost:3001/Courses/${queryKey[0]}`);
}
export function AllFacCourses(props){
    const {data:d,isLoading}=useQuery([props.obj],Qfun)

    if(isLoading)
    {
        return <h1>FacCourses Loading,Wait Plss!!</h1>
    }
    else{
        // console.log(d)
    }
    return(
        <>          
            <Link to={`/Courses/${d.data.id}`} style={{ textDecoration: 'none'}}>
                 <div className='fcomp' >
                      <img src={d.data.image} alt="no img to display"></img>
                     <h4><strong>{d.data.name}</strong></h4>
                </div>
            </Link>
            
        </>
    )
    
}