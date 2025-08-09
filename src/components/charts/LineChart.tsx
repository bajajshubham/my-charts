import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official';

const options = {
  chart: {
    type: 'line'
  },
  title: {
    text: 'Just random data overtime'
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6]
    }
  ]
};

const LineChart = () => {
  return (
    <div className="w-full h-[400px]"><HighchartsReact highcharts={Highcharts} options={options} /></div>
  )
}

export default LineChart