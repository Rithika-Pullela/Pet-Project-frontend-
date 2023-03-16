import './Studenthome.css'
import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { Divider } from 'antd';
import { Link } from 'react-router-dom'
import React, { useEffect } from 'react'
import { notification } from 'antd';


async function Removeremainder(value) {
    return await axios.delete(`http://localhost:5001/Remainders/${value}`)
}

export default function Remainderbox(props) {
    const { mutate: clearReminder } = useMutation(Removeremainder)
    const queryClient = useQueryClient()
    const [api, contextHolder] = notification.useNotification();
    const placement = 'topLeft'
    

    const openNotification = (description) => {

        api.info({
            message: 'Notification',
            description,
            placement,
        });

    }


   const f =  async()=>{
    await queryClient.refetchQueries(props.querykey);
    }
    


    function handleClick() {
        // openNotification('Reminder cleared')
        clearReminder(props.remainderdata.id,
            {
                onSuccess: () => {
                    f();
                    openNotification('Reminder cleared')
                },
            }
        )
        

    }

    return (
        <>

            <div className='remainderbox'>
                <Link to={`/Courses/${props.remainderdata.courseid}`} style={{ textDecoration: 'none', color: 'black' }}>
                    <p>{props.remainderdata.description}</p>
                </Link>
                {contextHolder}
                <button onClick={handleClick}>Clear</button>

            </div>
            <Divider />

        </>
    )

}