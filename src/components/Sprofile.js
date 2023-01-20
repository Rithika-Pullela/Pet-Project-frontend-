import StdIdval from './StdIdval';
import { useRecoilState } from 'recoil';
import './Studenthome.css'
import Sprofiledisplay from './Sprofiledisplay';
import { UserOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useQuery,useMutation } from 'react-query'
import axios from 'axios'

const useQfun = async ({ queryKey }) => {
    const { data } = await axios.get(`http://localhost:3001/student/${queryKey[0]}`);
    console.log("current std dataaa ",data)
    return data
}


async function EditStudentDetails(values)
{
    return await axios.put(`http://localhost:3001/student/${values.id}`,values)
}

export default function Sprofile() {
    const x = localStorage.getItem('lsid');
    const { data, isLoading ,isSuccess} = useQuery([x], useQfun);
    const {mutate}=useMutation(EditStudentDetails)
    const formik = useFormik({
        
        initialValues: {
            username: '',
            password: '',
            cpassword: '',
        },
        onSubmit: values => {
            if(values.password==values.cpassword)
            {
                {console.log("update successful")}
                const newobj={
                "id": data.id,
                "name": values.username,
                "password": values.password
               }
               mutate(newobj)
              
            }
        },
    });
    const [id, setid] = useRecoilState(StdIdval);
   

   
    const [value, setvalue] = useRecoilState(Sprofiledisplay);
    
    if (isLoading) {
        return <p>Current student details loading,waittttt!</p>
    }

    if(isSuccess) {
        console.log("current std data", data)
    }



    return (
        <>
            <div className="Sprofile">
                <div className='spcontent'>
                    <div className='details'>
                        <UserOutlined style={{ fontSize: '40px', color: '#08c', margin: "10px" }} />
                    </div>

                    <div className='profileform'>
                        <form onSubmit={formik.handleSubmit}>

                            <label htmlFor="username">
                                New username :</label><br></br>
                             <input
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                            <br></br>

                            <label htmlFor="password"> New password:</label><br></br>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            /><br></br>

                            <label htmlFor="password">  Confirm New password:</label><br></br>
                            <input
                                id="cpassword"
                                name="cpassword"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.cpassword}
                            /><br></br>
                            <button type="submit">Submit</button>

                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}