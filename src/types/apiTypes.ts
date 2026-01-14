export interface ApiErrorResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    status: number;
    violations: Array<{
        propertyPath: string;
        message: string;
        code: string;
    }>;
    detail: string;
    description: string;
    type: string;
    title: string;
}