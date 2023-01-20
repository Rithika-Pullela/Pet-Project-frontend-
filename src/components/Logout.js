import StdIdval from './StdIdval';
import { useRecoilState } from 'recoil';
import './Studenthome.css'
import { useNavigate } from 'react-router-dom';
import Logoutdisplay from './Logoutdisplay';

export default function Logout() {
    const [id, setid] = useRecoilState(StdIdval);
    const [value, setvalue] = useRecoilState(Logoutdisplay);
    const navigate = useNavigate();
    function handler() {
        setid('');
        setvalue(!value);
        localStorage.removeItem('lsid');
        navigate('/',{replace:true});
    }


    function toggle() {
        setvalue(!value);
    }


    return (
        <>
            <div className="logoutpage">
                <div className='scontent'>
                    <p>Confirm Logout</p>
                    <div>
                        <button onClick={toggle}>No</button>
                        <button onClick={handler}>Yes</button>
                    </div>

                </div>
            </div>
        </>
    );
}