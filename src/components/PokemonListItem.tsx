import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface PokemonListItemProps {
	name: string;
}

export default function PokemonListItem({ name }: PokemonListItemProps) {
	const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
	return (
		<TouchableOpacity onPress={() => navigation.navigate("PokemonDetails")}>
			<View style={styles.listItem}>
				<Text style={styles.text}>Name: {name}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	listItem: {},
	text: {
		fontSize: 18,
	},
});
