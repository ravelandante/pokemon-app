import { StyleSheet, View, FlatList } from "react-native";
import pokemonList from "../../assets/kanto.json";
import PokemonListItem from "./PokemonListItem";

export default function Pokedex() {
	return (
		<View style={styles.container}>
			<FlatList
				data={pokemonList}
				renderItem={({ item }) => <PokemonListItem name={item.name} />}
				keyExtractor={(item) => item.id.toString()}
				style={styles.pokemonList}
				contentContainerStyle={styles.pokemonListContainer}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	pokemonList: {
		width: "100%",
		padding: 20,
	},
	pokemonListContainer: {
		gap: 20,
	},
});
