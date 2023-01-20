import './Facultyhome.css'

export default function Studentbox(props)
{
    return(
        <>
            <div className='studentbox'>
                <span><strong>Student Id: </strong>{props.obj.id}</span>
                <p><strong>Student Name: </strong>{props.obj.name}</p>
            </div>
        </>
    )
}