import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official';

type DataPoint = {
  x: number
  y: number
}

const LineChart = ({ dataset }: { dataset: DataPoint[] }) => {
  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Just random data overtime'
    },
    xAxis: {
      title: { text: "Time (seconds)" },
      tickInterval: 5,
    },
    yAxis: {
      title: { text: "Value" },
      min: 0,
      max: 100,
    },

    series: [
      {
        data: dataset.map((point) => [point.x, point.y])
      }
    ]
  };

  return (
    <div className="w-full h-auto"><HighchartsReact highcharts={Highcharts} options={options} /></div>
  )
}

export default LineChart