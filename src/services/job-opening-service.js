import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";

// export const createResume=(ResumeDto)=>{
    
//     return privateAxios.post('/resume/'+getCurrentUserDetail().email,ResumeDto).then((response)=> response.data);
// }

// export const getResume=()=>{

//     return privateAxios.get('/resume/'+getCurrentUserDetail().email).then((response)=> response.data);
// }

// export const updateResume=(ResumeDto)=>{
//     return privateAxios.put('/resume/'+getCurrentUserDetail().email,ResumeDto).then((response)=> response.data);
// }

// export const deleteResume=()=>{

//     return privateAxios.delete('/resume/'+getCurrentUserDetail().email).then((response)=> response.data);
// }

export const createJobOpening=(jobOpeningDto)=>{
    return privateAxios.post('/job-opening/',jobOpeningDto).then((response)=> response.data);
}

export const getSingleJobOpening=(jobId)=>{
    return privateAxios.get('/job-opening/'+jobId).then((response)=> response.data);
}

export const getAllJobOpenings=()=>{
    return privateAxios.get("/job-opening/all").then((response)=>response.data);
}

export const deleteJobOpening=(jobId)=>{
    return privateAxios.delete("/job-opening/"+jobId).then((response)=>response.data);
}

export const editJobOpening=(jobOpeningDto)=>{
    return privateAxios.put("/job-opening/"+jobOpeningDto.id,jobOpeningDto).then((response)=>response.data);
}

export const searchJobOpening=(query)=>{
    return privateAxios.get("/job-opening/search/"+query).then((response)=>response.data);
}

