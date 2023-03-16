import './Studenthome.css'
import { Link } from 'react-router-dom'

export default function Enrolledcoursebox(props) {
    return(

        <Link to={`/Courses/${props.enrolledcourseinfo.id}`} style={{ textDecoration: 'none' }}>
            <div className='comp' >
                <img src={props.enrolledcourseinfo.image} alt="no img to display"></img>
                <h4><strong>{props.enrolledcourseinfo.name}</strong></h4>
            </div>
        </Link>

    )

}