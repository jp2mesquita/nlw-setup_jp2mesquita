// import { Habit } from './components/Habit'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTables } from './components/SummaryTable'
import './styles/global.css'





export function App() {


  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        <Header />
        <SummaryTables />
      </div>

    </div>
  )
}


