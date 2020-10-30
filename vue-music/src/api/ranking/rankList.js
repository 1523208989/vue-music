import axios from 'axios'


export default ()=>{
  return axios.get('/rankListApi',{
    params:{
      showDetail:0
    }
  })
}