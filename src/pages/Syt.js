
import { useParams } from 'react-router-dom';
import { useSubjects } from '../fetching/useSubjects';
import '../components/Studenthome.css'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

export default function Syt() {
  let id = useParams().id;
  const { data, isLoading } = useSubjects(id);
  if (isLoading) {
    return <h3>
      <Spin indicator={antIcon} /> Loading Subject Details </h3>
  }

  return (
    <>
      <div className='subjectpage'>
        <h1>{data.data.name}</h1>


        <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank"  >Pointers</a></div>

        <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Data Structures</a></div>

        <div> <a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">C++ STL</a></div>

        <div><a href='https://www.youtube.com/watch?v=92S4zgXN17o&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P' target="_blank">Graphs</a></div>

      </div>

    </>
  )
}