import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "./PokemonDetails";

interface PokemonListItemProps {
	name: string;
}

export default function PokemonListItem({ name }: PokemonListItemProps) {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	return (
		<TouchableOpacity onPress={() => navigation.navigate("PokemonDetails", { name } as RouteParams)}>
			<View style={styles.container}>
				<Text style={styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		padding: 20,
	},
	text: {
		fontSize: 18,
	},
});
