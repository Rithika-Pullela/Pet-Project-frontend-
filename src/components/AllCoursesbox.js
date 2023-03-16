import './Studenthome.css'
import { Link } from 'react-router-dom'

export default function AllCoursesbox(props) {

    return (

        <Link to={`/availableCourses/${props.coursedata.ID}`} style={{ textDecoration: 'none' }}>
            <div className='comp' >
                <img src={props.coursedata.Image} alt="no img to display"></img>
                    {console.log("myyyy",props.coursedata)}
            </div>
        </Link>

    )

}