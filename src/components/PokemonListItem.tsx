import { StyleSheet, Text, View } from "react-native";

interface PokemonListItemProps {
	name: string;
}

export default function PokemonListItem({ name }: PokemonListItemProps) {
	return (
		<View style={styles.listItem}>
			<Text style={styles.text}>Name: {name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {},
	text: {
		fontSize: 18,
	},
});
