import { useQuery } from 'react-query'
import axios from 'axios'

 const Qfun = async (user) => {
    return await axios.get(`http://localhost:3001/${user}`);
}

export const useFetch = (user) => {
    return useQuery(['userdata',user.id], ()=>Qfun(user));
}
