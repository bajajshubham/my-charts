import React, { useEffect, useRef, useState } from "react"

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
        return [{ x: prev.length ? prev[prev.length - 1].x + 5 : 0, y: parseFloat((Math.random() * 100).toFixed(2)) }]
      })
      console.log(data)
    }, 5000)
  }

  const stopRecording = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [])

  return (
    <>
      <div>DataRecorder</div>
      <button className="text-amber-100" onClick={startRecording}>start</button>
      <button className="text-amber-100" onClick={stopRecording}>stop</button>
    </>
  )
}

export default DataRecorder