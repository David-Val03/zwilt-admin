import React, { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    IconButton,
    InputAdornment,
    Alert,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMutation } from '@apollo/client';
import { LOGIN } from '@/graphql/auth';
import { useRouter } from 'next/router';
import AppTheme from '@/theme/AppTheme';

const Login: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [debugLogs, setDebugLogs] = useState<string>('');

    // Show debug logs from localStorage (survives redirects)
    React.useEffect(() => {
        const logs = localStorage.getItem('auth-debug-logs');
        if (logs) {
            try {
                const parsed = JSON.parse(logs);
                const formatted = parsed
                    .map(
                        (l: any) =>
                            `${new Date(l.time).toLocaleTimeString()} - ${l.msg} ${l.data ? JSON.stringify(l.data) : ''}`
                    )
                    .join('\n');
                setDebugLogs(formatted);
            } catch (e) {
                setDebugLogs(logs);
            }
        }
    }, []);

    const [loginMutation, { loading }] = useMutation(LOGIN, {
        onCompleted: (data: any) => {
            console.log('[Login] Mutation completed:', data);
            
            if (!data.login?.success) {
                console.log('[Login] Login failed:', data.login?.message);
                setError(data.login?.message || 'Login failed');
                return;
            }

            console.log('[Login] ✅ Login successful, redirecting with window.location.href');
            console.log('[Login] Cookies should be set. Current cookies:', document.cookie);
            
            // Login succeeded, cookies set server-side.
            // Use window.location.href to force full page reload so cookies are properly
            // recognized by the server on the next request. This avoids stale Apollo state.
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            }
        },
        onError: (err: Error) => {
            console.error('[Login] Mutation error:', err);
            setError(err.message || 'Login failed');
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        await loginMutation({
            variables: {
                loginInput: {
                    email,
                    password,
                    rememberMe: true,
                },
            },
        });
    };

    return (
        <AppTheme>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F8F9FA',
                    padding: 2,
                }}
            >
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 440,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 2,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Typography
                                variant="h4"
                                fontWeight={700}
                                sx={{ color: 'primary.main', mb: 1 }}
                            >
                                zwilt
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                Admin Portal
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mt: 1 }}
                            >
                                Sign in with your admin account
                            </Typography>
                        </Box>

                        {error && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ mb: 2 }}
                                required
                                autoComplete="email"
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 3 }}
                                required
                                autoComplete="current-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                size="large"
                                disabled={loading}
                                sx={{
                                    textTransform: 'none',
                                    borderRadius: 2,
                                    py: 1.5,
                                }}
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Debug logs - remove after troubleshooting */}
                {debugLogs && (
                    <Card
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            right: 16,
                            maxWidth: 500,
                            maxHeight: 300,
                            overflow: 'auto',
                            zIndex: 9999,
                            border: '2px solid orange',
                        }}
                    >
                        <CardContent>
                            <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: 'block' }}>
                                🔍 Auth Debug Logs
                                <Button
                                    size="small"
                                    sx={{ ml: 2 }}
                                    onClick={() => {
                                        localStorage.removeItem('auth-debug-logs');
                                        setDebugLogs('');
                                    }}
                                >
                                    Clear
                                </Button>
                            </Typography>
                            <pre style={{ fontSize: 11, margin: 0, whiteSpace: 'pre-wrap' }}>
                                {debugLogs}
                            </pre>
                        </CardContent>
                    </Card>
                )}
            </Box>
        </AppTheme>
    );
};

(Login as any).requireAuth = false;
(Login as any).getLayout = (page: React.ReactElement) => page;

export default Login;
