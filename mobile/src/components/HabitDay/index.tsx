import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity, Dimensions, TouchableOpacityProps } from "react-native";
import { generateProgressPercentage } from "../../utils/generate-progress-percentage";

const WEEK_DAYS = 7
const SCREEN_HORIZONTA_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8;
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTA_PADDING + 5);

interface Props extends TouchableOpacityProps {
  amount?: number
  completed?: number
  date: Date
}

export function HabitDay({ amount = 0, completed = 0, date, ...rest }: Props) {

  const habitsPercentage = amount > 0 ? generateProgressPercentage(amount, completed) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)
  return (
    <TouchableOpacity
      className={clsx(" rounded-lg border-2  m-1 ", {
        ["bg-zinc-900 border-zinc-800"]: habitsPercentage === 0,
        ["bg-violet-900 border-violet-800"]: habitsPercentage > 0 && habitsPercentage < 20,
        ["bg-violet-800 border-violet-700"]: habitsPercentage >= 20 && habitsPercentage < 40,
        ["bg-violet-700 border-violet-600"]: habitsPercentage >= 40 && habitsPercentage < 60,
        ["bg-violet-600 border-violet-500"]: habitsPercentage >= 60 && habitsPercentage < 80,
        ["bg-violet-500 border-violet-500"]: habitsPercentage >= 80,
        ["border-violet-300 border-3 "]: isCurrentDay
      })}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}