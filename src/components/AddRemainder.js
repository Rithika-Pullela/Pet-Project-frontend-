import { useFormik } from 'formik';
import { useMutation } from 'react-query'
import axios from 'axios'
import './Facultyhome.css'
import { notification } from 'antd';


async function Addtostudents(newobj) {
    return await axios.post(`http://localhost:5001/Remainders`, newobj);
}

export function AddRemainder(props) {

    const { mutate: addReminder } = useMutation(Addtostudents)
    const [api, contextHolder] = notification.useNotification();
    const placement = 'topRight'


    const openNotification = (description) => {
        
        api.info({
            message: 'Notification',
            description,
            placement,
        });
    };


    const formik1 = useFormik({
        initialValues: {
            remainder: '',

        },
        onSubmit: (values) => {
            
            if (values.remainder !== '') {
                const newobj = {
                    "description": values.remainder,
                    "courseid": props.courseid
                }

                addReminder(newobj,
                    {
                        onSuccess:() => {
                            
                             openNotification('Reminder added successfully')
                        },

                        onError:(error)=>{
                            openNotification(`Try again! ${error.message}`)
                        }
                    }
                )
               
                        values.remainder='';

            }
        }

    });

    return (
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

                    {contextHolder}
                    <button type="primary" htmltype="submit" onClick={() => { }}>
                        Add Reminder
                    </button>
                </form>
            </div>
        </>
    )

}