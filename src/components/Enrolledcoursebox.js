import './Studenthome.css'
import { Link } from 'react-router-dom'

export default function Enrolledcoursebox(props) {

    return (
       
            <Link to={`/Courses/${props.obj.id}`} style={{ textDecoration: 'none'}}>
                 <div className='comp' >
                      <img src={props.obj.image} alt="no img to display"></img>
                     <h4><strong>{props.obj.name}</strong></h4>
                </div>
            </Link>
      
    )

}