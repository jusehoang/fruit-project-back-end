export interface Category {
  id: number;
  name: string;
  routerLink: string;
}

export interface CategoryRequest {
  name?: string;
  routerLink?: string;
}