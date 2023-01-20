import Recoilval from './FacIdval';
import { useRecoilState } from 'recoil';
import './Facultyhome.css'
import { useNavigate } from 'react-router-dom';
import FLogoutdisplay from './FLogoutdisplay';
import FacIdval from './FacIdval';

export default function FLogout() {
    
    const [id, setid] = useRecoilState(FacIdval);
    const [value, setvalue] = useRecoilState(FLogoutdisplay);
    const navigate = useNavigate();
    function handler() {
        setid('');
        navigate('/', { replace: true });
    }


    function toggle() {
        setvalue(!value);
    }


    return (
        <>
            <div className="logoutpage">
                <div className='content'>
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