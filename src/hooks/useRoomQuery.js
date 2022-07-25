import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_LIST_ROOM } from '../config/endpointapi'


const getRoom = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const data = await getAxios(API_LIST_ROOM, params)

  return data
}

const useRoomQuery = (params) => {
  return useQuery(['room', ...params], getRoom, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useRoomQuery
