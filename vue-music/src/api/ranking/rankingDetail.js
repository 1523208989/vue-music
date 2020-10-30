import axios from 'axios'

export default(id)=>{
  return axios.get('/rankingDetailApi',{
    params:{
      id
    }
  })
}