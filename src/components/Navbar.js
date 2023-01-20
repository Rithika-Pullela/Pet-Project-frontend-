// import {NavLink} from 'react-router-dom'
import './Studenthome.css'
import Logout from './Logout';
import Logoutdisplay from './Logoutdisplay';
import { useRecoilState } from 'recoil';
import Sprofiledisplay from './Sprofiledisplay';
import { useNavigate } from 'react-router-dom';
import Sprofile from './Sprofile';
import Remainderdisplay from './Remainderdisplay';
import Remainders from './Remainders';

export default function Navbar() {
   
    const [value, setvalue] = useRecoilState(Logoutdisplay);
    const [profile, setprofile] = useRecoilState(Sprofiledisplay);
    const [remainder, setremainder] = useRecoilState(Remainderdisplay);
    const navigate = useNavigate();
    function handleProfile(){       
        // navigate('sprofile',{replace:true})
        setprofile(!profile);
    }
    function toggler(){
        setvalue(!value);
    }

    function handleremainders(){
        setremainder(!remainder);
    }
    return (
        <>
            <div className='nav'>
                <div>
                    <button>Home</button>
                    <button>Courses Enrolled</button>
                    <button onClick={handleremainders}>Remainders</button>
                </div>

                <div>
                    <button onClick={handleProfile}>Profile</button>
                    <button onClick={toggler}>Logout</button>
                    
                </div>
                {value && <Logout/>}
                {profile && <Sprofile/>}
                {remainder && <Remainders/>}
            </div>
            
        </>
    );
}