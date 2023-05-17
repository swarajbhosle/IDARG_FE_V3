import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";


export const getAllCompanies=()=>{

    return privateAxios.get('/company/all').then((response)=> response.data);
}

export const addCompanyToDb=(companyDto)=>{

    return privateAxios.post('/company/',companyDto).then((response)=> response.data);
}

export const deleteCompanyToDb=(companyId)=>{
    return privateAxios.delete('/company/'+companyId).then((response)=>response.data);
}

export const editCompanyToDb=(companyDto)=>{
    return privateAxios.put('/company/'+companyDto.id,companyDto).then((response)=>response.data);
}

export const getCompanyStats=()=>{
    return privateAxios.get('/company/stats').then((response)=>response.data);
}