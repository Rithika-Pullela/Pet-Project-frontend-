import { useQuery } from 'react-query';
import axios from 'axios';
import  Remainderbox from './Remainderbox'

async function Qfun()
{
    return await axios.get('http://localhost:5001/Remainders')
}

export default function Remainders()
{

    const {data,isLoading}=useQuery([localStorage.getItem('lsid')],Qfun)
    if(isLoading)
    {
        return <h1>Loading Remainders waitt!!!</h1>
    }
    else{
        console.log("jksanhd",data)
    }

    return(
        <>
            <div className='remainder'>
                    { data.data && data.data.map((item)=>                   
                        <Remainderbox obj={item} key={item.id}/>                    
                    )
                    }

                  
             </div>
        </>
    )
}