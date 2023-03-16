import './Facultyhome.css'
import { Link } from 'react-router-dom'

export default function Studentbox(props) {
    return (
        <>
            <Link to={"/studentprogresscheck"} style={{ textDecoration: 'none' }}>
                <div className='studentbox'>
                    <span>Student Id: {props.studentinfo.id}</span>
                    <p>Student Name: {props.studentinfo.name}</p>
                </div>
            </Link>
        </>
    )
}                  