interface TokenRequest {
    Id: string;
    Email: string;
}
interface DataStoredInToken {
    sub: string;
    email: string;
}
interface ClientTokenResponse {
    refresh_token: string;
    expires_in: number;
    access_token: string;
}

