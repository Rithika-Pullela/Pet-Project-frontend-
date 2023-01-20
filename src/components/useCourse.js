import { useQuery } from 'react-query'
import axios from 'axios'
import { Await } from 'react-router-dom';

const Qfun2 = async (user) => {
    return await axios.get(`http://localhost:3001/${user}?_embed=Courses`);
}

export const useCourse = (user) => {
    return useQuery([user.id], () => Qfun2(user));

}