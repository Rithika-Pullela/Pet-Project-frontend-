
import './Studenthome.css'
import { Link } from 'react-router-dom'

export default function Coursebox(props) {

    return (
       
            <Link to={`/subjects/${props.obj.id}`} style={{ textDecoration: 'none'}}>
                 <div className='comp' >
                      <img src={props.obj.image} alt="no img to display"></img>
                     <h4>Videos: <strong>{props.obj.videos}</strong></h4>
                </div>
            </Link>
      
    )

}