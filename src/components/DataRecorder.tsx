import React, { useEffect, useRef, useState } from "react"
import Chart from "@/components/charts/Chart"
import { Button } from "@/components/ui/button"
import { Disc } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type DataPoint = {
  x: number
  y: number
}

const DataRecorder: React.FC = () => {
  const [dataset1, setDataset1] = useState<DataPoint[]>([{ x: 0, y: 0 }])
  const [dataset2, setDataset2] = useState<DataPoint[]>([{ x: 0, y: 0 }])
  const [dataset3, setDataset3] = useState<DataPoint[]>([{ x: 0, y: 0 }])
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isRecording, setIsRecording] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeInterval, setTimeInterval] = useState(5)


  const startRecording = () => {
    if (isRecording) return;

    else {
      setIsRecording(true);
      setHasStarted(true)

      intervalRef.current = setInterval(() => {
        setDataset1(prev => {
          return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
          // return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
        })
        setDataset2(prev => {
          return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
          // return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
        })
        setDataset3(prev => {
          return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
          // return [...prev, { x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
        })
      }, (timeInterval * 1000))
    }
  }

  const stopRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRecording(false)
  }

  const resetRecording = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRecording(false)
    setHasStarted(false)
    setDataset1([{ x: 0, y: 0 }])
    setDataset2([{ x: 0, y: 0 }])
    setDataset3([{ x: 0, y: 0 }])
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueInt = parseInt(e.target.value) < 1 ? 1 : parseInt(e.target.value)
    setTimeInterval(valueInt)
  }

  useEffect(() => { //only for development purpose
    console.log("Dataset 1: ", dataset1)
    console.log("Dataset 2: ", dataset2)
    console.log("Dataset 3: ", dataset3)
  }, [dataset1, dataset2, dataset3])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])

  return (
    <div className="flex flex-col">
      <h1 className="text-5xl m-2">Random Data Generator</h1>
      <p className="text-2x1 m-1">Generate random numeric data between 0 to 100</p>
      <div className="flex flex-col mt-20">
        <div className="m-1 grid w-full max-w-sm items-center gap-3">
          <Tooltip>
            <TooltipTrigger>
              <Label htmlFor="timer" className="mb-2">Interval (seconds)</Label>
              <Input type="number" id="timer" placeholder="Interval in between data generation" disabled={isRecording} value={timeInterval} onChange={handleTimeChange} />
            </TooltipTrigger>
            {isRecording && <TooltipContent>
              <p>Pause recording to edit</p>
            </TooltipContent>}
          </Tooltip>
        </div>
        <Chart dataset1={dataset1} dataset2={dataset2} dataset3={dataset3} />
        <div className="flex gap-2 mt-10 justify-end items-center">
          {hasStarted && <Disc color="red" className={isRecording ? 'Blink' : ""} />}
          <Button onClick={startRecording} disabled={isRecording} className="cursor-pointer bg-blue-500" >Start</Button>
          <Button onClick={stopRecording} disabled={!isRecording} className="cursor-pointer bg-red-500" >Pause</Button>
          <Button onClick={resetRecording} disabled={!hasStarted} className="cursor-pointer bg-gray-500" >Reset</Button>
        </div>
      </div>
    </div>
  )
}

export default DataRecorder