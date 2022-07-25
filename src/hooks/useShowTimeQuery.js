import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_LIST_SHOWTIME } from '../config/endpointapi'

const getShowtime = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const data = await getAxios(API_LIST_SHOWTIME, params)

  return data
}

const useShowtimeQuery = (params) => {
  return useQuery(['showtime', ...params], getShowtime, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useShowtimeQuery
