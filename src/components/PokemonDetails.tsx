import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	ActivityIndicator,
	Image,
	TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { PokemonDetailsResponse, PokemonAbilityResponse, Sprite } from "../types/pokemon-types";
import { ListToDetailsRouteParams } from "../types/pokemon-types";
import { useState } from "react";

const fetchPokemonStats = async (pokemonUrl: string) => {
	const res = await fetch(pokemonUrl);
	return res.json();
};

export default function PokemonDetails() {
	const route = useRoute();
	const { id } = route.params as ListToDetailsRouteParams;
	const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

	const [currentSpriteIndex, setCurrentSpriteIndex] = useState(0);

	const {
		data: pokemonData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["pokemonInfo", pokemonUrl],
		queryFn: () => fetchPokemonStats(pokemonUrl),
		select: (data: PokemonDetailsResponse) => ({
			name: data.name,
			weight: data.weight,
			height: data.height,
			abilities: data.abilities.map((ability: PokemonAbilityResponse) => ability.ability.name),
			sprites: data.sprites,
		}),
	});

	const availableSprites = [
		{
			key: "front_default",
			url: pokemonData?.sprites["front_default"],
			displayName: "Front Default",
		},
		{
			key: "back_default",
			url: pokemonData?.sprites["back_default"],
			displayName: "Back Default",
		},
		{
			key: "front_shiny",
			url: pokemonData?.sprites["front_shiny"],
			displayName: "Front Shiny",
		},
		{
			key: "back_shiny",
			url: pokemonData?.sprites["back_shiny"],
			displayName: "Back Shiny",
		},
		{
			key: "front_female",
			url: pokemonData?.sprites["front_female"],
			displayName: "Front Female Default",
		},
		{
			key: "back_female",
			url: pokemonData?.sprites["back_female"],
			displayName: "Back Female Default",
		},
		{
			key: "front_shiny_female",
			url: pokemonData?.sprites["front_shiny_female"],
			displayName: "Front Female Shiny",
		},
		{
			key: "back_shiny_female",
			url: pokemonData?.sprites["back_shiny_female"],
			displayName: "Back Female Shiny",
		},
	].filter((sprite) => sprite.url !== null) as Sprite[];

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
			{error ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorIcon}>⚠️</Text>
					<Text style={styles.errorText}>Failed to fetch Pokemon details</Text>
				</View>
			) : isLoading || !pokemonData ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator size="large" color="#4A90E2" />
					<Text style={styles.loadingText}>Loading Pokemon details...</Text>
				</View>
			) : (
				<>
					<View style={styles.headerSection}>
						<TouchableOpacity
							onPress={() => {
								setCurrentSpriteIndex((currentSpriteIndex + 1) % availableSprites.length);
							}}
						>
							<View style={styles.pokemonImageContainer}>
								{availableSprites.length > 0 && (
									<Image
										source={{
											uri: availableSprites[currentSpriteIndex].url ?? "",
										}}
										style={styles.pokemonImage}
										resizeMode="contain"
									/>
								)}
							</View>
						</TouchableOpacity>
						<Text style={styles.pokemonName}>
							{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
						</Text>
						<Text style={styles.spriteType}>
							{availableSprites[currentSpriteIndex].displayName}
						</Text>
					</View>

					<View style={styles.statsSection}>
						<Text style={styles.sectionTitle}>Stats</Text>
						<View style={styles.statsGrid}>
							<View style={styles.statCard}>
								<Text style={styles.statIcon}>⚖️</Text>
								<Text style={styles.statLabel}>Weight</Text>
								<Text style={styles.statValue}>{pokemonData.weight / 10} kg</Text>
							</View>
							<View style={styles.statCard}>
								<Text style={styles.statIcon}>📏</Text>
								<Text style={styles.statLabel}>Height</Text>
								<Text style={styles.statValue}>{pokemonData.height / 10} m</Text>
							</View>
						</View>
					</View>

					<View style={styles.abilitiesSection}>
						<Text style={styles.sectionTitle}>Abilities</Text>
						<View style={styles.abilitiesContainer}>
							{pokemonData.abilities.map((ability, index) => (
								<View key={index} style={styles.abilityCard}>
									<Text style={styles.abilityText}>
										{ability.charAt(0).toUpperCase() + ability.slice(1)}
									</Text>
								</View>
							))}
						</View>
					</View>
				</>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f8f9fa",
	},
	contentContainer: {
		paddingBottom: 30,
	},

	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 60,
	},
	loadingText: {
		fontSize: 16,
		color: "#6c757d",
		marginTop: 16,
		fontWeight: "500",
	},

	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 60,
		paddingHorizontal: 20,
	},
	errorIcon: {
		fontSize: 48,
		marginBottom: 16,
	},
	errorText: {
		fontSize: 16,
		color: "#6c757d",
		textAlign: "center",
		lineHeight: 24,
	},

	headerSection: {
		backgroundColor: "#fff",
		alignItems: "center",
		paddingVertical: 30,
		paddingHorizontal: 20,
		marginHorizontal: 16,
		marginTop: 16,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 8,
	},
	pokemonImageContainer: {
		width: 120,
		height: 120,
		backgroundColor: "#f8f9fa",
		borderRadius: 60,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
		borderWidth: 3,
		borderColor: "#e9ecef",
	},
	pokemonImage: {
		width: 100,
		height: 100,
	},
	pokemonName: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#2c3e50",
		textAlign: "center",
	},
	spriteType: {
		fontSize: 14,
		color: "#375776ff",
		textAlign: "center",
	},

	statsSection: {
		marginHorizontal: 16,
		marginTop: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#2c3e50",
		marginBottom: 16,
		paddingLeft: 4,
	},
	statsGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 12,
	},
	statCard: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 16,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	statIcon: {
		fontSize: 32,
		marginBottom: 8,
	},
	statLabel: {
		fontSize: 14,
		color: "#6c757d",
		fontWeight: "500",
		marginBottom: 4,
	},
	statValue: {
		fontSize: 18,
		fontWeight: "bold",
	},

	abilitiesSection: {
		marginHorizontal: 16,
		marginTop: 20,
	},
	abilitiesContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	abilityCard: {
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 3,
	},
	abilityText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#2c3e50",
	},
});
