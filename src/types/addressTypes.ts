export interface Address {
    id: number;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    additionalInfo?: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt?: string | null;
}

export interface AddressInput {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    additionalInfo?: string;
    isDefault?: boolean;
}

export interface AddressesResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    "hydra:member": Address[];
    "hydra:totalItems": number;
}