import request from "@/utils/request.js"
export const adminLoginService = (loginData)=>{
      return request.post("admin/login",loginData)
}
export const getCategoryService = (name,type,pageNum)=>{
      return request.get("admin/system/category/"+pageNum,{params:{"name":name,"type":type}})
}
export const deleteCategoryService = (id,type)=>{
      return request.delete("admin/delete/category",{params:{"Id":id,"type":type}})
}
export const getAvailableParentCategoryService = (id,type)=>{
      return request.get("admin/system/parentClassificationsAvailable/"+id+"/"+type)
}
export const getCurrentCategoryParentService = (id)=>{
      return request.get("admin/system/parent/"+id)
}
export const getEventService = (filteredParams,pageNum)=>{
     return request.post("admin/system/event/"+pageNum,filteredParams);
}
export const getEventCategoryService = (id)=>{
      return request.get("/admin/system/event/category",{params:{"id":id}})
}
export const getCategoryByIdService = (id)=>{
      return request.get("admin/system/currentCategory/"+id)
}
export const getSubCategoryService = (id)=>{
       return request.get("admin/system/currentSubCategory/"+id)
}
export const addCategoryService = (category)=>{
      return request.post("/admin/add/category",category)
}
export const getBookCategoryService = ()=>{
     return request.get("admin/get/bookCategory")
}