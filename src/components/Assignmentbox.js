import './Facultyhome.css'
import { useState } from 'react';
import axios from 'axios'
import { useMutation } from 'react-query'
import { Card } from 'antd';
import { AddRemainder } from '../components/AddRemainder';
import { useCallback } from 'react';
import { notification} from 'antd';

async function EditStudentProgress(newvalues) {
    return await axios.put(`http://localhost:3009/assignments/${newvalues.id}`, newvalues)
}

export default function Assignmentbox(props) {
  
    const [color, setcolor] = useState(false)
    const { mutate:editingStudentProgress,isSuccess,error} = useMutation(EditStudentProgress)
    const [api, contextHolder] = notification.useNotification();
    const placement='topRight'

    const openNotification=(description)=>{
        api.info({
            message: 'Notification',
            description,
            placement,
          });

    }

    const handleMarkAsDone= useCallback(()=>{
        if (props.assignmentinfo.progress === 'Submit To Verify' || props.assignmentinfo.progress === 'Mark As Done') {
            setcolor(!color)
            btn3 = 'rgb(223, 230, 230)';
            const newobj = {
                "id": props.assignmentinfo.id,
                "name": props.assignmentinfo.name,
                "deadline": props.assignmentinfo.deadline,
                "CourseId": props.assignmentinfo.CourseId,
                "progress": "Mark As Done"
            }
            editingStudentProgress(newobj,
                {
                    onSuccess:() => {
                            
                        openNotification('Marked As Done Successfully')
                   },

                   onError:(error)=>{
                       openNotification(`Try again! ${error.message}`)
                   }
                })
           
            

        }
    },[props.assignmentinfo.id])

    let x = props.assignmentinfo.progress;

    let btn1 = 'rgb(223, 230, 230)';
    let btn2 = 'rgb(223, 230, 230)';
    let btn3 = 'rgb(223, 230, 230)';
    let btn4 = 'rgb(223, 230, 230)';
    if (color === true) {
        btn4 = 'rgb(140, 177, 140)';
    }
    if (x === 'Untouched') {
        btn1 = 'red';
    }
    else if (x === 'Work in progress') {
        btn2 = 'orange';
    }
    else if (x === 'Submit To Verify') {
        btn3 = 'yellow';
    }

    if(x!=='Submit To Verify' && x!=='Work in progress'&& x!=='Untouched')
    {
        btn4='rgb(140, 177, 140)';
    }

    const styles = {
        "b1": {
            'background-color': btn1,
        },

        "b2": {
            'background-color': btn2,
        },
        "b3": {
            'background-color': btn3,
        },
        "assignbox": {
            'background-color': btn4,
        }
    }



    return (
        <>

            <div className="site-card-border-less-wrapper">
                <Card
                    title={props.assignmentinfo.name}
                    bordered={false}
                    style={{
                        width: 1410,
                        margin: '0 auto'
                        
                    }}
                >
                    <div className='assignbox' style={styles.assignbox}>
                        <AddRemainder courseid={ props.assignmentinfo.CourseId}/>
                        <div className='status'>
                            Student's Progress:
                            <button style={styles.b1}>Untouched</button>
                            <button style={styles.b2}>Work In Progress</button>
                            <button style={styles.b3}>Submitted</button>
                        </div>
                        <div className='dead'>
                            Deadline: {props.assignmentinfo.deadline}
                        </div>
                        {contextHolder}
                        <button onClick={handleMarkAsDone}>Mark As Done</button>
                    </div>
                </Card>
            </div>
        </>
    )
}