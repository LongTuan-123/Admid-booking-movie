export const BASE_API = "http://127.0.0.1:8000"

// Api user for login register
export const API_LOGIN = `${BASE_API}/api/auth/login`
export const API_REGISTER = `${BASE_API}/api/auth/register`
export const API_LOGOUT = `${BASE_API}/api/auth/logout`
export const API_LIST_USER = `${BASE_API}/api/auth/list`

// Api movie
export const API_MOVIES_STORE = `${BASE_API}/api/movies/store`
export const API_MOVIES = `${BASE_API}/api/movies`
export const API_MOVIES_DELETE = `${BASE_API}/api/movies/delete`
export const API_MOVIES_DETAIL = `${BASE_API}/api/movies/:id`
export const API_MOVIES_UPDATE = `${BASE_API}/api/movies/update`
// Api advertisement
export const API_LIST_ADVERTISEMENT =`${BASE_API}/api/advertise`
export const API_ADVERTISEMENT_STORE=`${BASE_API}/api/advertise/store`