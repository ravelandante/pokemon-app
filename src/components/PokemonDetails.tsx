import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

export interface RouteParams {
	name: string;
}

interface PokemonAbilityResponse {
	ability: {
		name: string;
		url: string;
	};
}

const fetchPokemonStats = async (pokemonName: string) => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
	return res.json();
};

export default function PokemonDetails() {
	const route = useRoute();
	const { name } = route.params as RouteParams;

	const { data: pokemonData, isLoading } = useQuery({
		queryKey: ["pokemonStats", name],
		queryFn: async () => {
			const data = await fetchPokemonStats(name);
			return {
				weight: data.weight,
				height: data.height,
				abilities: data.abilities.map((ability: PokemonAbilityResponse) => ability.ability.name),
			};
		},
	});

	return (
		<View>
			<Text>Pokemon Details</Text>
			<Text>Name: {name}</Text>
			{isLoading || !pokemonData ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Text>Weight: {pokemonData.weight}</Text>
					<Text>Height: {pokemonData.height}</Text>
					<Text>Abilities: {pokemonData.abilities.join(", ")}</Text>
				</>
			)}
		</View>
	);
}
