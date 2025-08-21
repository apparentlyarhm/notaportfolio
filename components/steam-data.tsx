import { codestuff, nunito } from "@/config/fonts";
import { Spinner } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, ArrowRightCircle, ArrowUpRight } from "react-feather";

const formatPlaytime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
};

export const SteamComponent = ({ isMobile }: { isMobile: boolean }) => {
    const [steamData, setSteamData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchSteamData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/steam?type=all`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setSteamData(data);

            } catch (err) {
                setError(err.message);

            } finally {
                setIsLoading(false);

            }
        };

        fetchSteamData();
    }, []);

    if (isLoading) {
        return (
            <>
                <div className={clsx("px-2 text-center text-xs border-1 w-full items-center text-slate-400 min-h-[200px] flex flex-col gap-5 hover:bg-slate-100 rounded-xl cursor-wait justify-center", codestuff.className)}>
                    <p>Fetching steam data...</p>
                    {/* Im VERY conflicted between default vs wave spinner */}
                    <Spinner color="primary" className="" />
                </div>

                <br /><br />
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className={clsx("px-2 text-center items-center text-xs text-red-400 min-h-[200px] flex flex-col gap-5 border-1 border-red-600 bg-red-100 rounded-xl justify-center", codestuff.className)}>
                    <AlertCircle className="text-red-500" size={20} />
                    <p className="">Failed to load Steam data.</p>

                </div>
                
                <br /><br />
            </>

        );
    }

    return (
        <div className={clsx("max-w-4xl mx-auto p-4 md:p-8 space-y-12", nunito.className)}>
            {steamData?.profile && <SteamProfile profile={steamData.profile} />}
            {steamData?.recent && <SteamRecentActivity data={steamData.recent} isMobile={isMobile} />}
            {/* {steamData?.games && <SteamOwnedGames data={steamData.games} isMobile={isMobile} />} */}
            <br />
        </div>
    );
}

const SteamProfile = ({ profile }) => {
    if (!profile) return null;

    const stateValue = profile.status.state ?? 0;
    const personaStateMap = {
        0: "Offline",
        1: "Online",
        2: "Busy",
        3: "Away",
        4: "Snooze",
        5: "Looking to trade",
        6: "Looking to play",
    };
    const statusText = personaStateMap[stateValue].toLowerCase();

    const getStatusTheme = () => {
        const isInGame = profile.status.inGame;

        if (isInGame) {
            return {
                cardBg: "bg-gradient-to-r from-green-200 to-emerald-200",
                borderColor: "border-green-400",
                statusRing: "ring-emerald-700",
                textColor: "text-emerald-700",
            };
        }

        switch (statusText) {
            case "online":
                return {
                    cardBg: "bg-gradient-to-r from-sky-100 to-sky-200",
                    borderColor: "border-sky-400",
                    statusRing: "ring-sky-700",
                    textColor: "text-sky-700",
                };

            case "away":
            case "snooze":
                return {
                    cardBg: "bg-gradient-to-r from-slate-200 to-amber-200",
                    borderColor: "border-amber-400",
                    statusRing: "ring-amber-400",
                    textColor: "text-slate-200",
                };

            case "offline":
            default:
                return {
                    cardBg: "bg-gradient-to-r from-slate-100 to-slate-300",
                    borderColor: "border-slate-500",
                    statusRing: "ring-slate-500",
                    textColor: "text-slate-700",
                };
        }
    };

    const theme = getStatusTheme();
    const memberSince = new Date(profile.timeCreated * 1000).toDateString();

    return (
        <div
            onClick={() => window.open(profile.profileUrl, "_blank")}
            className={`w-full rounded-2xl border ${theme.borderColor} ${theme.cardBg} duration-500 hover:opacity-60 hover:cursor-pointer py-5`}
        >
            <div
                className={`w-full h-full p-6 rounded-xl flex items-center space-x-6 ${theme.overlay || ""} flex justify-around group`}
            >
                {/* Avatar with Status Ring */}
                <div
                    className={`relative flex-shrink-0 ring-4 ${theme.statusRing} rounded-full`}
                >
                    <img
                        src={profile.avatarFull}
                        alt={profile.personaName}
                        className="w-24 h-24 rounded-full"
                    />
                </div>

                {/* User Info */}
                <div className={`flex flex-col items-start ${theme.textColor}`}>
                    <h2 className="text-4xl font-black">{profile.personaName}</h2>

                    <p className="text-lg font-semibold mt-1">
                        {profile.status.inGame
                            ? `Playing: ${profile.status.game}`
                            : statusText}
                    </p>
                    
                    <p className={clsx("text-xs opacity-80", codestuff.className)}>member since {memberSince}</p>
                </div>

                {/* Game Preview (if in-game) */}
                {profile.status.inGame && (
                    <div className="hidden md:block w-64">
                        <img
                            src={`https://cdn.akamai.steamstatic.com/steam/apps/${profile.status.gameId}/header.jpg`}
                            alt={profile.status.game}
                            className="rounded-lg"
                        />
                    </div>
                )}
                
            </div>
        </div>
    );
};


const SteamRecentActivity = ({ isMobile, data }: { isMobile: boolean, data: any }) => {
    if (!data) return null;

    if (data.totalCount === 0) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                <p className="text-slate-400">{data.message}</p>
            </div>

        )
    }

    return (
        <div>
            <h2 className="text-lg sm:text-3xl font-black text-black mb-4">Recent Activity</h2>

            <div className="flex justify-around py-5 px-5 border-1 rounded-2xl space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">

                {data.games.map(game => (
                    <div key={game.appid} className="flex-shrink-0 w-64 rounded-lg shadow-md overflow-hidden group">

                        <div
                            style={{ backgroundImage: `url(https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg)` }}
                            className="h-48 bg-cover bg-center relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-3 text-white">
                                <h3 className="font-bold truncate">{game.name}</h3>
                                <p className="text-sm font-semibold text-green-400">
                                    {formatPlaytime(game.playtime_2weeks)} in last 2 weeks
                                </p>
                            </div>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    );

}

const SteamOwnedGames = ({ isMobile, data }: { isMobile: boolean, data: any }) => {
    if (!data) return null;

    // Placeholder Logic
    const placeholderMessage = isMobile
        ? "A simplified, searchable list of games will be displayed here."
        : "An interactive Treemap visualization of the entire game library will be displayed here.";

    return (
        <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
                Full Library ({data.gameCount} Games)
            </h2>

            <div className="p-8 bg-slate-800 rounded-lg border-2 border-dashed border-slate-600 text-center">
                <p className="text-slate-400">{placeholderMessage}</p>
                <p className="text-sm text-slate-500 mt-2">(Development in progress)</p>
            </div>

        </div>
    );
}