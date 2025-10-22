import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetailsResponse } from "../types/pokemon-types";
import { ListToDetailsRouteParams } from "../types/pokemon-types";

interface PokemonListItemProps {
	name: string;
	url: string;
}

const fetchPokemon = async (pokemonUrl: string) => {
	const res = await fetch(pokemonUrl);
	return res.json();
};

export default function PokemonListItem({ name, url }: PokemonListItemProps) {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	const { data: pokemonData } = useQuery({
		queryKey: ["pokemonInfo", url],
		queryFn: () => fetchPokemon(url),
		select: (data: PokemonDetailsResponse) => data,
	});

	const spriteUrl = pokemonData?.sprites.front_default;
	const pokemonId = pokemonData?.id;

	return (
		spriteUrl && (
			<TouchableOpacity
				onPress={() =>
					navigation.navigate("PokemonDetails", { id: pokemonId } as ListToDetailsRouteParams)
				}
			>
				<View style={styles.container}>
					<Text style={styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
					<Image source={{ uri: spriteUrl }} style={styles.sprite} />
				</View>
			</TouchableOpacity>
		)
	);
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: "#000",
		borderBottomWidth: 1,
		padding: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 18,
	},
	sprite: {
		width: 50,
		height: 50,
	},
});
