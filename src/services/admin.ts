import api from './api';
import type {
    AdminStats,
    OrganizationsResponse,
    Organization,
    UpdateOrganizationStatusRequest,
    ImpersonateUserRequest,
    ImpersonateResponse,
    ApiResponse,
    UsersResponse,
    OrganizationBillingData,
    SeatUser,
} from '@/types';

export const getAdminStats = async (): Promise<ApiResponse<AdminStats>> => {
    const response = await api.get('/api/admin/stats');
    return response.data;
};

export const getOrganizations = async (
    page: number = 1,
    limit: number = 10,
): Promise<ApiResponse<OrganizationsResponse>> => {
    const response = await api.get('/api/admin/organizations', {
        params: { page, limit },
    });
    return response.data;
};

export const getOrganizationDetails = async (
    id: string,
): Promise<ApiResponse<Organization>> => {
    const response = await api.get(`/api/admin/organizations/${id}`);
    return response.data;
};

export const getOrganizationBilling = async (
    id: string,
): Promise<ApiResponse<OrganizationBillingData>> => {
    const response = await api.get(`/api/admin/organizations/${id}/billing`);
    return response.data;
};

export const updateOrganizationStatus = async (
    id: string,
    data: UpdateOrganizationStatusRequest,
): Promise<ApiResponse<Organization>> => {
    const response = await api.patch(`/api/admin/organizations/${id}/status`, data);
    return response.data;
};

export const deleteOrganization = async (
    id: string,
    reason?: string,
): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/api/admin/organizations/${id}`, {
        data: { reason },
    });
    return response.data;
};

export const impersonateUser = async (
    userId: string,
    data: ImpersonateUserRequest,
): Promise<ApiResponse<ImpersonateResponse>> => {
    const response = await api.post(`/api/admin/impersonate/${userId}`, data);
    return response.data;
};

export const getUsers = async (
    page: number = 1,
    limit: number = 25,
    search?: string,
    accountType?: string,
    orgId?: string,
): Promise<ApiResponse<UsersResponse>> => {
    const response = await api.get('/api/admin/users', {
        params: { page, limit, search, accountType, orgId },
    });
    return response.data;
};

export const getUserDetails = async (
    id: string,
): Promise<ApiResponse<SeatUser>> => {
    const response = await api.get(`/api/admin/users/${id}`);
    return response.data;
};

export interface UpdateUserSeatStatusRequest {
    status: 'ACTIVE' | 'SUSPENDED' | 'REMOVED';
    reason?: string;
}

export const updateUserSeatStatus = async (
    id: string,
    data: UpdateUserSeatStatusRequest,
): Promise<ApiResponse<SeatUser>> => {
    const response = await api.patch(`/api/admin/users/${id}/status`, data);
    return response.data;
};

export const deleteUser = async (
    id: string,
    reason?: string,
): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/api/admin/users/${id}`, {
        data: { reason },
    });
    return response.data;
};

export const getProjectTrend = async (
    range: '6m' | '1y' | 'all' = '6m',
): Promise<ApiResponse<
    Array<{ date: string; projectsCreated: number; projectsArchived: number }>
>> => {
    const response = await api.get('/api/admin/project-trend', {
        params: { range },
    });
    return response.data;
};
