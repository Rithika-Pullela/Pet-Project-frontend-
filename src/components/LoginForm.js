import './Login.css'
import { useState } from 'react';
import { useFetch } from './useFetch';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useRecoilState } from 'recoil';
import StdIdval from './StdIdval';
import FacIdval from './FacIdval';

const validate = values => {

  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less';
  }

  if (!values.id) {
    errors.id = 'Required';
  } 

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length>8) {
    errors.password= 'Must have a minium of 8 characters';
  }

  return errors;

};






 const LoginForm = (props) => {

  const {data :d, isLoading} = useFetch(props.user);
  const [sid, setsid] = useRecoilState(StdIdval);
  const [fid,setfid]=useRecoilState(FacIdval);
  // const [lsfid,setlsfid]=useState('');
  // const [lssid,setlssid]=useState('');
 
   
    

  const formik = useFormik({
    initialValues: {
      username: '',
      id: '',
      password: '',
    },
    validate,
    onSubmit: values => {
      d?.data.map(item =>  {
                        if(item.id===values.id && item.password==values.password)
                        {
                            // console.log(item.name)
                            flag=true;
                            if(props.user=='student')
                            {
                              navigate('shome',{replace:true})
                              setsid(item.id)
                              localStorage.setItem('lsid',item.id);
                            }
                            else if(props.user=='faculty')
                            {
                              navigate('fhome',{replace:true})
                              setfid(item.id)
                              localStorage.setItem('lfid',item.id);
                            }    
                            
                            

                        }   
                   })
                   if(!flag)
                   {
                    alert("Please enter valid credentials");
                   }
    },
  });


  const navigate=useNavigate();
  let flag=false;
    
    if(isLoading)
     {
            return <h1>Wait until it loads</h1>
     }

  return (
    <form onSubmit={formik.handleSubmit}>
    <div className='inputs'>
            <label htmlFor="username">
              {props.user} Username :</label><br></br>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            {formik.errors.username ? <div style={{color: "red",marginTop:"3px"}}>{formik.errors.username}</div> : null}
            <br></br>

            <label htmlFor="id">
          
            {props.user} Id :</label><br></br>
            <input
                id="id"
                name="id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.id}
            />
            
            {formik.errors.id ? <div style={{color: "red",marginTop:"3px"}}>{formik.errors.id}</div> : null}
            <br></br>
            <label htmlFor="password">{props.user} Password:</label><br></br>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            /><br></br>
            {formik.errors.password ? <div style={{color: "red",marginTop:"3px"}}> {formik.errors.password}</div> : null}

            <button type="submit">Submit</button>
      </div>
    </form>
  );
};
export default LoginForm;




// export default function LoginForm(props) {
//     const [name, setName] = useState("");
//     const [pass, setpass] = useState("");
//     const [id, setid] = useState("");
//     const {data :d, isLoading} = useFetch(props.user);
//     const navigate=useNavigate();

//     if(isLoading)
//     {
//         return <h1>Wait until it loads</h1>
//     }

   // console.log(d?.data[0].name)

//     const handleSubmit = (event) => {
//         event.preventDefault();
//             console.log(pass);
//             console.log(id);
//            d?.data.map(item =>  {
//                 if(item.id===id && item.password==pass)
//                 {
//                     console.log(item.name)
//                     flag=true;
//                      navigate('shome')
//                 }


//            })
//            if(!flag)
//            {
//             alert("Please enter valid credentials");
//            }
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className='inputs'>

//                     <label>{props.user} Username:</label>
//                         <input type="text" placeholder='Enter your username' value={name}
//                             onChange={(e) => setName(e.target.value)}></input>
                    

//                     <br></br>
//                     <br></br>

//                     <label>{props.user} Id:</label>
//                         <input type="text" placeholder='Enter valid password' value={id}
//                             onChange={(e) => setid(e.target.value)}></input>
                    

//                     <br></br>
//                     <br></br>

//                     <label>{props.user} Password: </label>
//                         <input type="text" placeholder='Enter valid password' value={pass}
//                             onChange={(e) => setpass(e.target.value)}></input>
                   

//                     <br></br>
//                     <button type="submit">Submit</button>

//                 </div>
//             </form>
//         </>
//     )       
// }