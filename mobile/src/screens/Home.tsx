import { Text, View, ScrollView, Alert } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates'

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { useCallback, useState } from "react";
import { api } from "../lib/axios";
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S',]
const datesFromYearStart = generateRangeDatesFromYearStart()

const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

interface Summary {
  amount: number
  completed: number
  date: string
  id: string
}

export function Home() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<Summary[]>([])
  const { navigate } = useNavigation()


  async function fetchData() {
    try {
      setLoading(true)
      const response = await api.get('/summary')

      setSummary(response.data)
    } catch (err) {
      Alert.alert('Oops', 'Não foi possível carregar os hábitos ;-;')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if (loading) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16 ">
      <Header />
      <View
        className="flex-row mt-6 mb-2 "
      >
        {
          weekDays.map((weekDay, i) => (
            <Text
              key={i}
              className="text-zinc-400 text-xl font-bold text-center mx-1 "
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {
            datesFromYearStart.map(date => {
              const dayWithHabits = summary.find(day => {
                return dayjs(date).isSame(day.date, 'day')
              })
              return (
                <HabitDay
                  key={date.toISOString()}
                  amount={dayWithHabits?.amount}
                  completed={dayWithHabits?.completed}
                  date={date}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                />
              )
            })
          }

          {
            amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, i) => (
                <View
                  className="bg-zinc-900 rounded-lg border-2 border-zinc-800 m-1 opacity-40"
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  key={i}
                />
              ))
          }
        </View>
      </ScrollView>
    </View>
  )
}