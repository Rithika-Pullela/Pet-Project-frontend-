import { useQuery } from 'react-query'
import axios from 'axios'



const Qfun2 = async () => {
    const config = {
        headers:{
                    "Content-Type": "application/json",
                },
                method:"post",
    };
    var result= await axios.post("/users/courses",config);
   console.log(result)
    return result
}

export const useGetAllCourses = () => {
    return useQuery(['getallcourses'], () => Qfun2());

}