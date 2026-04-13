import { gql } from '@apollo/client';

/**
 * Admin login — minimal fields needed.
 * Server sets `zwilt` session + `accessToken` cookies automatically.
 * We only need `token` to verify login succeeded.
 */
export const LOGIN = gql`
    mutation Login($loginInput: LoginInput) {
        login(loginInput: $loginInput) {
            success
            statusCode
            message
            data {
                token
            }
        }
    }
`;

/**
 * Verify current admin session.
 * Checks getUser (requires @Authorized) which confirms cookie is valid.
 * Minimal: just need success flag + accountType to verify admin role.
 */
export const GET_USER = gql`
    query GetUser {
        getUser {
            success
            statusCode
            message
            data {
                client {
                    user {
                        _id
                        email
                        name
                        firstName
                        lastName
                        accountType
                        profile_img
                    }
                }
                talent {
                    user {
                        _id
                        email
                        name
                        firstName
                        lastName
                        accountType
                        profile_img
                    }
                }
            }
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout {
        logout {
            success
            statusCode
            message
        }
    }
`;
