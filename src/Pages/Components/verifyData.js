export const verifyData = (data)=>{
    let status = false
    if(data !== undefined && data !== null && data !== ""){
        status = true
    }
    return status
   
}