import React from 'react';
import AdminLayout from './AdminLayout';

interface LayoutProps {
    children: React.ReactNode;
    title?: string;
    breadcrumbs?: { label: string; href?: string }[];
}

const Layout: React.FC<LayoutProps> = ({ children, title, breadcrumbs }) => {
    return (
        <AdminLayout title={title} breadcrumbs={breadcrumbs}>
            {children}
        </AdminLayout>
    );
};

export default Layout;
