
export interface IAuthStore {
    authenticated: boolean;
    authError: string | null;
    loading: boolean;
    jwt: string
}