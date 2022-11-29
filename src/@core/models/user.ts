export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    id: string;
    username: string;
    createdDate: Date;
    updatedDate: Date;
    role: string;
    accessToken: string;
}

export interface Payload {
    id: string,
    username: string,
    createdDate: Date,
    updatedDate: Date,
    role: string,
    idCart: string;
}

export interface RegisterRequest {
    
}