import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"
import { generateDatesFromYearsBeginning } from "../../utils/generate-dates-from-year-biginning"
import { HabitDay } from "../HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearsBeginning()

const minimumSummaryDatesSize = 18 * 7 //18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

interface Summary {
  id: string
  date: string
  completed: number
  amount: number
}

interface SummaryTableProps{
  summary: Summary[]
  onChangeSummary: (summary: Summary[]) => void
}

export function SummaryTables({summary, onChangeSummary}: SummaryTableProps) {


  useEffect(() => {
    api.get('/summary').then((response) => {
      onChangeSummary(response.data)
    })
  }, [])

  console.log(summary)


  return (
    <div className="w-full flex ">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((weekDay, index) => {
            return (
              <div
                key={`${weekDay}-${index}`}
                className="text-zinc-400 text-xl w-10 h-10 font-bold flex items-center justify-center">
                {weekDay}
              </div>
            )
          })
        }
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3 ">
        { 
          summaryDates.map(date => {
            let dayInSummary
            if(summary.length > 0){
              dayInSummary = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
              })

            }
            return (
              <HabitDay
                key={`${date}`}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
                onChangeSummary={onChangeSummary}

              />
            )
          })
        }
        {
          amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-10 h10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            )
          })
        }
      </div>
    </div>
  )
}