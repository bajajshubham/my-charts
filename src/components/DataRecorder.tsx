import React, { useEffect, useRef, useState } from "react"
import LineChart from "@/components/charts/LineChart"
import { Button } from "@/components/ui/button"
import { Disc } from "lucide-react"

type DataPoint = {
  x: number
  y: number
}

const DataRecorder: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([{ x: 0, y: 0 }])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isRecording, setIsRecording] = useState(false);


  const startRecording = () => {
    if (isRecording) return;

    else {
      setIsRecording(true);

      intervalRef.current = setInterval(() => {
        setData(prev => {
          return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
          // return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
        })
      }, 1000)
    }
  }

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRecording(false)
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
        <div className="flex gap-2 mt-10 justify-end items-center">
          <Disc color="red" className={isRecording ? 'Blink' : ""} />
          <Button onClick={startRecording} disabled={isRecording} className="cursor-pointer bg-blue-500" >Start</Button>
          <Button onClick={stopRecording} disabled={!isRecording} className="cursor-pointer bg-red-500" >Pause</Button>
        </div>
      </div>
    </div>
  )
}

export default DataRecorder