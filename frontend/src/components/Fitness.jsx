import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Fitness() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [days, setDays] = useState(90);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/health/weight?days=${days}`);
            setData(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load weight data');
            setLoading(false);
            console.error(err);
        }
    }, [days]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (loading) {
        return (
            <section className="w-full flex flex-col items-start border-t border-gray-300 font-mono p-8 mt-10">
                <h2 className="text-base font-bold mb-4">FITNESS</h2>
                <div className="text-sm text-gray-600">Loading...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="w-full flex flex-col items-start border-t border-gray-300 font-mono p-8 mt-10">
                <h2 className="text-xl font-bold mb-4">FITNESS</h2>
            </section>
        );
    }

    if (data.length === 0) {
        return (
            <section className="w-full flex flex-col items-start border-t border-gray-300 font-mono p-8 mt-10">
                <h2 className="text-xl font-bold mb-4">FITNESS</h2>
                <div className="text-sm text-gray-600">No data available</div>
            </section>
        );
    }

    // Calculate stats
    const weights = data.map(d => d.weight);
    const stats = {
        latest: data[data.length - 1]?.weight,
        min: Math.min(...weights),
        max: Math.max(...weights),
        avg: (weights.reduce((sum, w) => sum + w, 0) / weights.length).toFixed(1)
    };

    return (
        <section className="w-full flex flex-col items-start border-t border-gray-300 font-mono p-8 mt-10">
            <h2 className="text-base font-bold mb-4 text-[#556B2F]">FITNESS</h2>

            {/* 2-column grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">

                {/* Weight Progress Column */}
                <div className="border border-gray-300 p-4 break-words overflow-hidden">
                    <h3 className="text-sm font-bold mb-4 text-[#556B2F]">weight</h3>

                    {/* Time period selector */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                        <button
                            onClick={() => setDays(30)}
                            className={`px-4 py-2 text-sm border border-gray-300 ${days === 30 ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            30 days
                        </button>
                        <button
                            onClick={() => setDays(90)}
                            className={`px-4 py-2 text-sm border border-gray-300 ${days === 90 ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            90 days
                        </button>
                        <button
                            onClick={() => setDays(180)}
                            className={`px-4 py-2 text-sm border border-gray-300 ${days === 180 ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            6 months
                        </button>
                        <button
                            onClick={() => setDays(365)}
                            className={`px-4 py-2 text-sm border border-gray-300 ${days === 365 ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
                                }`}
                        >
                            1 year
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                        <div>
                            <div className="text-sm text-gray-600">current</div>
                            <div className="text-base font-bold">{stats.latest} kg</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">average</div>
                            <div className="text-base font-bold">{stats.avg} kg</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">min</div>
                            <div className="text-base font-bold">{stats.min} kg</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">max</div>
                            <div className="text-base font-bold">{stats.max} kg</div>
                        </div>
                    </div>

                    {/* Graph */}
                    <div className="w-full overflow-hidden">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fontFamily: 'monospace' }}
                                    tickFormatter={(date) => {
                                        const d = new Date(date);
                                        return `${d.getMonth() + 1}/${d.getDate()}`;
                                    }}
                                />
                                <YAxis
                                    domain={['dataMin - 2', 'dataMax + 2']}
                                    tick={{ fontSize: 12, fontFamily: 'monospace' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        fontFamily: 'monospace',
                                        fontSize: '12px',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '0'
                                    }}
                                    labelFormatter={(date) => new Date(date).toLocaleDateString()}
                                    formatter={(value) => [`${value} kg`, 'weight']}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="#556B2F"
                                    strokeWidth={2}
                                    dot={{ r: 2, fill: '#556B2F' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="text-xs text-gray-500 mt-4">
                        data source: apple health | last updated: {new Date(data[data.length - 1]?.date).toLocaleDateString()}
                    </div>
                </div>

                {/* Personal Records Column - with 2 rows */}
                <div className="flex flex-col gap-4">

                    {/* Row 1: Personal Records */}
                    <div className="border border-gray-300 p-4 break-words overflow-hidden">
                        <h3 className="text-sm font-bold mb-4 text-[#556B2F]">personal records (pr's)</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Bench Press</div>
                                <div className="text-base font-bold">-- kg</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1"></div>
                                <div className="text-base font-bold">-- kg</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1"></div>
                                <div className="text-base font-bold">-- kg</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1"></div>
                                <div className="text-base font-bold">-- kg</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1"></div>
                                <div className="text-base font-bold">--:--</div>
                            </div>


                        </div>


                    </div>

                    {/* Row 2: Placeholder */}
                    <div className="border border-gray-300 p-4 break-words overflow-hidden">
                        <h3 className="text-sm font-bold mb-4 text-[#556B2F]">placeholder</h3>
                        <p className="text-sm text-gray-600">
                            This is a placeholder section for future content.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default Fitness;