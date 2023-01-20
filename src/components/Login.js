import './Login.css'
import React,{ useState } from 'react'
import LoginForm from './LoginForm';



export default function Login()
{
    const[val1 ,setval1]=useState(true);
    function toggler1(){
        setval1(false)
    }
    function toggler2(){
        setval1(true)
    }

  

    return(
        <>
        <body>
            <div className='loginPage'>  
                        <h1>Login</h1>
                        <div>
                            <button className='btn' onClick={toggler1}>Student</button>
                            <br></br>
                            <button className='btn' onClick={toggler2}>Faculty</button>
                        </div>
                        <br></br>
                        {val1  && <LoginForm  user={"faculty"}/>}
                        {!val1 && <LoginForm  user={"student"}/>}
            </div>    
        </body>  
        </>
    )
}





// {
//   "Students": [
//     {
//       "id": 1,
//       "name": "Rithika",
//       "phn-no": 8522949986,
//       "email": "rithikapullela@gmail.com"
      
//     },
//     {
//       "id": 2,
//       "name": "Akshara",
//       "phn-no": 9553146015,
//       "email": "akshara@gmail.com"
//     }
//   ],

//   "Courses": [
//     {
//       "cid": 1,
//       "cname": "React",
//       "Faculty": "Naga",
//       "email": "naga@gmail.com",
//       "studentid":1
//     },
//     {
//       "cid": 2,
//       "cname": "Git",
//       "Faculty": "Sai",
//       "email": "sai@gmail.com",
//       "studentid":1
//     },
//     {

//       "cid": 3,
//       "cname": "html",
//       "Faculty": "Gp",
//       "email": "gp@gmail.com",
//       "studentid":2
//     }
    
//   ]


// }


  
  
  
  
  
  
  