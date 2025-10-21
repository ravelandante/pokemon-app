import { StyleSheet, View, FlatList, Text, ActivityIndicator } from "react-native";
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
			getNextPageParam: (lastPage) => {
				const url = new URL(lastPage.next);
				return parseInt(url.searchParams.get("offset") || "0");
			},
		});

	return (
		<View style={styles.container}>
			<FlatList
				data={data?.pages.flatMap((page) => page.results)}
				renderItem={({ item }) => <PokemonListItem name={item.name} />}
				keyExtractor={(item) => item.name}
				style={styles.pokemonList}
				onEndReached={() => {
					if (hasNextPage && !isFetchingNextPage) {
						fetchNextPage();
					}
				}}
			/>
			<ActivityIndicator size={"large"} animating={isFetching} style={styles.spinner} />
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
	},
	spinner: {
		marginVertical: 20,
	},
});
