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

export const applyToJobOpening=(jobApplicationDto)=>{
    return privateAxios.post('/job-application/',jobApplicationDto).then((response)=> response.data)
}

export const getAllApplicationsForUser=()=>{
    return privateAxios.get('/job-application/user/'+getCurrentUserDetail().email).then((response)=> response.data)
}

export const getAllApplicationsForJobOpening=(jobId)=>{
    return privateAxios.get('/job-application/job_opening/'+jobId).then((response)=> response.data)
}

export const updateJobApplication=(jobApplicationDto)=>{
    return privateAxios.put('/job-application/'+jobApplicationDto.id,jobApplicationDto).then((response)=> response.data)
}

export const deleteJobApplication=(jobApplicationId)=>{
    return privateAxios.delete('/job-application/'+jobApplicationId).then((response)=> response.data);
}

export const searchJobApplication=(query)=>{
    return privateAxios.get('/job-application/search/'+query).then((response)=>response.data);
}

export const batchUpdateApplications=(formData,jobId,oldStatus,newStatus)=>{
    return privateAxios.post('/job-application/update/status/batch/'+jobId+'/'+oldStatus+'/'+newStatus,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },}).then((response)=> response.data);
}


