
import './Studenthome.css'
import { Link } from 'react-router-dom'

export default function Coursebox(props) {

    return (

        <Link to={`/subjects/${props.courseinfo.id}`} style={{ textDecoration: 'none' }}>
            <div className='comp' >
                <img src={props.courseinfo.image} alt="no img to display"></img>
                <h4>Videos: <strong>{props.courseinfo.videos}</strong></h4>
            </div>
        </Link>

    )

}