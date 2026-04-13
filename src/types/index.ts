export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data: T;
}

export interface ProjectStats {
    total: number;
    active: number;
    archived: number;
    deleted: number;
}

export interface OrganizationStats {
    total: number;
    active: number;
}

export interface UserStats {
    total: number;
    admins: number;
    billableSeats: number;
}

export interface AdminStats {
    organizations: OrganizationStats;
    projects: ProjectStats;
    users: UserStats;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    accountType: string;
}

export interface Organization {
    _id: string;
    name: string;
    status: 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | 'TRIAL';
    admin?: User;
    activeSeatCount: number;
    projectCount?: number;
    userCount?: number;
    coreSeats?: number;
    trackerSeats?: number;
    industry?: string;
    description?: string;
    companyWebsite?: string;
    logo?: string;
    seatBillingStatus?: string;
    stripeSubscriptionId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface OrganizationsResponse {
    organizations: Organization[];
    pagination: Pagination;
}

export interface ImpersonateResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        accountType: string;
    };
}

export interface ImpersonateUserRequest {
    duration?: number;
    reason?: string;
}

export type OrganizationStatus = 'ACTIVE' | 'SUSPENDED' | 'DEACTIVATED' | 'TRIAL';
export type AccountType = 'CLIENT' | 'GUEST' | 'CONTACT' | 'MEMBER' | 'ADMIN' | 'SUPER_ADMIN' | 'SUPPORT_ADMIN' | 'AUDIT_ADMIN';
export type SeatStatus = 'ACTIVE' | 'SUSPENDED' | 'REMOVED';

export interface UpdateOrganizationStatusRequest {
    status: OrganizationStatus;
    reason?: string;
}

export interface SeatBillingTier {
    seats: number;
    pricePerSeat: number;
    total: number;
}

export interface SeatBillingData {
    subscriptionId: string | null;
    billingStatus: string;
    tiers: {
        recruitPremium: SeatBillingTier;
        recruitStandard: SeatBillingTier;
        trackerPremium: SeatBillingTier;
        trackerStandard: SeatBillingTier;
    };
    totalMonthly: number;
}

export interface AICreditsData {
    subscriptionTier: string;
    totalCredits: number;
    usedCredits: number;
    availableCredits: number;
    purchasedCredits: number;
    rolloverCredits: number;
    stripeSubscriptionId: string | null;
}

export interface InvoiceRecord {
    id: string;
    date: string;
    amount: number;
    status: string;
    paymentIntentId: string;
    description: string;
}

export interface OrganizationBillingData {
    seatBilling: SeatBillingData;
    aiCredits: AICreditsData | null;
    invoiceHistory: InvoiceRecord[];
}

export interface SeatUser {
    _id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    accountType: AccountType;
    profile_img?: string;
    isOnline?: boolean;
    lastActive?: string;
    createdAt: string;
    organization?: {
        _id: string;
        name: string;
    } | null;
    role?: string;
    seatStatus: SeatStatus;
    appAccess?: string[];
    source?: 'core' | 'tracker';
}

export interface UsersResponse {
    users: SeatUser[];
    pagination: Pagination;
}
