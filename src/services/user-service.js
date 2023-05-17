import axios from "axios";
import { getCurrentUserDetail } from "../auth";
import { myAxios } from "./helper";
import { async } from "q";

export const signUp=(user)=>{
    const UserDto = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        resume: user.resume,
        skills: user.skills,
        college: user.college,
        degree: user.degree,
        designation: user.designation,
        domain: user.domain,
        companies: user.companies,
        tot_exp: user.tot_exp,
        summary: user.summary,
        password: user.password,
    }
    return axios.post('https://13.234.240.243.nip.io/signup',UserDto).then((response)=> response.data);
}

export const logIn= async(user)=>{
    const user_data = {
        email: user.email,
        password: user.password
    }
    const response = await axios.post('https://13.234.240.243.nip.io/login', user_data, {headers: {"access-control-allow-origin" : "*",'Content-Type': 'application/json'}});
    const json = await response.data
    return json
}

export const getSingleUser=()=>{
    return myAxios.get('/user/'+getCurrentUserDetail().email).then((response)=> response.data);
}


export const getUserByEmail= async (email)=>{
    const response = await axios.post('https://13.234.240.243.nip.io/user_by_email/' + email);
    const json = await response.data
    return json
}

export const getAllInviteKeys=()=>{
    return myAxios.get('/key/all').then((response)=> response.data);
}

export const updateUser=(userDto)=>{
    return myAxios.put('/user/'+userDto.email,userDto).then((response)=> response.data);
}

