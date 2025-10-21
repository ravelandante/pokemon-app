import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Pokedex from "../src/components/Pokedex";
import PokemonDetails from "../src/components/PokemonDetails";

const RootStack = createNativeStackNavigator({
	screens: {
		Pokedex: {
			screen: Pokedex,
		},
		PokemonDetails: {
			screen: PokemonDetails,
			options: {
				title: "Pokemon Details",
			},
		},
	},
});

export default createStaticNavigation(RootStack);
