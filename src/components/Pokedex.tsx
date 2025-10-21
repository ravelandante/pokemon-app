import { StyleSheet, View, FlatList, Text } from "react-native";
import pokemonList from "../../assets/kanto.json";
import PokemonListItem from "./PokemonListItem";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPokemon = async ({ pageParam }: { pageParam: number }) => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=" + pageParam);
	return res.json();
};

export default function Pokedex() {
	const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
		useInfiniteQuery({
			queryKey: ["pokemon"],
			queryFn: fetchPokemon,
			initialPageParam: 0,
			getNextPageParam: (lastPage) => lastPage.offset,
		});

	return (
		<View style={styles.container}>
			<FlatList
				data={data?.pages.flatMap((page) => page.results)}
				renderItem={({ item }) => <PokemonListItem name={item.name} />}
				keyExtractor={(item) => item.name}
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
