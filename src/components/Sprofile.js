import './Studenthome.css'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'
import { Button, Form, Input } from 'antd';
import Sprofiledisplay from '../store/Sprofiledisplay';
import { useRecoilState } from 'recoil';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import {Space } from 'antd';

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


const useQfun = async ({ queryKey }) => {
  return await axios.get(`http://localhost:3001/student/${queryKey[1]}`);
}


async function EditStudentDetails(values) {
  return await axios.put(`http://localhost:3001/student/${values.id}`, values)
}

export default function Sprofile() {

  const currentStudentId = localStorage.getItem('lsid');
  const { data, isLoading, isSuccess } = useQuery(['studentDetailsForProfilePage',currentStudentId], useQfun);
  const { mutate:ChangeStudent } = useMutation(EditStudentDetails)
  const [form] = Form.useForm();
  const [profile, setprofile] = useRecoilState(Sprofiledisplay);
  

  const onFinish = (values) => {
      const newobj = {
      "id": data.data.id,
      "password": values.newpassword,

    }
    ChangeStudent(newobj);
    setprofile(!profile)

  };
  const onReset = () => {
    form.resetFields();
  };

  if (isLoading) {
    return <p> <Spin indicator={antIcon} />
      Current student details loading,waittttt!</p>
  }


  function handle()
  {
    setprofile(!profile)
  }


  return (
    <>
    
      <div className="sprofile">
        <div className='userdetails'>
          
          <UserOutlined style={{ fontSize: '100px', color: ' #1677ff', border: '9px  solid #1677ff',borderRadius:'0.39em',marginTop:'30px' }} />
             <p><strong>ID : </strong>{data.data.id}</p>
          
        </div>

        <Space
          direction="vertical" 
          style={{
            width: '40%',
            marginTop:'5%',
  
          }}
        >
           <Button type="primary" block onClick={handle}>Edit Details</Button>
    
      </Space>


        {profile && 
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} className='profileform'>
         
          <Form.Item name="newpassword" label="New Password"  rules={[
            {
              required: true,
            },
          ]} >
            <Input.Password />
          </Form.Item>

          <Form.Item name="cpassword" label=" Confirm New Password"  rules={[
            {
              required: true,
            },
          ]} >
            <Input.Password />
          </Form.Item>


          <Form.Item {...tailLayout}>

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="button" className='resetbtn' onClick={onReset}>
              Reset
            </Button>

          </Form.Item>
        </Form>}

      </div>
    </>
  );
}