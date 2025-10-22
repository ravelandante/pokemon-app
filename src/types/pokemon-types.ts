export interface PokemonDetailsResponse {
	name: string;
	id: number;
	weight: number;
	height: number;
	abilities: PokemonAbilityResponse[];
	sprites: {
		front_default: string;
	};
}

export interface PokemonAbilityResponse {
	ability: {
		name: string;
		url: string;
	};
}

export interface ListToDetailsRouteParams {
	id: number;
}
