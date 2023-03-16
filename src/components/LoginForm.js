import './Login.css'
import { useFetch } from '../fetching/useFetch';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useRecoilState } from 'recoil';
import UserDetails from '../store/UserDetails';
import { Spin } from 'antd';

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
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

const LoginForm = (props) => {

  const { data: userdata, isLoading: loadingUserData } = useFetch(props.user);
  const [userData, setuserData] = useRecoilState(UserDetails)
  const navigate = useNavigate();
  const [form] = Form.useForm();
  let flag = false;

  if (loadingUserData) {
    return <h1>
      <Spin indicator={antIcon} />
      Wait until it loads</h1>
  }

  const onFinish = (values) => {
    userdata?.data.map(item => {
      if (item.id === values.id && item.password == values.password) {

        flag = true;
        if (props.user == 'Student') {
          navigate('shome', { replace: true })
          localStorage.setItem('lsid', item.id);
          setuserData(props.user)
        }
        else if (props.user == 'Faculty') {
          navigate('fhome', { replace: true })
          localStorage.setItem('lfid', item.id);
          setuserData(props.user)
        }

      }
    })

    if (!flag) {
      alert("Please enter valid credentials");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (

    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} className='login'>

      <Form.Item name="id" label={`${props.user} Id`}
        rules={[
          {
            required: true,
          },
        ]} >
        <Input />
      </Form.Item>

      <Form.Item name="password" label={`${props.user} Password`}
        rules={[
          {
            required: true,
          },
        ]} >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>

        <Button type="primary" htmlType="submit" >Submit
        </Button>
        <Button htmlType="button" className='resetbtn' onClick={onReset} style={{ background: "white", color: "black", fontSize: "bold" }}>
          Reset
        </Button>

      </Form.Item>
    </Form>

  );
};
export default LoginForm;


