import Highcharts from "highcharts"
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/modules/boost';

type DataPoint = {
  x: number
  y: number
}

const LineChart = ({ dataset }: { dataset: DataPoint[] }) => {
  let options = {}
  try {
    options = {
      chart: {
        type: 'line',
        scrollablePlotArea: {
          minWidth: 1440,
          scrollPositionX: 1
        }
      },
      title: {
        text: 'Just random data overtime'
      },
      xAxis: {
        title: { text: "Time (seconds)" },
        tickInterval: 5,
        tickPixelInterval: 50
      },
      yAxis: {
        title: { text: "Value" },
        min: 0,
      },

      series: [
        {
          boostThreshold: 50000,
          data: dataset.map((point) => [point.x, typeof point.y !== "number" ? 0 : point.y])
          // data: [{ x: 0, y: 59.5 }, { x: 5, y: 19.8 }, { x: 10, y: "65.16" }, { x: 15, y: 14.34 }, { x: 20, y: undefined }, { x: 25, y: 41.05 }, { x: 30, y: 67.68 }, { x: 35, y: 91.27 }, { x: 40, y: 94.42 }].map((point) => [point.x, typeof point.y !== "number" ? 0 : point.y])
        }
      ]
    };
  } catch (err) {
    console.error("Error configuring Highcharts:", err);
  }

  return (
    <div className="w-full h-auto"><HighchartsReact highcharts={Highcharts} options={options} /></div>
  )
}

export default LineChart