import { useQuery } from 'react-query'
import axios from 'axios'

const Qfun2 = async (userId) => {
    return await axios.get(`http://localhost:3001/student/${userId}?_embed=Courses`);
}

export const useCourse = (userId) => {
    return useQuery(['courses', userId], () => Qfun2(userId));

}