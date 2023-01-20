import { useQuery } from 'react-query'
import axios from 'axios'
import { Await } from 'react-router-dom';

 const Qfun = async (user) => {
    return await axios.get(`http://localhost:3001/${user}`);
}

export const useFetch = (user) => {
    return useQuery([user.id], ()=>Qfun(user));
}
