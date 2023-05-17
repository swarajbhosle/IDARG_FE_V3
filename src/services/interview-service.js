import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";

// export const moderatorSendEmail=(sendEmailDto)=>{
//     return privateAxios.post("/email/send",sendEmailDto).then((response)=> response.data)
// }

export const getInterviewPlan=(jobId,interviewDto)=>{
    return privateAxios.post("/schedules/"+jobId,interviewDto).then((response)=>response.data);
}

export const saveInterviewPlan=(jobId,inp)=>{
    return privateAxios.post("/schedules/save/"+jobId,inp).then((response)=> response.data)
}

export const getMyInterviews=(email)=>{
    return privateAxios.get("/schedules/my/"+getCurrentUserDetail().email).then((response)=> response.data)
}