import { StyleSheet, Text, View } from "react-native";

interface PokemonListItemProps {
	name: string;
}

export default function PokemonListItem({ name }: PokemonListItemProps) {
	return (
		<View>
			<Text>Name: {name}</Text>
		</View>
	);
}
