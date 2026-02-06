import { useTranslate } from "@tolgee/react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";
import { useCreateAddress } from "@/hooks/useAddress";
import type { AddressInput } from "@/types/addressTypes";
import { AddressForm } from "./AddressForm";

interface AddressFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddressFormModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddressFormModalProps) => {
  const { t } = useTranslate();
  const createAddress = useCreateAddress();

  const handleSubmit = async (data: AddressInput) => {
    try {
      await createAddress.mutateAsync(data);
      toast.success(t("address.created", "Address created successfully!"), {
        description: t(
          "address.createdDesc",
          "Your new address has been saved.",
        ),
      });

      onSuccess?.();
      onClose();
    } catch {
      toast.error(t("address.createError", "Failed to create address."), {
        description: t(
          "address.createErrorDesc",
          "An error occurred while saving your address. Please try again.",
        ),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("address.createNew", "Create New Address")}
    >
      <AddressForm
        key={isOpen ? "open" : "closed"}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isLoading={createAddress.isPending}
      />
    </Modal>
  );
};
