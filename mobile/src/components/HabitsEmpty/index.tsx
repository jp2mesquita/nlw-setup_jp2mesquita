import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

export function HabitsEmpty() {
  const { navigate } = useNavigation()
  return (
    <View>
      <Text
        className=" mt-10 text-white text-base text-center"
      >
        (•ิ_•ิ)?
      </Text>
      <Text
        className=" text-zinc-400 text-base mt-3"
      >
        OH Não! Você ainda não tem nenhum hábito cadastrado {' '}
        <Text
          className=" text-violet-400 text-base underline active:text-violet-300 transition-colors"
          onPress={() => navigate('new')}
        >
          comece cadastrando um.
        </Text>
      </Text>

    </View>

  )
}