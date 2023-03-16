import { useQuery } from 'react-query';
import axios from 'axios';
import Remainderbox from '../components/Remainderbox'
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

async function Qfun() {
    return await axios.get('http://localhost:5001/Remainders')
}

export default function Remainders() {
    const { data, isLoading } = useQuery(['reminder'], Qfun,
        {
            refetchOnMount:'always'
        }
    )
    if (isLoading) {
        return <h1>
            <Spin indicator={antIcon} /> Loading Remainders waitt!!!</h1>
    }
    return (
        <>
            
            <div className='remainder'>
                {data.data.length==0 && <h3>No Reminders!</h3>}
                {data.data && data.data.map((item) =>
                    
                    <Remainderbox remainderdata={item} key={item.id} querykey={['reminder']}/>
                 )
                }
            </div>
        </>
    )
}