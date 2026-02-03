import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useTranslate } from "@tolgee/react";
import type { RefundRequestModalProps } from "@/types/modalTypes";

export const RefundRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: RefundRequestModalProps) => {
  const { t } = useTranslate();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim() === "") {
      setError(
        t(
          "orders.refund.reasonRequired",
          "Please provide a reason for the refund.",
        ),
      );
      return;
    }
    onSubmit(reason);
  };
  const handleClose = () => {
    setReason("");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={t("orders.refund.title", "Request a Refund")}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="reason">
            {t("orders.refund.reasonLabel", "Reason for Refund")}
          </label>
          <textarea
            name="reason"
            id="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={4}
            disabled={isLoading}
            placeholder={t(
              "orders.refund.reasonPlaceholder",
              "Enter the reason for your refund request...",
            )}
          ></textarea>
          {error && <p className="text-red-600 mt-1 text-sm">{error}</p>}
        </div>
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={handleClose}
            disabled={isLoading}
          >
            {t("common.cancel", "Cancel")}
          </button>
          <button
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? t("common.submitting", "Submitting...")
              : t("common.submit", "Submit")}
          </button>
        </div>
      </form>
    </Modal>
  );
};
