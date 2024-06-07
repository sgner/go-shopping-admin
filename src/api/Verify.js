import request from "@/utils/request.js"
export const verifyService = (id)=>{
    return request.get("/verify",{params:{"temporaryId":id}})
}