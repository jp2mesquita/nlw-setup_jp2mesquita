import { Alert, ScrollView, Text, View } from "react-native"
import { useRoute } from "@react-navigation/native"
import dayjs from "dayjs"
import clsx from "clsx"
import { BackButton } from "../components/Backbutton"
import { ProgressBar } from "../components/ProgressBar"
import { Checkbox } from "../components/Checkbox"
import { useEffect, useState } from "react"
import { Loading } from "../components/Loading"
import { api } from "../lib/axios"
import { generateProgressPercentage } from "../utils/generate-progress-percentage"
import { HabitsEmpty } from "../components/HabitsEmpty"

interface Params {
  date: string
}

interface DayInfoProps {
  completedHabits: string[]
  possibleHabits: Array<{
    id: string,
    created_at: string,
    title: string,
  }>
}

export function Habit() {
  const [loading, setLoading] = useState(false)
  const [dayInfo, setDayInfo] = useState<DayInfoProps>({ completedHabits: [], possibleHabits: [] })
  const route = useRoute();
  const { date } = route.params as Params

  const isDatePast = dayjs(date).endOf('day').isBefore(new Date())
  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const percentage = dayInfo.possibleHabits.length > 0
    ? generateProgressPercentage(dayInfo.possibleHabits.length, dayInfo.completedHabits.length)
    : 0

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', {
        params: { date }
      })
      setDayInfo(response.data)
    } catch (err) {
      console.log(err)
      Alert.alert('	(;;;*_*)', 'Não foi possível carregar os hábitos')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabits(habitId: string) {
    const isHabitCompleted = dayInfo.completedHabits.includes(habitId)
    let completedHabits: string[] = []
    if (isHabitCompleted) {
      completedHabits = dayInfo.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...dayInfo.completedHabits, habitId]
    }
    setDayInfo({
      possibleHabits: dayInfo.possibleHabits,
      completedHabits
    })
    try {
      await api.patch(`/habits/${habitId}/toggle`)
    } catch (err) {
      console.log(err)
      Alert.alert('	(x_x)', 'Não foi possível atualizar o status do hábito')
    }

  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text
          className=" text-zinc-400 mt-6 font-semibold text-base lowercase "
        >
          {dayOfWeek}
        </Text>
        <Text
          className=" text-white  font-extrabold text-3xl "
        >
          {dayAndMonth}
        </Text>
        <ProgressBar progress={percentage} />

        <View className={clsx(" mt-6", {
          ["opacity-50"]: isDatePast,
        })}>
          {
            dayInfo.possibleHabits.length > 0
              ? dayInfo.possibleHabits.map(habit => {
                return (
                  <Checkbox
                    key={habit.id}
                    title={habit.title}
                    checked={dayInfo.completedHabits.includes(habit.id)}
                    disabled={isDatePast}
                    onPress={() => handleToggleHabits(habit.id)}
                  />
                )
              })
              : <HabitsEmpty />
          }
        </View>
        {
          isDatePast &&
          <View>
            <Text
              className=" text-white mt-10 text-center"
            >
              (⌒_⌒;)
            </Text>
            <Text
              className=" text-zinc-400 mt-3 text-justify"
            >
              Não, não ,não. Você não pode editar um habito de uma data passada!
            </Text>
          </View>
        }

      </ScrollView>
    </View>
  )
}