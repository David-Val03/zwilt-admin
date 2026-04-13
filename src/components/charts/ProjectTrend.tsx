import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Skeleton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { getProjectTrend } from '@/services/admin';

interface ChartDataPoint {
    date: string;
    projectsCreated: number;
    projectsArchived: number;
}

interface ProjectTrendProps {
    data?: ChartDataPoint[];
}

const ChartSkeleton = () => (
    <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Skeleton variant="text" width={120} />
            <Skeleton variant="rounded" width={120} height={40} />
        </Box>
        <Skeleton variant="text" width={200} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" width="100%" height={300} />
    </Box>
);

const ProjectTrend: React.FC<ProjectTrendProps> = ({ data: propData }) => {
    const [data, setData] = useState<ChartDataPoint[]>(propData || []);
    const [loading, setLoading] = useState(!propData);
    const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('all');

    useEffect(() => {
        if (propData) {
            setData(propData);
            return;
        }

        const fetchTrend = async () => {
            try {
                setLoading(true);
                const response = await getProjectTrend(timeRange);
                if (response.success && response.data) {
                    const validData = response.data.map(item => ({
                        date: item.date || 'Unknown',
                        projectsCreated: Number(item.projectsCreated) || 0,
                        projectsArchived: Number(item.projectsArchived) || 0,
                    }));
                    setData(validData);
                }
            } catch (error) {
                console.warn('Failed to fetch project trend:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrend();
    }, [propData, timeRange]);

    const handleTimeRangeChange = (event: SelectChangeEvent) => {
        setTimeRange(event.target.value as '6m' | '1y' | 'all');
    };

    if (loading) {
        return (
            <Card
                sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    backgroundColor: '#fff',
                }}
            >
                <ChartSkeleton />
            </Card>
        );
    }

    return (
        <Card
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: '#fff',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography variant="h6" fontWeight={600}>
                        Project Trend
                    </Typography>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={timeRange}
                            label="Time Range"
                            onChange={handleTimeRangeChange}
                        >
                            <MenuItem value="6m">Last 6 Months</MenuItem>
                            <MenuItem value="1y">Last Year</MenuItem>
                            <MenuItem value="all">All Time</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ mb: 2, display: 'flex', gap: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: '#50589F',
                                borderRadius: '2px',
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Projects Created
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                            sx={{
                                width: 12,
                                height: 12,
                                backgroundColor: '#FF9800',
                                borderRadius: '2px',
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Projects Archived
                        </Typography>
                    </Box>
                </Box>

                {data.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ py: 8, textAlign: 'center' }}>
                        No project trend data available for this period
                    </Typography>
                ) : (
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={data}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#E5E7EB"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: '#6B7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #E5E7EB',
                                        borderRadius: 8,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="projectsCreated"
                                    stroke="#50589F"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="projectsArchived"
                                    stroke="#FF9800"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ProjectTrend;
