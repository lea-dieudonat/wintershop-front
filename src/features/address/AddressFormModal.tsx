import { useState } from "react";
import { useTranslate } from "@tolgee/react";
import { toast } from "sonner";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCreateAddress } from "@/hooks/useAddress";
import type { AddressInput } from "@/types/addressTypes";

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

  const [formData, setFormData] = useState<AddressInput>({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    additionalInfo: "",
    isDefault: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAddress.mutateAsync(formData);
      toast.success(t("address.created", "Address created successfully!"), {
        description: t(
          "address.createdDesc",
          "Your new address has been saved.",
        ),
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        phoneNumber: "",
        additionalInfo: "",
        isDefault: false,
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
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="space-y-4 flex-1">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("address.firstName", "First Name")}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label={t("address.lastName", "Last Name")}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Street */}
          <Input
            label={t("address.street", "Street")}
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />

          {/* City & Postal Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label={t("address.city", "City")}
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
            <Input
              label={t("address.postalCode", "Postal Code")}
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </div>

          {/* Country */}
          <Input
            label={t("address.country", "Country")}
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          {/* Phone Number */}
          <Input
            label={t("address.phoneNumber", "Phone Number")}
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          {/* Additional Info */}
          <div>
            <label
              htmlFor="additionalInfo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("address.additionalInfo", "Additional Info")}
            </label>
            <textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder={t(
                "address.additionalInfoPlaceholder",
                "Building number, floor, etc.",
              )}
            />
          </div>

          {/* Is Default */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="isDefault"
              className="ml-2 block text-sm text-gray-900"
            >
              {t("address.setAsDefault", "Set as default address")}
            </label>
          </div>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="flex justify-end gap-3 pt-4 border-t mt-4 -mx-6 px-6 pb-2 bg-white">
          <Button type="button" variant="outline" onClick={onClose}>
            {t("common.cancel", "Cancel")}
          </Button>
          <Button
            type="submit"
            isLoading={createAddress.isPending}
            disabled={createAddress.isPending}
          >
            {t("common.save", "Save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
