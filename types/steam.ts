// NOTE: these are ai generated, i was too lazy


// --- Profile Data Types ---

// The shape of the 'status' object within a player's profile
export interface SteamStatus {
    state: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    inGame: boolean;
    game: string | null;
    gameId: string | null;
}

// The shape of a single player object inside the 'players' array
export interface SteamPlayer {
    personaName: string;
    lastLogoff: number;
    avatar: string;
    avatarMedium: string;
    avatarFull: string;
    profileUrl: string;
    timeCreated: number;
    status: SteamStatus;
}


// --- Recent Games Data Types ---

// The shape of a single game in the recently played list
export interface RecentGame {
    appid: number;
    name: string;
    playtime_2weeks: number;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    img_icon_url: string;
}

// The shape of the response from the /IPlayerService/GetRecentlyPlayedGames endpoint
export interface SteamRecentResponse {
    total_count: number;
    games: RecentGame[];
    message?: string; // The optional message for when there are no games
}


// --- Owned Games Data Types ---

// The shape of a single game in the owned games list
export interface OwnedGame {
    appid: number;
    name: string;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
    playtime_deck_forever: number;
    img_icon_url: string;
}

// The shape of the response from the /IPlayerService/GetOwnedGames endpoint
export interface SteamOwnedResponse {
    gameCount: number;
    games: OwnedGame[];
}


// --- The Final Combined Type for '?type=all' ---

// This is the most important type. It combines all the above types
// into the single object that our /steam?type=all endpoint returns.
export interface SteamAllData {
    profile: SteamPlayer;
    recent: SteamRecentResponse;
    games: SteamOwnedResponse;
}