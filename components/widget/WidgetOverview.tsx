import { FC, useEffect, useState } from "react"
import Image from "next/image"
import { links, LinkType } from "../../config/links"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,

    Title,
    // Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { Colors } from "../../lib/colors"
// TODO: gradient is too big
import gradient from "chartjs-plugin-gradient"
import { Tooltip } from "../utility/Tooltip"
import { GetStaticProps } from "next";
import { getDatabase } from "../../lib/notion";
import { Post } from "../../lib/types";
import useSWRImmutable from 'swr/immutable';
import { useTheme } from "next-themes";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    gradient
    // Tooltip,
    // Legend
);

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

export const WidgetOverViewSmall: FC<{ posts: Post[], }> = ({ posts }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }))
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }))
    const count = 0
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );

    return (
        <div data-aos="fade-up">
            <div className="aspect-square overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100" dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-row justify-between h-full bg-white shadow-sm p-3.5 " dark="bg-true-gray-900"
                // data-aos="fade-up"         
                >
                    <div className="flex flex-col justify-between">
                        <div className="w-12 xs:text-[40px] animate-wave inline origin-bottom-right text-3xl">
                            👋
                        </div>
                        <div className="xs:text-xl leading-4 xs:leading-6 font-semibold text-sm">
                            <p className={`${Colors["orange"]?.text.normal} line-clamp-1`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal} line-clamp-1`}>{tagsAmount} 个话题</p>
                            <OverviewPvAll />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const WidgetOverViewMedium: FC<{ posts: Post[], fix?: boolean }> = ({ posts, fix }) => {
    const tagsMap = posts.map(p => ({ tags: p.tags, date: p.updateDate }))
    const dateMap = posts.map(p => ({ date: new Date(p.updateDate) }))
    const count = 0
    const tagsAmount = tagsMap.reduce(
        (prev, cur) => prev + cur.tags.length,
        count
    );
    const monthPosts = dateMap.map(d => `${d.date.getFullYear()}-${(d.date.getMonth()).toString()}-${(d.date.getDate()) <= 15 ? "0" : "1"}`);
    const currentMonth = { year: new Date().getFullYear(), month: (new Date().getMonth()) }
    let previousMonthMapArray = []
    for (let i = 0; i < 12; ++i) {
        const previousMonth = new Date(currentMonth.year, currentMonth.month - i)
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-1`, count: 0 })
        previousMonthMapArray.push({ date: `${previousMonth.getFullYear()}-${(previousMonth.getMonth()).toString()}-0`, count: 0 })
    }
    previousMonthMapArray.reverse().map(post => {
        monthPosts.filter(p => {
            if (p === post.date) {
                post.count += 1
            }
        })
    })

    const postsDataset = previousMonthMapArray.map(p => p.count != 0 ? 1 : 0)

    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    // const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    let todayMonth = new Date().getMonth();
    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]]

    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const ticksColor = monthLabel.map((label, index) =>
        parseInt(label) >= todayMonth + 1 && index != 23 ? resolvedTheme === "dark" ? "#434343":"#bababa" : resolvedTheme === "dark" ? "#ffffff":"#000000"
    )

    const postsData: any = {
        labels: monthLabel,
        datasets: [
            {
                data: postsDataset,
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
                barPercentage: 1,
                gradient: {
                    backgroundColor: {
                        axis: 'y',
                        colors: {
                            0: 'rgba(255, 149, 0, 1)',
                            100: 'rgba(255, 149, 0, 0.5)',
                        }
                    },
                }
            }
        ]
    }

    const postsOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                afterFit: (axis: any) => {
                    axis.paddingRight = 1;
                    axis.paddingLeft = 1;
                    axis.paddingTop = 6.5;
                },
                grid: {
                    drawTicks: false,
                    drawBorder: false,
                    lineWidth: 1,
                    // color: ["#bababa","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5","#e5e5e5"]
                },
                ticks: {
                    padding: 5,
                    display: true,
                    autoSkip: false,
                    maxRotation: 0,
                    color: ticksColor,
                    borderWidth: 10,
                    font: {
                        size: 7,
                        // weight: "bold",
                        lineHeight: 1,
                    }
                }
            },
            yAxes: {
                grid: {
                    drawOnChartArea: false,
                    drawTicks: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false,
                }
            }
        }
    }

    return (
        <div data-aos="fade-up">
            <div className={`overflow-hidden transition duration-500 ease-in-out shadow-sm transform-gpu ${fix ? "h-35 lg:h-40" : "h-40 lg:h-48"} rounded-3xl mobile-hover:hover:scale-105 mobile-hover:hover:shadow-lg hover:rotate-0 hover:active:scale-105 hover:active:shadow-lg border-[0.5px] border-true-gray-100`} dark="border-true-gray-900 border-none"
            // data-aos="fade-up"
            >
                <div className="flex flex-row justify-between h-full bg-white shadow-sm px-3 py-2  lg:(px-4 py-3)" dark="bg-true-gray-900"
                // data-aos="fade-up"
                >
                    <div className="flex flex-col justify-between">
                        <div className={`text-4xl ${fix ? "" : "lg:text-5xl"} animate-wave inline origin-bottom-right w-12`}>
                            👋
                        </div>
                        <div className={`text-lg leading-6 md:leading-7  ${fix ? "" : "lg:text-2xl"} font-semibold`}>
                            <p className={`${Colors["orange"]?.text.normal}`}>{dateMap.length} 篇文章</p>
                            <p className={`${Colors["pink"]?.text.normal}`}>{tagsAmount} 个话题</p>
                            <OverviewPvAll />
                        </div>
                    </div>
                    <div className="text-xs w-6/11 lg:(w-1/2 text-md) lg<:text-sm font-medium h-full flex flex-col justify-between">
                        <div>
                            <p className="mb-2">访客</p>
                            <div>
                                <OverviewUv />
                            </div>
                        </div>
                        <div>
                            <p className="mb-2">访问</p>
                            <OverviewPv />
                        </div>
                        <div>
                            <p>文章</p>
                            <div className="h-6.8 md:h-6.6 lg:h-7.3" >
                                <Bar data={postsData} options={postsOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OverviewPv = () => {
    const { data: pvData, error: pvError } = useSWRImmutable('/api/page-views', fetcher)
    let pv = [9, 179, 78, 171, 109, 51, 97, 71, 59, 39, 41, 39, 60, 44, 65, 51, 80, 60, 97, 153, 4, 4, 42, 26, 72, 40, 92, 16, 21, 26, 38, 34, 43, 23, 30, 40, 21, 14, 74, 32, 46, 35, 84, 69, 45, 25, 85, 84, 85, 46, 53, 156, 62]

    if (pvError) {
        return (
            <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(pv).last48)} ⬆️${Math.max(...getTrimData(pv).last48)} (周)`}>
                <BarChart data={pv} color="0, 122, 255" />
            </Tooltip>
        )
    }

    if (!pvData || pvData["pageHistory"] === undefined) {
        return (
            <div className="animate-pulse">
                <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(pv).last48)} ⬆️${Math.max(...getTrimData(pv).last48)} (周)`}>
                    <BarChart data={pv} color="0, 122, 255" />
                </Tooltip>
            </div>
        )
    }

    pv = pvData["pageHistory"]

    return (

        <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(pv).last48)} ⬆️${Math.max(...getTrimData(pv).last48)} (周)`}>
            <BarChart data={pv} color="0, 122, 255" />
        </Tooltip>

    )
}

const OverviewUv = () => {
    const { data: uvData, error: uvError } = useSWRImmutable('/api/users-views', fetcher)
    let uv = [8, 52, 45, 51, 54, 34, 46, 35, 37, 29, 34, 33, 36, 40, 51, 39, 50, 33, 53, 23, 4, 3, 16, 22, 32, 27, 31, 14, 12, 21, 15, 18, 18, 18, 15, 25, 13, 13, 25, 14, 25, 23, 44, 42, 28, 16, 26, 47, 58, 43, 36, 45, 36]

    if (uvError) {
        return (
            <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(uv).last48)} ⬆️${Math.max(...getTrimData(uv).last48)} (周)`}>
                <BarChart data={uv} color="255, 45, 85" />
            </Tooltip>
        )
    }

    if (!uvData || uvData["usersHistory"] === undefined) {
        return (
            <div className="animate-pulse">
                <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(uv).last48)} ⬆️${Math.max(...getTrimData(uv).last48)} (周)`}>
                    <BarChart data={uv} color="255, 45, 85" />
                </Tooltip>
            </div>
        )
    }

    uv = uvData["usersHistory"]

    return (
        <Tooltip tooltipText={`⬇️${Math.min(...getTrimData(uv).last48)} ⬆️${Math.max(...getTrimData(uv).last48)} (周)`}>
            <BarChart data={uv} color="255, 45, 85" />
        </Tooltip>
    )
}

const OverviewPvAll = () => {
    const { data: pvAllData, error: pvAllError } = useSWRImmutable('/api/page-views/all', fetcher)
    if (pvAllError) return <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>25,223 次访问</p>
    if (!pvAllData) return <p className={`${Colors["blue"]?.text.normal} animate-pulse line-clamp-1`}>- 次访问</p>
    const pvAmount = pvAllData["pageViews"] || "-"

    return (
        <p className={`${Colors["blue"]?.text.normal} line-clamp-1`}>{pvAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 次访问</p>
    )
}

function getTrimData(originalData: Array<number>, color?: any) {
    const last48 = originalData.slice(Math.max(originalData.length - 48, 0))
    const lowest = Math.max(...last48) / 7
    const trimLast48 = last48.map((v: any) => v > lowest ? v : lowest)
    const odd = trimLast48.filter((c: any, i: number) => i % 2)
    const even = trimLast48.filter((c: any, i: number) => !(i % 2))
    let colors: any = { 0: `rgba(${color}, 0.8)` }
    colors[Math.max(...last48)] = `rgba(${color}, 0.4)`

    return { odd, even, colors, last48 }
}

function createDataset(data: Array<number>, color: any) {
    return {
        data: data,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        backgroundColor: "rgba(0, 122, 255, 0.8)",
        barPercentage: 0.8,
        categoryPercentage: 0.95,
        gradient: {
            backgroundColor: {
                axis: 'y',
                colors: color
            },
        }
    }
}

const BarChart = ({ data, color }: { data: number[], color: string }) => {

    const monthArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    let todayMonth = new Date().getMonth();

    const monthLabel = [monthArray[todayMonth - 12 < 0 ? todayMonth : todayMonth - 12], "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth - 6 < 0 ? todayMonth - 6 + 12 : todayMonth - 6], "", "", "", "", "", "", "", "", "", "", "", monthArray[todayMonth]]

    function barData(data: any, color: any): any {
        return (
            {
                // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                labels: monthLabel,
                datasets: [
                    createDataset(getTrimData(data).odd, getTrimData(data, color).colors),
                    createDataset(getTrimData(data).even, getTrimData(data, color).colors),
                ],
            }
        )
    };

    function barOptions(data: any): any {
        return ({
            responsive: true,
            borderRadius: Number.MAX_VALUE,
            scales: {
                xAxis: {
                    afterFit: (axis: any) => {
                        axis.paddingRight = 1;
                        axis.paddingLeft = 1;
                    },
                    grid: {
                        drawBorder: false,
                        drawTicks: false,
                        // drawOnChartArea: false,
                        // color: ["white","white","white",],
                        // color: ['#bababa','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#bababa','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','#e5e5e5','red'],
                        // lineWidth: .1,
                    },
                    ticks: {
                        display: false,
                        // callback : function(val, index) {
                        //     // Hide every 2nd tick label
                        //     return index % 3 === 0 ? this.getLabelForValue(val) : '';
                        //   },
                        autoSkip: false,
                        maxRotation: 0,
                        font: {
                            size: 8,
                            // weight: "bold",
                            lineHeight: 0.5,
                            // padding: "-10px",
                        }
                    }
                },
                yAxis: {
                    // position: 'right',

                    min: Math.min(...getTrimData(data).last48) - 5,
                    max: Math.max(...getTrimData(data).last48) + 5,
                    grid: {
                        drawOnChartArea: false,
                        drawTicks: false,
                        drawBorder: false,
                    },
                    ticks: {
                        display: false,
                        stepSize: Math.max(...getTrimData(data).last48),
                        font: {
                            size: 8,
                        }
                    }
                }
            }
        })
    }
    return <Bar className="" data={barData(data, color)} options={barOptions(data)} width="100%" height="12" />
}