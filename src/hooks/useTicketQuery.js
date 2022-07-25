import { getAxios } from '../Http'
import { useQuery } from 'react-query'
import { API_LIST_TICKET } from '../config/endpointapi'


const getTicket = async ({ queryKey }) => {
  const [_, limit, keyword, page] = queryKey

  const params = { limit, keyword, page }

  const data = await getAxios(API_LIST_TICKET, params)

  return data
}

const useTicketQuery = (params) => {
  return useQuery(['ticket', ...params], getTicket, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    staleTime: 5000,
  })
}

export default useTicketQuery
