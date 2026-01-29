export const ShippingMethod = {
    STANDARD: "standard",
    EXPRESS: "express",
    RELAY_POINT: "relay_point",
} as const;

export type ShippingMethod = typeof ShippingMethod[keyof typeof ShippingMethod];

export interface ShippingMethodOption {
    value: ShippingMethod;
    label: string;
    cost: string;
    deliveryTime: string;
}

export const SHIPPING_METHODS: ShippingMethodOption[] = [
    {
        value: ShippingMethod.STANDARD,
        label: "Standard Shipping",
        cost: "2.99",
        deliveryTime: "3-5 business days",
    },
    {
        value: ShippingMethod.EXPRESS,
        label: "Express Shipping",
        cost: "4.99",
        deliveryTime: "1-2 business days",
    },
    {
        value: ShippingMethod.RELAY_POINT,
        label: "Relay Point Pickup",
        cost: "0.00",
        deliveryTime: "5-7 business days",
    },
];

export interface CheckoutInput {
    shippingAddressId: number;
    billingAddressId: number;
    shippingMethod: ShippingMethod;
}

export interface CheckoutSessionOutput {
    sessionId: string;
    sessionUrl: string;
    orderId: number;
    orderReference: string;
    publicKey: string;
}