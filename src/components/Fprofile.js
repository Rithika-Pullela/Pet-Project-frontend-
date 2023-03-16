import './Facultyhome.css'
import { useQuery } from 'react-query'
import Fprofiledisplay from '../store/Fprofiledisplay';
import { useRecoilState } from 'recoil';
import axios from 'axios'
import { useMutation } from 'react-query'
import { EditFaculty } from '../fetching/useMutationf';
import { Button, Form, Input } from 'antd';
import { LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { Space } from 'antd';
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


const useQfun2 = async ({ queryKey }) => {
  return await axios.get(`http://localhost:3001/faculty/${queryKey[1]}`);
}

export default function Fprofile() {

  const currentFacultyId = localStorage.getItem('lfid');
  const { data, isLoading } = useQuery(['faculty', currentFacultyId], useQfun2);
  const [profile, setprofile] = useRecoilState(Fprofiledisplay);
  const { mutate } = useMutation((values) => EditFaculty(values))
  const [form] = Form.useForm();
  const onFinish = (values) => {
   const newobj = {
      "id": data.data.id,
      "password": values.newpassword,
      "studentId": data.data.studentId,
      "CourseId": data.data.CourseId

    }
    mutate(newobj);
    alert("New Password is set!")
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };


  if (isLoading) {
    return <h1>
      <Spin indicator={antIcon} />Current faculty details loading,waittttt!</h1>
  }


  const handleProfile = () => {
    setprofile(!profile)
  }

  return (
    <>
      <div className="Fprofile">

        <div className='userdetails'>

          <UserOutlined style={{ fontSize: '100px', color: ' #1677ff', border: '9px  solid #1677ff', borderRadius: '0.39em', marginTop: '30px' }} />
          <p><strong>ID : </strong>{data.data.id}</p>

        </div>

        <Space
          direction="vertical"
          style={{
            width: '40%',
            marginTop: '5%',

          }}
        >
          <Button type="primary" block onClick={handleProfile}>Edit Details</Button>

        </Space>
        {profile &&

          <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} className='profileform'>

            <Form.Item name="newpassword" label="New Password" rules={[
              {
                required: true,
              },
            ]} >
              <Input.Password />
            </Form.Item>

            <Form.Item name="cpassword" label=" Confirm New Password" rules={[
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
          </Form>
        }
      </div>

    </>
  );
}