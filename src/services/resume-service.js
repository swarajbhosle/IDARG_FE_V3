import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";

export const createResume=(ResumeDto)=>{
    
    return privateAxios.post('/resume/'+getCurrentUserDetail().email,ResumeDto).then((response)=> response.data);
}

export const getResume=()=>{

    return privateAxios.get('/resume/'+getCurrentUserDetail().email).then((response)=> response.data);
}

export const updateResume=(ResumeDto)=>{
    return privateAxios.put('/resume/'+getCurrentUserDetail().email,ResumeDto).then((response)=> response.data);
}

export const deleteResume=()=>{

    return privateAxios.delete('/resume/'+getCurrentUserDetail().email).then((response)=> response.data);
}

