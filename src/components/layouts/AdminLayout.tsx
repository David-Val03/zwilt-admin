import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
    children,
    title,
    breadcrumbs,
}) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA', overflow: 'hidden' }}>
            <Sidebar />
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>
                <Header title={title || 'Admin'} breadcrumbs={breadcrumbs} />
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        padding: '32px',
                        overflow: 'auto',
                        minWidth: 0,
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default AdminLayout;
