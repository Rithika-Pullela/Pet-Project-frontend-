import FacIdval from './FacIdval';
import { useRecoilState } from 'recoil';
import './Facultyhome.css'
import Fprofiledisplay from './Fprofiledisplay';
import { UserOutlined } from '@ant-design/icons';
import { useFormik } from 'formik';
import { useQuery } from 'react-query'
import axios from 'axios'
import { useMutation } from 'react-query'
import { EditFaculty } from './useMutationf';

const useQfun2 = async ({ queryKey }) => {
    // console.log(queryKey)
    const { data } = await axios.get(`http://localhost:3001/faculty/${queryKey[0]}`);
    // console.log(data);
    return data
}

export default function Fprofile() {
    const y = localStorage.getItem('lfid');
    const { data, isLoading } = useQuery([y], useQfun2);
    const { mutate } = useMutation((values) => EditFaculty(values))
    
    const formik = useFormik({
        initialValues: {
            username: '',
            newpassword: '',
            cpassword: '',
        },
        onSubmit: (values) => {
            console.log("profile form submission:", values.username);
            console.log("profile form submission:", values.newpassword);
            console.log("profile form submission:", values.cpassword);
            if (values.newpassword == values.cpassword) {
                { console.log("update successful") }

                const newobj = {
                    "id": data.id,
                    "name": values.username,
                    "password": values.newpassword,

                }
                console.log("newvalues", newobj)
                mutate(newobj)
            }
        },
    });
    const [id, setid] = useRecoilState(FacIdval);
    console.log("the id:", localStorage.getItem('lfid'));


    const [value, setvalue] = useRecoilState(Fprofiledisplay);


    if (isLoading) {
        return <h1>Current faculty details loading,waittttt!</h1>
    }

    else {
        console.log("current fac data", data)
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

                            <label htmlFor="newpassword"> New password:</label><br></br>
                            <input
                                id="newpassword"
                                name="newpassword"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.newpassword}
                            /><br></br>

                            <label htmlFor="cpassword">  Confirm New password:</label><br></br>
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