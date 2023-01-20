import { useFormik } from 'formik';
import { useMutation } from 'react-query'
import axios from 'axios'
import './Facultyhome.css'
import { useQuery } from 'react-query'


async function Addtostudents(newobj)
{
    return await axios.post(`http://localhost:5001/Remainders`,newobj);
}

async function Qfun({queryKey}){
    return await axios.get(`http://localhost:3001/faculty/${queryKey}`)
}


export function AddRemainder()
{
    let y=localStorage.getItem('lfid')
    const {mutate}=useMutation(Addtostudents)
    const {data:f,isLoading}=useQuery([y],Qfun)
    const formik1 = useFormik({
        initialValues: {
           remainder: '',
            
        },
        onSubmit: (values) => {
            if(values.remainder!='')
            {
                const newobj={
                    "description":values.remainder
                }
               
                mutate(newobj)
                values.remainder='';
           }
    }
                
    });

    return(
        <>
        <div className='remainderform'>
            <form onSubmit={formik1.handleSubmit}>
                <label htmlFor="remainder">
                <input
                    id="remainder"
                    name="remainder"
                    type="text"
                    onChange={formik1.handleChange}
                    value={formik1.values.remainder}
                 />
                 </label>  
                <button type="submit">Add Remainder</button>
            </form>
        </div>
        </>
    )

}