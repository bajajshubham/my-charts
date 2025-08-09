import React, { useEffect, useRef, useState } from "react"
import LineChart from "@/components/charts/LineChart"
import { Button } from "@/components/ui/button"

type DataPoint = {
  x: number
  y: number
}

const DataRecorder: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)


  const startRecording = () => {
    intervalRef.current = setInterval(() => {
      setData(prev => {
        return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
      })
    }, 5000)
  }

  const stopRecording = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl m-2">Random <span className="line-through">Thoughts</span> Data Generator</h1>
      <div className="flex flex-col mt-20">
        <LineChart dataset={data} />
        <div className="flex gap-2 mt-10 justify-end">
          <Button onClick={startRecording}>Start</Button>
          <Button onClick={stopRecording}>Stop</Button>
        </div>
      </div>
    </div>
  )
}

export default DataRecorder