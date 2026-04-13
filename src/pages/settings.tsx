'use client';
import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings: React.FC = () => {
    return (
        <Box>
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
                Settings
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
                                <SettingsIcon color="primary" />
                                <Typography variant="h6" fontWeight={600}>
                                    Admin Settings
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                Configure admin panel settings, notifications, and system preferences. This page is coming soon.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Settings;
