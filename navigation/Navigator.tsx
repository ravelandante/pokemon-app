import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import Pokedex from "../src/components/Pokedex";

const RootStack = createNativeStackNavigator({
	screens: {
		Pokedex: Pokedex,
	},
});

export default createStaticNavigation(RootStack);
