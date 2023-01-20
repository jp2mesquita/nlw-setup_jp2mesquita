import { useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "tailwindcss/colors";
import { BackButton } from "../components/Backbutton";
import { Checkbox } from "../components/Checkbox";
import { Feather } from '@expo/vector-icons'
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New() {

  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function HandleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(state => state.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(state => [...state, weekDayIndex].sort())
    }
  }

  async function handleNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert('(μ_μ)', 'Favor preencha todos os campos')
      }
      await api.post('/habits', { title, weekDays })

      setTitle('')
      setWeekDays([])

      Alert.alert('(ﾉ◕ヮ◕)ﾉ', 'Hábito criado com sucesso')
    } catch (error) {
      console.log(error)
      Alert.alert('(ﾒ﹏ﾒ)', 'Não foi possível criar um novo hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-zinc-800 border-2 focus:border-green-600"
          cursorColor={colors.white}
          placeholder="ex.: Fazer exercícios, dormir, beber água"
          placeholderTextColor={colors.zinc[400]}
          onChangeText={setTitle}
          value={title}
        />
        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
        {
          availableWeekDays.map((weekDay, index) => {
            return (
              <Checkbox
                key={weekDay}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => HandleToggleWeekDay(index)}
              />
            )
          })
        }

        <TouchableOpacity
          className=" w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleNewHabit}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className=" font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}