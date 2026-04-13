/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
        domains: [
            'zwilt.s3.amazonaws.com',
            'zwilt-store.s3.amazonaws.com',
        ],
    },
    reactStrictMode: true,
    generateBuildId: async () => {
        return Date.now().toString();
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:5005/api/:path*',
            },
            {
                source: '/graphql',
                destination: 'http://localhost:5005/graphql',
            },
        ];
    },
};

module.exports = nextConfig;
