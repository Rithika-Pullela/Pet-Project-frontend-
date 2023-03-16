import axios from 'axios'

export const EditFaculty=async(newData)=>{
    return await axios.put(`http://localhost:3001/faculty/${newData.id}`,newData);
}
