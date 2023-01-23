// import { Habit } from './components/Habit'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTables } from './components/SummaryTable'
import './styles/global.css'
import { useState } from 'react'


interface Summary {
  id: string
  date: string
  completed: number
  amount: number
}

export function App() {
  const [summary, setSummary] = useState<Summary[]>([])

  function changeSummary(newSummary: Summary[]){
    setSummary(newSummary)
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header 
          onChangeSummary={changeSummary}
        />
        <SummaryTables 
          summary={summary}
          onChangeSummary={changeSummary}

        />
      </div>

    </div>
  )
}


