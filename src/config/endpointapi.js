export const BASE_API = 'https://stark-hamlet-03590.herokuapp.com'

// Api user for login register
export const API_LOGIN = `${BASE_API}/api/auth/login`
export const API_REGISTER = `${BASE_API}/api/auth/register`
export const API_LOGOUT = `${BASE_API}/api/auth/logout`
export const API_LIST_USER = `${BASE_API}/api/auth/list`

// Api movie
export const API_MOVIE_STORE = `${BASE_API}/api/movies/store`
export const API_MOVIE = `${BASE_API}/api/movies`
export const API_MOVIE_SELECT = `${BASE_API}/api/movies/select`
export const API_MOVIE_DELETE = `${BASE_API}/api/movies/delete/:id`
export const API_MOVIE_DETAIL = `${BASE_API}/api/movies/:id`
export const API_MOVIE_UPDATE = `${BASE_API}/api/movies/update`

// Api advertisement
export const API_ADVERTISEMENT = `${BASE_API}/api/advertise`
export const API_ADVERTISEMENT_STORE = `${BASE_API}/api/advertise/store`
export const API_ADVERTISEMENT_UPDATE = `${BASE_API}/api/advertise/update`
export const API_ADVERTISEMENT_DELETE = `${BASE_API}/api/advertise/delete/:id`

//Api room
export const API_LIST_ROOM = `${BASE_API}/api/room`
export const API_ROOM_SELECT = `${API_LIST_ROOM}/select`
export const API_ROOM_STORE = `${BASE_API}/api/room/store`
export const API_ROOM_UPDATE = `${BASE_API}/api/room/update`
export const API_ROOM_DELETE = `${BASE_API}/api/room/delete/:id`
export const API_ROOM_DETAIL = `${BASE_API}/api/room/:id`

//Api seat
export const API_SEAT = `${BASE_API}/api/seat`
export const API_SEAT_CREATE = `${BASE_API}/api/seat/store`
export const API_SEAT_DELETE = `${BASE_API}/api/seat/delete/:id`
export const API_SEAT_UPDATE = `${BASE_API}/api/seat/update`

//Api showtime
export const API_LIST_SHOWTIME = `${BASE_API}/api/showtime`
export const API_SHOWTIME_CREATE = `${BASE_API}/api/showtime/store`
export const API_SHOWTIME_UPDATE = `${BASE_API}/api/showtime/update`
export const API_SHOWTIME_DELETE = `${BASE_API}/api/showtime/delete/:id`
export const API_SHOWTIME_DETAIL = `${BASE_API}/api/showtime/:id`

//Api news
export const API_LIST_NEWS = `${BASE_API}/api/news`
export const API_NEWS_STORE = `${BASE_API}/api/news/store`
export const API_NEWS_UPDATE = `${BASE_API}/api/news/update`
export const API_NEWS_DELETE = `${BASE_API}/api/news/delete/:id`
export const API_NEWS_SELECT = `${BASE_API}/api/news/select`
export const API_NEWS_DETAIL = `${BASE_API}/api/news/:id`

//Api tickets
export const API_LIST_TICKET = `${BASE_API}/api/tickets`
export const API_TICKET_DATE = `${BASE_API}/api/tickets/ticket_chart`
