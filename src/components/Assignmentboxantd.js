import React from 'react'
import './Studenthome.css'
import { Card } from 'antd';
import { Select, Space } from 'antd';
import { useMutation } from 'react-query'
import axios from 'axios'

async function EditStudentProgress(newvalues) {
    return await axios.put(`http://localhost:3001/assignments/${newvalues.id}`, newvalues)
}

function Assignmentboxantd(props) {
    const { mutate:editingStudentProgress} = useMutation(EditStudentProgress)
    const provinceData = ['Untouched', 'Work in progress', 'Submit To Verify'];

    const handleProvinceChange = (value) => {

        const newobj = {
            "id": props.assignment.id,
            "name": props.assignment.name,
            "deadline": props.assignment.deadline,
            "progress": value,
            "CourseId": props.assignment.CourseId,
        }
        editingStudentProgress(newobj)

    };


    return (

        
            <div className="site-card-border-less-wrapper">
                <Card
                    title={props.assignment.name}
                    bordered={false}
                    style={{
                        width: 330,
                    }}
                >

                    <strong>Status:</strong>
                    <Space wrap>
                        <Select
                            defaultValue={props.assignment.progress}
                            style={{
                                width: 150,
                                marginLeft:10
                            }}
                            onChange={handleProvinceChange}
                            options={provinceData.map((province) => ({
                                label: province,
                                value: province,
                            }))}
                        />

                    </Space>
                    <div className='deadantd'>
                        Deadline: <span>{props.assignment.deadline}</span>
                    </div>
                </Card>
            </div>
           
    )
}

export default Assignmentboxantd


