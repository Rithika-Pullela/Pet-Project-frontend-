import axios from 'axios'

export const EditFaculty=async(newData)=>{
    console.log(newData)
    const {data}=await axios.put(`http://localhost:3001/faculty/${newData.id}`,newData)
    console.log(data)
    return data
}

// export const useEditFacultyData=()=>{
//     return 
// }