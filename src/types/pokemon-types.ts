export interface PokemonDetailsResponse {
	name: string;
	id: number;
	weight: number;
	height: number;
	abilities: PokemonAbilityResponse[];
	sprites: {
		front_default: string;
		front_shiny: string;
		front_female: string;
		front_shiny_female: string;
		back_default: string;
		back_shiny: string;
		back_female: string;
		back_shiny_female: string;
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
