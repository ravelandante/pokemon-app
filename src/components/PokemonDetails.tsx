import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

export interface RouteParams {
	id: number;
}

interface PokemonAbilityResponse {
	ability: {
		name: string;
		url: string;
	};
}

const fetchPokemonStats = async (pokemonUrl: string) => {
	const res = await fetch(pokemonUrl);
	return res.json();
};

export default function PokemonDetails() {
	const route = useRoute();
	const { id } = route.params as RouteParams;
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

	const { data: pokemonData, isLoading } = useQuery({
		queryKey: ["pokemonInfo", pokemonUrl],
		queryFn: () => fetchPokemonStats(pokemonUrl),
		select: (data: any) => ({
			name: data.name,
			weight: data.weight,
			height: data.height,
			abilities: data.abilities.map((ability: PokemonAbilityResponse) => ability.ability.name),
			sprites: data.sprites,
		}),
	});

	return (
		<View>
			<Text>Pokemon Details</Text>
			{isLoading || !pokemonData ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Text>Name: {pokemonData.name}</Text>
					<Text>Weight: {pokemonData.weight}</Text>
					<Text>Height: {pokemonData.height}</Text>
					<Text>Abilities: {pokemonData.abilities.join(", ")}</Text>
				</>
			)}
		</View>
	);
}
