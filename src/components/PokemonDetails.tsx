import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

export interface RouteParams {
	name: string;
}

interface PokemonAbilityResponse {
	ability: {
		name: string;
		url: string;
	};
}

interface PokemonStats {
	weight: number;
	height: number;
	abilities: string[];
}

const fetchPokemonStats = async (pokemonName: string) => {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
	return res.json();
};

export default function PokemonDetails() {
	const route = useRoute();
	const { name } = route.params as RouteParams;

	const [pokemonData, setPokemonData] = useState<PokemonStats | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		setIsLoading(true);
		fetchPokemonStats(name).then((data) => {
			setPokemonData({
				weight: data.weight,
				height: data.height,
				abilities: data.abilities.map((ability: PokemonAbilityResponse) => ability.ability.name),
			});
		});
		setIsLoading(false);
	}, []);

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
