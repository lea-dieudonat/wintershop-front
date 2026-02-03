export interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    slug: string;
    category: {
        id: number;
        name: string;
    }
    imageUrl?: string;
    createdAt: string;
}

export interface ProductsResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    totalItems: number;
    member: Product[];
    view?: {
        '@id': string;
        '@type': string;
        currentPage: number;
        firstPage: number;
        lastPage: number;
        itemsPerPage: number;
    };
}

export interface ProductDetail {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    category: {
        id: number;
        name: string;
    };
    imageUrl?: string;
    images?: string[];
}