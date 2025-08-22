import { codestuff, nunito } from "@/config/fonts";
import { Spinner } from "@heroui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { AlertCircle } from "react-feather";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import { OwnedGame, SteamAllData, SteamOwnedResponse, SteamPlayer, SteamRecentResponse } from '../types/steam';

// dont exactly know why this is needed
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const COLOR_PALETTE = [
    '#38bdf8', // sky-400
    '#4ade80', // green-400
    '#facc15', // yellow-400
    '#fb923c', // orange-400
    '#f87171', // red-400
    '#c084fc', // purple-400
    '#f472b6', // pink-400
    '#818cf8', // indigo-400
    '#2dd4bf', // teal-400
    '#a3e635', // lime-400
];

const formatHours = (minutes: number) => {
    return parseFloat((minutes / 60).toFixed(1));
}

export const MobileTopGamesChart = ({ games, isMobile }: { isMobile: boolean, games: OwnedGame[] }) => {

    const topGames = games
        .sort((a: any, b: any) => b.playtime_forever - a.playtime_forever)
        .slice(0, 10);

    let datasets;
    if (isMobile) {
        datasets = [{
            label: 'Hours Played',
            data: topGames.map(game => formatHours(game.playtime_forever)),
            backgroundColor: topGames.map((game, index) => COLOR_PALETTE[index % COLOR_PALETTE.length]),
            borderRadius: 4,
            borderWidth: 0
        }];
    } else {
        // Desktop version keeps the single, uniform color
        datasets = [{
            label: 'Hours Played',
            data: topGames.map(game => formatHours(game.playtime_forever)),
            backgroundColor: 'rgba(30, 201, 87, 0.2)',
            borderColor: 'rgba(30, 201, 87, 1)',
            borderWidth: 1
        }];
    }

    const chartData: ChartData<'bar'> = {
        labels: topGames.map(game => game.name), // Game names on the Y-axis
        datasets: datasets
    };

    const desktopOptions: ChartOptions<'bar'> = {
        indexAxis: 'y', // Horizontal bar chart

        elements: {
            bar: {
                borderRadius: Number.MAX_VALUE,
                borderWidth: 1
            },
        },

        responsive: true,
        maintainAspectRatio: true,

        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.parsed.x} hours`,
                }
            }
        },

        layout: {
            padding: {
                left: 40,
                right: 40,
                top: 20,
                bottom: 20
            }
        },


        scales: {
            x: {
                title: { display: true, text: 'Hours Played', color: '#94a3b8' },
                ticks: { color: '#000000' },
                grid: { display: false },

            },
            y: {
                ticks: { color: '#000000' },
                grid: { display: false },
            }
        }

    };

    const mobileOptions: ChartOptions<'bar'> = {
        indexAxis: 'x', // Vertical bar chart

        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (context) => ` ${context.parsed.y} hours`,
                }
            }
        },

        layout: {
            padding: {
                top: 20,
                right: 30,
                left: 10,
                bottom: 20
            }
        },

        scales: {
            x: {
                // --- Labels on the game axis are hidden ---
                ticks: { display: false },
                grid: { display: false },
            },
            y: {
                ticks: { color: '#000000' },
                grid: { color: 'rgba(0, 0, 0, 0.1)', offset: true }
            }
        }

    };

    const options = isMobile ? mobileOptions : desktopOptions;

    // Reverse the data back for the vertical chart and the legend
    const displayGames = isMobile ? topGames.slice() : topGames;

    return (
        <>
            <div className={clsx("hover:bg-gray-50 cursor-text border-1 py-3 rounded-2xl", isMobile ? "max-h-2xl" : "")}>
                <Bar options={options} data={chartData} />
            </div>

            {isMobile && (
                <div className="mt-6">
                    {displayGames.map((game, index) => (

                        <div key={game.appid} className="flex items-center justify-between text-sm p-2 rounded-md">
                            <div className="flex items-center gap-3">

                                <div
                                    className="w-4 h-4 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: COLOR_PALETTE[index % COLOR_PALETTE.length] }}
                                />

                                <span className="text-black font-medium truncate text-xs">{game.name}</span>

                            </div>
                            <span className="font-semibold text-xs text-green-400">{formatHours(game.playtime_forever)} hrs</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};


const formatPlaytime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
};

export const SteamComponent = ({ isMobile }: { isMobile: boolean }) => {
    const [steamData, setSteamData] = useState<SteamAllData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown | null>(null);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchSteamData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/steam?type=all`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json() as SteamAllData;
                setSteamData(data);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);

                } else {
                    setError("An unknown or unexpected error occurred.");
                }

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
                <div className={clsx("px-2 text-center items-center text-xs text-red-400 min-h-[200px] flex flex-col gap-5 border-1 border-red-600 rounded-xl justify-center", codestuff.className)}>
                    <AlertCircle className="text-red-500" size={20} />
                    <p className="">{`Failed to load Steam data :: ${error}`}</p>

                </div>

                <br /><br />
            </>

        );
    }

    return (
        <div className={clsx("flex flex-col items-center mx-auto p-4 md:p-8 space-y-12", nunito.className)}>
            {steamData?.profile && <SteamProfile profile={steamData.profile} />}
            {steamData?.recent && <SteamRecentActivity data={steamData.recent} isMobile={isMobile} />}
            {steamData?.games && <SteamOwnedGames data={steamData.games} isMobile={isMobile} />}
            <br />
        </div>
    );
}

type SteamProfileProps = {
    profile: SteamPlayer;
};

const SteamProfile = ({ profile }: SteamProfileProps) => {
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
                statusRing: "p-1 bg-gradient-to-r from-pink-500 via-yellow-400 via-blue-600 to-green-400",
                textColor: "text-emerald-900",
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
    const memberSince = new Date(profile.timeCreated * 1000).getFullYear();

    return (
        <div
            onClick={() => window.open(profile.profileUrl, "_blank")}
            className={`w-full max-w-2xl rounded-2xl border ${theme.borderColor} relative overflow-hidden hover:opacity-90 hover:cursor-pointer duration-500`}
        >
            {/* In-game background */}
            {profile.status.inGame && (
                <>
                    <img
                        src={`https://cdn.akamai.steamstatic.com/steam/apps/${profile.status.gameId}/header.jpg`}
                        alt={profile.status.game ?? ""}
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                </>
            )}

            <div className={`relative z-10 p-6 rounded-xl flex flex-col items-center justify-around`}>

                <div className={`relative flex-shrink-0 ring-4 ${theme.statusRing} rounded-full`}>

                    <img
                        src={profile.avatarFull}
                        alt={profile.personaName}
                        className="w-24 h-24 rounded-full"
                    />

                </div>

                {/* User Info */}
                <div className={`flex flex-col items-center gap-5`}>

                    <span
                        className={`px-4 py-2 text-lg sm:text-2xl font-black rounded-xl ${theme.cardBg} ${theme.textColor}`}>
                        {profile.personaName}
                    </span>

                    <span
                        className={`px-3 py-1 text-xs md:text-sm rounded-xl ${theme.cardBg} ${theme.textColor} opacity-90`}>
                        Member since {memberSince}
                    </span>

                    <span
                        className={`px-3 py-1 text-sm md:text-base rounded-xl ${theme.cardBg} ${theme.textColor}`}>
                        {profile.status.inGame
                            ? `Playing: ${profile.status.game}`
                            : statusText}
                    </span>

                </div>

            </div>
        </div>
    );

};


const SteamRecentActivity = ({ isMobile, data }: { isMobile: boolean, data: SteamRecentResponse }) => {
    if (!data) return null;

    if (data.total_count === 0) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Recent Activity</h2>
                <p className="text-slate-400">{data.message}</p>
            </div>

        )
    }

    return (
        <div className="w-full max-w-2xl">
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

const SteamOwnedGames = ({ isMobile, data }: { isMobile: boolean, data: SteamOwnedResponse }) => {
    if (!data) return null;

    return (
        <div className="w-full max-w-full max-h-2xl">
            <h2 className="text-lg sm:text-3xl font-black text-black mb-4">
                {`measure of unemployment: ${data.gameCount} games owned`}
            </h2>
            <MobileTopGamesChart games={data.games} isMobile={isMobile} />

        </div>
    );
}