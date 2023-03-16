import './Facultyhome.css'
import { useMutation } from 'react-query'
import axios from 'axios'
import { Button, Form, Input, DatePicker } from 'antd';
import { useQuery } from 'react-query'
import { notification } from 'antd';
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


async function AddAssignments(newobj) {
  return await axios.post(`http://localhost:3001/assignments`, newobj);
}
async function Qfun2({ queryKey }) {
  return await axios.get(`http://localhost:3001/faculty/${queryKey}`);
}


const UploadAssignment = () => {

  const currentFacultyId = localStorage.getItem('lfid');
  const { data: currentFacultyData, isLoading: loadingCurrentFacultyData } = useQuery([currentFacultyId], Qfun2);
  const { mutate: addingToAssignments} = useMutation(AddAssignments)
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
 

  const openNotification = (description) => {
        
    api.info({
        message: 'Notification',
        description,
        placement:'topRight',
    });
};

  if (loadingCurrentFacultyData) {
    return <h1><Spin indicator={antIcon} />Faculty Data Loading</h1>
  }


  const onFinish = (values) =>{
    const newobj = {
      "deadline": `${values.deadline.$D}/${values.deadline.$M + 1}/${values.deadline.$y}`,
      "name": values.name,
      "CourseId": currentFacultyData.data.CourseId,
      "progress": "Untouched"
    }

    addingToAssignments(newobj,
      {
        onSuccess:() => {
            
             openNotification('Assignment uploaded successfully')
        },
        onError:(error)=>{
          openNotification(`Try again! ${error.message}`)
      }
    });  
    onReset();

  };

  const onReset = () => {
    form.resetFields();
  };


  return (
    <div className='uploadassignmentpage'>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="name" label="Assignment Name"
          className='assignmentname'
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="deadline" label="Deadline" rules={[
          {
            required: true,
          },
        ]} >
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout}>

          {contextHolder}
          <Button type="primary" htmlType="submit" >
            Upload Assignment
          </Button>

          <Button htmlType="button" className='resetbtn' onClick={onReset}>
            Reset
          </Button>

        </Form.Item>
      </Form>
    </div>
  );
};
export default UploadAssignment;
