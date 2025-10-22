import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteParams } from "./PokemonDetails";
import { useQuery } from "@tanstack/react-query";

interface PokemonListItemProps {
	name: string;
}

const fetchPokemon = async (pokemonName: string) => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
	return res.json();
};

export default function PokemonListItem({ name }: PokemonListItemProps) {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

	const { data: spriteUrl } = useQuery({
		queryKey: ["pokemonSprites", name],
		queryFn: async () => {
			const data = await fetchPokemon(name);
			return data.sprites.front_default;
		},
	});

	return (
		spriteUrl && (
			<TouchableOpacity
				onPress={() => navigation.navigate("PokemonDetails", { name } as RouteParams)}
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
