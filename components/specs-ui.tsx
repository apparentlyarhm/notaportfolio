"use client";

import { codestuff } from "@/config/fonts";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { ArchitectureIcon, CpuIcon, GpuIcon, MemoryIcon, OSIcon } from "./icons";


interface SystemInfo {
    timestamp: number;
    arch: string;
    os_name: string;
    os_version: string;
    cpu: string;
    memory_gb: number;
    gpus: string[];
}


type Props = {
    isMobile: boolean;
};

export default function SystemInfo({ isMobile }: Props) {

    const [data, setData] = useState<SystemInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);


    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/misc/report`);

                if (!res.ok) {
                    
                    if (res.status == 404){
                        setIsOffline(true)
                        return
                    }

                    throw new Error("Failed to fetch system info");
                }

                const json = await res.json();
                setData(json);

            } catch (err: any) {
                setError(err.message);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading)
        return (
            <div className={clsx("flex justify-center items-center h-64", codestuff.className)}>
                <p className="text-gray-500">Loading system info...</p>
            </div>
        );

    if (error)
        return (
            <></> // not show anything. why show error for a dumbass thing like tis LMOA
        );

    if (isOffline) {
        return(
            <div
            className={clsx(
                "max-w-xl mx-auto mt-10 border-1 border-gray-300 rounded-3xl bg-gray-50",
                isMobile ? "py-4" : "p-8",
                codestuff.className
            )}
        >
            <h1
                className={clsx(
                    "font-semibold text-gray-500 p-5",
                    isMobile ? "text-md" : "text-2xl"
                )}
            >
                {`i'm offline rn`}
            </h1>

        </div>
        )
    }

    if (!data) return null;

    const relativeTime = formatDistanceToNow(new Date(data.timestamp * 1000), {
        addSuffix: true,
    });

    const specItems = [
        { Icon: ArchitectureIcon, label: "Architecture", value: data.arch },
        { Icon: CpuIcon, label: "CPU", value: data.cpu },
        { Icon: MemoryIcon, label: "Memory", value: `${data.memory_gb} GB` },
        { Icon: GpuIcon, label: "GPU(s)", value: data.gpus.length > 0 ? data.gpus.join(", ") : "N/A" },
    ];

    return (
        <div
            className={clsx(
                "max-w-4xl mx-auto mt-10 border-1 border-green-500 rounded-3xl bg-green-50",
                isMobile ? "py-4" : "p-8",
                codestuff.className
            )}
        >

            <h1
                className={clsx(
                    "font-bold text-green-800 p-5",
                    isMobile ? "text-md mb-5" : "text-2xl mb-6"
                )}
            >
                {`Online, ${data.os_name}`}
            </h1>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <tbody>
                        {specItems.map(({ Icon, label, value }, index) => (
                            <tr
                                key={label}
                                className={clsx(
                                    "border-t border-green-100",
                                    index === specItems.length - 1 && "rounded-b-xl"
                                )}
                            >
                                <td className="px-4 py-3 flex items-center space-x-3">
                                    <div className="flex-shrink-0 p-2 rounded-full">
                                        <Icon className="h-5 w-5 text-green-500" />
                                    </div>
                                    <span className="font-medium sm:text-medium text-xs text-green-500">
                                        {label}
                                    </span>
                                </td>
                                <td className={clsx("px-4 py-3 font-mono sm:text-medium text-xs text-green-800 tracking-tight text-right")}>
                                    {value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className={clsx("mt-4 text-green-800 text-center text-xs")}>
                {`updated ${relativeTime}`}
            </p>    
        </div>
    );

}
