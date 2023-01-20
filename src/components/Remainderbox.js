import './Studenthome.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import { useMutation } from 'react-query'

async function Removeremainder(value)
{
    console.log("valll",value)
    return await axios.delete(`http://localhost:5001/Remainders/${value}`)
}


export default function Remainderbox(props){
    console.log("proppss",props.obj)
    const {mutate}=useMutation(Removeremainder)

    function handleClick()
    {
        mutate(props.obj.id)
    }

        return(
            <>
               <div className='remainderbox'> 
                    <p>{props.obj.description}</p>
                    <button onClick={handleClick}>Clear</button>
               </div>
            
            </>
        )


}