export interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
}

export interface CancelOrderModalProps extends BaseModalProps {
    onSubmit: (reference: string) => void;
    reference: string;
}

export interface RefundRequestModalProps extends BaseModalProps {
    onSubmit: (reason: string) => void;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}