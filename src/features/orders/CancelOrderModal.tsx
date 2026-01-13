import { Modal } from "../../components/ui/Modal";
import { useTranslate } from "@tolgee/react";
import type { CancelOrderModalProps } from "../../types/modalTypes";

export const CancelOrderModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  reference,
}: CancelOrderModalProps) => {
  const { t } = useTranslate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("orders.cancel.title", "Cancel Order")}
    >
      <div className="mb-6">
        <p className="text-gray-700">
          {t(
            "orders.cancel.confirmation",
            `Are you sure you want to cancel order ${reference}? This action cannot be undone.`
          )}
        </p>
      </div>
      <div className="flex gap-3 justify-end">
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          onClick={onClose}
          disabled={isLoading}
        >
          {t("common.cancel", "Cancel")}
        </button>
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          onClick={() => onSubmit(reference)}
          disabled={isLoading}
          type="button"
        >
          {isLoading
            ? t("common.cancelling", "Cancelling...")
            : t("common.cancel", "Cancel")}
        </button>
      </div>
    </Modal>
  );
};
