import './Facultyhome.css'
import { useRecoilState } from 'recoil';
import FLogoutdisplay from './FLogoutdisplay';
import FLogout from './FLogout';
import Fprofiledisplay from './Fprofiledisplay';
import Fprofile from './Fprofile';


export default function Navbar2(props)
{
    const [value, setvalue] = useRecoilState(FLogoutdisplay);
    const [profile, setprofile] = useRecoilState(Fprofiledisplay);

    function toggler(){
        setvalue(!value)

    }
    function handleprofile(){
        setprofile(!profile)
    }

    return(
        
        <>
        <div className='nav'>
            <div>
                <button>Home</button>
                
            </div>

            <div>
                <button onClick={handleprofile}>Profile</button>
                <button onClick={toggler}>Logout</button>
                
            </div>
            {value && <FLogout/>}
            
                {profile && <Fprofile obj={props.obj} />}
    
        </div>
        
    </>
    )


}