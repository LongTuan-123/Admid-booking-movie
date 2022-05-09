import axios from 'axios' 
import Cookies from 'cookies-js'

axios.defaults.headers.common['Cache-Control'] = 'no-cache'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.common['Cache-Control'] = 'max-age=0'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export const getToken = () => {
    return Cookies.get('token') ? Cookies.get('token') : ''
}