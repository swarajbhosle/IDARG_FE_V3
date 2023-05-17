import { getCurrentUserDetail } from "../auth";
import { myAxios, privateAxios } from "./helper";

export const getMyPlacementStatus=(email)=>{
    return privateAxios.get("/status/student/"+email).then((response)=> response.data);
}

export const getAllPlacementStatus=()=>{
    return privateAxios.get("/status/all").then((response)=> response.data);
}

