import { base_url } from "./base_url";
import { commonAPI } from "./commonAPI";

//register api call
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${base_url}/users/register`,user,"")
}

//login api call
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${base_url}/users/login`,user,"")
}

//add project api call
export const addProjectAPI=async(reqbody,reqHeader)=>{
return await commonAPI("post",`${base_url}/project/add`,reqbody,reqHeader)
}

//get home projects 
export const getHomeProjectsAPI=async()=>{
return await commonAPI("get",`${base_url}/projects/home`,"","")
}

//get all projects
export const getAllProjectsAPI=async(searchKey,reqHeader)=>{
return await commonAPI("get",`${base_url}/projects/all?search=${searchKey}`,"",reqHeader)
}

//get user projects
export const getUserProjectsAPI=async(reqHeader)=>{
return await commonAPI("get",`${base_url}/user/project`,"",reqHeader)
}

//delete user projects
export const deleteUserProjectsAPI=async(id,reqHeader)=>{ console.log(id)
return await commonAPI("delete",`${base_url}/user/project/${id}`,{},reqHeader)
}

//edit user projects
export const editUserProjectAPI=async(id,reqbody,reqHeader)=>{ console.log(id)
return await commonAPI("put",`${base_url}/user/project/${id}`,reqbody,reqHeader)
}