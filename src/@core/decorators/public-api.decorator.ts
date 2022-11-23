import { SetMetadata } from "@nestjs/common";

export const PUBLIC_API = 'public_api';
export const PublicApi = () => SetMetadata(PUBLIC_API, true);