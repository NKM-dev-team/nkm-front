// export const MAPS_API_URL = "https://krzysztofruczkowski.pl:8080/api/maps";

export const API_URL = "https://localhost:8080/api";
export const MAPS_API_URL = `${API_URL}/maps`;
export const GET_LOBBIES_URL = `${API_URL}/lobbies`;
export const GET_LOBBY_URL = (lobbyId: string) => `${API_URL}/lobby/${lobbyId}`;
export const CREATE_LOBBY_URL = `${API_URL}/create_lobby`;
export const JOIN_LOBBY_URL = `${API_URL}/join_lobby`;
export const LEAVE_LOBBY_URL = `${API_URL}/leave_lobby`;
export const SET_HEXMAP_URL = `${API_URL}/set_hexmap`;
export const SET_PICK_TYPE_URL = `${API_URL}/set_pick_type`;
export const SET_NUMBER_OF_BANS_URL = `${API_URL}/set_number_of_bans`;
export const SET_NUMBER_OF_CHARACTERS_URL = `${API_URL}/set_number_of_characters`;
export const START_GAME_URL = `${API_URL}/start_game`;
export const LOGIN_URL = `${API_URL}/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const SECRET_URL = `${API_URL}/secret`;
