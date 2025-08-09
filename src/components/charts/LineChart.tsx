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
    },

    series: [
      {
        data: dataset.map((point) => [point.x, typeof point.y !== "number" ? 0 : point.y])
        // data: [{ x: 0, y: 59.5 }, { x: 5, y: 19.8 }, { x: 10, y: "65.16" }, { x: 15, y: 14.34 }, { x: 20, y: undefined }, { x: 25, y: 41.05 }, { x: 30, y: 67.68 }, { x: 35, y: 91.27 }, { x: 40, y: 94.42 }].map((point) => [point.x, typeof point.y !== "number" ? 0 : point.y])
      }
    ]
  };

  return (
    <div className="w-full h-auto"><HighchartsReact highcharts={Highcharts} options={options} /></div>
  )
}

export default LineChart