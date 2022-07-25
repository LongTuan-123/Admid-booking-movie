import axios from 'axios'
import { DatePicker } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { API_TICKET_DATE } from '../../config/endpointapi'
import { getToken } from '../../Http'
import PrivateLayout from '../../Layout/PrivateLayout'
import '../../style/Home.css'
import moment from 'moment'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'
import { Chart } from 'react-chartjs-2'

const { RangePicker } = DatePicker

ChartJS.register(LinearScale, CategoryScale, BarElement, PointElement, LineElement, Title, Legend, Tooltip)

const Home = () => {
  const [data, setData] = useState()
  const [startDate, setStartDate] = useState(moment().subtract(3, 'days'))
  const [endDate, setEndDate] = useState(moment())
  const chartRef = useRef()
  const [labels, setLabels] = useState([])
  const [dataCol, setDataCol] = useState([])

  useEffect(() => {
    axios.defaults.headers.common['AUTHORIZATION'] = `Bearer ${getToken()}`
    const getTicket = async () => {
      const params = {
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD'),
      }
      await axios
        .get(API_TICKET_DATE, { params })
        .then((res) => {
          setData(res?.data?.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getTicket()
  }, [startDate, endDate])

  useEffect(() => {
    if (data !== undefined) {
      let label = []
      let datas = []
      for (let i = 0; i <= moment(endDate - startDate).format('D') - 1; i += 1) {
        var count = 0
        label.push(moment(startDate).add(i, 'days').format('YYYY-MM-DD'))
        // console.log('data: ', data)
        for (let y = 0; y < data?.length; y += 1) {
          // console.log('Data: ', data[y])
          if (
            moment(startDate).add(i, 'days').format('YYYY-MM-DD') === moment(data[y]?.created_at).format('YYYY-MM-DD')
          ) {
            count += 1
          }
        }
        datas.push(count)
      }
      setLabels(label)
      setDataCol(datas)
    }
  }, [data, endDate, startDate])

  const handleChangeRangeDate = (value) => {
    setStartDate(value[0])
    setEndDate(value[1])
  }

  console.log(labels, dataCol)
  return (
    <PrivateLayout>
      <div className="home">
        <div className="ticket-chart">
          <div className="label">Number of tickets sold </div>
          <RangePicker defaultValue={[startDate, endDate]} onChange={handleChangeRangeDate} />
          <Chart
            ref={chartRef}
            data={{
              labels,
              datasets: [
                {
                  label: 'Ticket',
                  data: dataCol,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
              ],
            }}
            type="line"
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </PrivateLayout>
  )
}
export default Home
