import { DatePicker } from 'antd'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { Chart } from 'react-chartjs-2'
import useMovieChartQuery from '../../hooks/useMovieChartQuery'

const { RangePicker } = DatePicker

const MovieChart = () => {
  const [startDate, setStartDate] = useState(moment().subtract(30, 'days'))
  const [endDate, setEndDate] = useState(moment())
  const chartRef = useRef()
  const [labels, setLabels] = useState()
  const [viewer, setViewer] = useState()
  const start_date = moment(startDate).format('YYYY-MM-DD')
  const end_date = moment(endDate).format('YYYY-MM-DD')

  const { data: movie } = useMovieChartQuery([start_date, end_date])

  const data = movie?.data

  const handleChangeRangeDate = (value) => {
    setStartDate(value[0])
    setEndDate(value[1])
  }

  useEffect(() => {
    if (data) {
      let labelArr = []
      let viewerArr = []
      data?.map((movie) => {
        labelArr.push(movie?.name)
        viewerArr.push(movie?.viewer)
      })
      setLabels(labelArr)
      setViewer(viewerArr)
    }
  }, [data])

  return (
    <div className="home-movie">
      <div className="home-ticket-content">Number of viewer of each movie</div>
      <div className="home-date-movie">
        <RangePicker defaultValue={[startDate, endDate]} onChange={handleChangeRangeDate} />
      </div>
      <div className="home-movie-chart">
        <Chart
          ref={chartRef}
          data={{
            labels,
            datasets: [
              {
                label: 'Viewer',
                data: viewer,
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
  )
}

export default MovieChart
