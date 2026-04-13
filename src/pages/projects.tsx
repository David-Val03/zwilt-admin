'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Projects: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Projects
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
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
                                    alignItems: 'center',
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <AssessmentIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Project Management
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                View and manage all projects across organizations. This page is coming soon.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Projects;
