import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

export interface RouteParams {
	name: string;
}

export default function PokemonDetails() {
	const route = useRoute();
	const { name } = route.params as RouteParams;

	return (
		<View>
			<Text>Pokemon Details</Text>
			<Text>Name: {name}</Text>
		</View>
	);
}
