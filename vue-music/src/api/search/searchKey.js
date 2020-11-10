import axios from 'axios'
export default (key) => {

  return axios.get('/searchKeyApi', {
    params: {
      key,
    }
  })
}