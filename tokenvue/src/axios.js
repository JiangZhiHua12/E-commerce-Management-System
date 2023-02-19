import axios from "axios";
import swal from "sweetalert";
import router from "@/router";

axios.defaults.timeout=10000

//设置post请求头

axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;charset=UTF-8';

// axios请求拦截器

axios.interceptors.request.use(
    request => {
        var token=window.localStorage.getItem('token_jzh')
    if (token) {
        // 请求统一设置header
        request.headers["Authorization"] =`Bearer ${token}`
    }
    return request

}, error => {

    return Promise.reject(error)

})

// axios响应拦截器
axios.interceptors.response.use(
    response=>{
   if (response.data.status===401){
       window.localStorage.removeItem("token_jzh")
       swal('登入失效，请重新登入').then(()=>{
           router.replace({
               path:'/login'
           })
       })
   }else if (response.data.token){
       window.localStorage.setItem('token_jzh',response.data.token)
   }
   return response

    },error => {
        console.log(error)
    }

)

export default axios
