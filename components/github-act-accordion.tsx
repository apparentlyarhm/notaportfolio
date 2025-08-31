import { codestuff } from "@/config/fonts";
import { Accordion, AccordionItem, Spinner } from "@heroui/react";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowDown, ChevronLeft, Codesandbox, GitCommit } from "react-feather";

interface GitHubData {
    data: {
        user: {
            repositories: {
                nodes: any[];
            }
        }
    }
}

type RepoActivityAccordionProps = {
    isMobile: boolean;
};

export default function RepoActivityAccordion({ isMobile }: RepoActivityAccordionProps) {
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<boolean>(false);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/github/activity`);

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const json = await res.json();
                setData(json);

            } catch (err) {
                console.error("Error fetching GitHub activity:", err);
                setError(true);

            } finally {
                setLoading(false);
            } 50
        };

        fetchData();
    }, [BASE_URL])

    if (loading) {
        return (
            <Spinner size="lg" variant="wave" />
        )
    }

    if (error || !data) {
        return (
            <div className={clsx("text-red-500 flex-col  sm:flex-row flex gap-5 justify-center items-center text-[10px] sm:text-sm", codestuff.className)}>
                <AlertTriangle className="h-4 w-4"/>
                <p>

                    Failed to load GitHub activity. Please try again later.
                </p>
            </div>
        );
    }

    return (
        <Accordion selectionMode="multiple" className={clsx("shadow-none", codestuff.className)} variant="splitted">
            {data.data.user.repositories.nodes.map((repo) => {
                if (!repo.defaultBranchRef?.target.history.edges.length) {
                    return null;
                }

                const latestCommit = repo.defaultBranchRef.target.history.edges[0].node;
                const primaryColor = repo.primaryLanguage.color;
                const bgColor = `${primaryColor}07`;
                const borderColor = `${primaryColor}70`;

                return (
                    <AccordionItem
                        key={repo.name}
                        aria-label={repo.name}
                        className="py-7 sm:py-5 rounded-3xl shadow-none border-1 mb-3"
                        indicator={<ChevronLeft className="h-4 w-4 sm:h-7 sm:w-7" style={{ color: primaryColor }} />}
                        style={{ backgroundColor: bgColor, borderColor: borderColor }}
                        title={
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm sm:text-xl">{repo.name}</span>
                            </div>
                        }
                        startContent={
                            <Codesandbox
                                className="h-4 w-4 sm:h-7 sm:w-7"
                                style={{ color: primaryColor }}
                            />
                        }
                        subtitle={
                            // Use truncate to prevent long subtitles from breaking layout
                            <p className="text-[10px] sm:text-medium">
                                {repo.primaryLanguage.name}, Last commit {formatDistanceToNow(
                                    new Date(latestCommit.committedDate),
                                    { addSuffix: true }
                                )}
                            </p>
                        }
                    >
                        <ul className="space-y-3 p-2 border-1 rounded-xl" style={{ borderColor: borderColor }}>

                            {repo.defaultBranchRef.target.history.edges.map(({ node: commit }: any) => (

                                <li
                                    key={commit.url}
                                    className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 rounded-xl p-1 sm:p-3 transition-colors"
                                    style={{ '--hover-bg': bgColor } as React.CSSProperties}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                                    onFocus={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}

                                    onBlur={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    {!isMobile ? (
                                        <>
                                            <div className="flex items-center gap-3 flex-shrink-0">
                                                <GitCommit className="h-5 w-5" style={{ color: primaryColor }} />
                                            </div>

                                            <div className="flex-grow pl-0 sm:pl-8">
                                                <a
                                                    href={commit.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="sm:font-medium text-xs sm:text-medium text-gray-800 dark:text-gray-200 hover:underline"
                                                >
                                                    {commit.messageHeadline}
                                                </a>
                                                <p className="sm:font-medium text-xs sm:text-medium text-gray-500">by {commit.author.name}</p>
                                            </div>

                                            <div className="flex-shrink-0 text-xs text-gray-400 w-full sm:w-auto text-right sm:text-left pr-2 sm:pr-0 sm:ml-auto">
                                                {formatDistanceToNow(new Date(commit.committedDate), { addSuffix: true })}
                                            </div>
                                        </>

                                    ) : (
                                        <div className="flex flex-col items-start flex-grow pl-0">
                                            <a
                                                href={commit.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-xs truncate max-w-[200px] text-blue-700 dark:text-gray-200 hover:underline"
                                            >
                                                {commit.messageHeadline}
                                            </a>
                                            <div className="text-[10px] text-gray-400 mt-1">
                                                {formatDistanceToNow(new Date(commit.committedDate), { addSuffix: true })}
                                            </div>
                                        </div>

                                    )}
                                </li>
                            ))}
                        </ul>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
}
