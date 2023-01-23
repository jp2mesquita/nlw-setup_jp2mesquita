import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../lib/axios";

const allWeekDays = ["Domingo", "Segunda-feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"]

interface Summary {
  id: string
  date: string
  completed: number
  amount: number
}

interface SummaryTableProps{

  onChangeSummary: (summary: Summary[]) => void
}


export function NewHabitForm({onChangeSummary}: SummaryTableProps) {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  async function fetchSummary(){
    const newSummary = await api.get('/summary')

    onChangeSummary(newSummary.data)
  }

  async function handleNewHabit(event: FormEvent) {
    event.preventDefault()
    if (!title || weekDays.length === 0) {
      return
    }
    await api.post('/habits', {
      title,
      weekDays,
    })

    fetchSummary()

    setTitle('')
    setWeekDays([])

    alert('Hábito criado com sucesso')
  }

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(state => state.filter(day => day !== weekDayIndex))
    } else
      setWeekDays(state => [...state, weekDayIndex].sort())
  }

  return (
    <form onSubmit={handleNewHabit} className="w-full flex flex-col mt-6 ">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>
      <input
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
        type="text"
        id="title"
        placeholder="ex.: Fazer exercícios, dormir bem, etc"
        autoFocus
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>
      <div className="flex flex-col gap-2 mt-3">
        {allWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="flex items-center gap-3 group focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors  group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"

              >
                <Checkbox.Indicator >
                  <Check
                    size={20}
                    className="text-white "
                    weight='bold'
                  />
                </Checkbox.Indicator>
              </div>
              <span className=" text-white leading-tight ">
                {weekDay}
              </span>
            </Checkbox.Root>
          )
        })}

      </div>
      <button
        type="submit"
        className=" mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>

    </form>
  )
}