import { useQuery } from 'react-query'
import axios from 'axios'

 const Qfun = async (id) => {
    return await axios.get(`http://localhost:4002/Subjects/${id}`);
}

export const useSubjects= (id) => {
    return useQuery([id], ()=>Qfun(id));
}