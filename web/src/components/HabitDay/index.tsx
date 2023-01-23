import clsx from 'clsx';
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './components/ProgressBar';

import dayjs from 'dayjs';
import { HabitsList } from './components/HabitsList';
import { useState } from 'react';

interface Summary {
  id: string
  date: string
  completed: number
  amount: number
}

interface HabitsProps {
  defaultCompleted?: number
  amount?: number
  date: Date
  onChangeSummary: (summary: Summary[]) => void
}

export function HabitDay({ defaultCompleted = 0, amount = 0, date, onChangeSummary }: HabitsProps) {

  const [completed, setCompleted] = useState(defaultCompleted)

  const progressPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0
  const dayAndMonth = dayjs(date).format('DD/MM')
  const dayOfWeek = dayjs(date).format('dddd')

  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  function handleCompletedChanged(completed: number) {
    setCompleted(completed)
  }

  return (
    <Popover.Root >
      <Popover.Trigger
        className={clsx('w-10 h10 border-2  rounded-lg hover:opacity-70  transition-all focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background  ', {
          [' bg-zinc-900 border-zinc-800']: progressPercentage === 0,
          ['bg-violet-900 border-violet-800']: progressPercentage > 0 && progressPercentage < 20,
          ['bg-violet-800 border-violet-700']: progressPercentage >= 20 && progressPercentage < 40,
          ['bg-violet-700 border-violet-600']: progressPercentage >= 40 && progressPercentage < 60,
          ['bg-violet-600 border-violet-500']: progressPercentage >= 60 && progressPercentage < 80,
          ['bg-violet-500 border-violet-400']: progressPercentage >= 80,
          ['border-white border-3']: isCurrentDay,
        })}
      />
      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background" >
          <span className="font-semibold text-zinc-400 capitalize">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl ">{dayAndMonth}</span>
          <ProgressBar progress={progressPercentage} />
          <HabitsList 
            date={date} 
            onCompletedChanged={handleCompletedChanged}
            onChangeSummary={onChangeSummary} 
          />


          <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}