import { useState } from "react";
import {
  useAddresses,
  useCreateAddress,
  useUpdateAddress,
  useDeleteAddress,
} from "@/hooks/useAddress";
import AddressForm from "@/features/address/AddressForm";
import type { Address, AddressInput } from "@/types/addressTypes";
import { useTranslate } from "@tolgee/react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export const AddressSection = () => {
  const { t } = useTranslate();
  const [isAdding, setIsAdding] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const { data: addresses = [], isLoading } = useAddresses();
  const createMutation = useCreateAddress();
  const updateMutation = useUpdateAddress();
  const deleteMutation = useDeleteAddress();

  const handleCreate = async (data: AddressInput) => {
    try {
      await createMutation.mutateAsync(data);
      setIsAdding(false);
    } catch (error) {
      console.error(t("address.createError"), error);
    }
  };

  const handleUpdate = async (data: AddressInput) => {
    if (!editingAddress) return;

    try {
      await updateMutation.mutateAsync({ id: editingAddress.id, data });
      setEditingAddress(null);
    } catch (error) {
      console.error(t("address.updateError"), error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(t("address.deleteConfirm"))) return;

    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error(t("address.deleteError"), error);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingAddress(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t("address.title")}</h2>
        {!isAdding && !editingAddress && (
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            {t("address.addNew")}
          </button>
        )}
      </div>

      {/* Formulaire d'ajout */}
      {isAdding && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">{t("address.createNew")}</h3>
          <AddressForm
            onSubmit={handleCreate}
            onCancel={handleCancel}
            isLoading={createMutation.isPending}
          />
        </div>
      )}

      {/* Liste des adresses */}
      {addresses.length === 0 && !isAdding ? (
        <div className="text-center py-8 text-gray-500">
          <p>{t("address.noAddresses")}</p>
          <p className="text-sm mt-2">{t("address.createFirst")}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              {editingAddress?.id === address.id ? (
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    {t("address.edit")}
                  </h3>
                  <AddressForm
                    initialData={{
                      firstName: address.firstName,
                      lastName: address.lastName,
                      street: address.street,
                      postalCode: address.postalCode,
                      city: address.city,
                      country: address.country,
                      additionalInfo: address.additionalInfo || "",
                      phoneNumber: address.phoneNumber || "",
                      isDefault: address.isDefault,
                    }}
                    onSubmit={handleUpdate}
                    onCancel={handleCancel}
                    isLoading={updateMutation.isPending}
                  />
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">
                          {address.firstName} {address.lastName}
                        </h3>
                        {address.isDefault && (
                          <span className="px-2 py-0.5 bg-primary-100 text-primary-700 text-xs font-medium rounded">
                            {t("address.default", "Default")}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600">{address.street}</p>
                      {address.additionalInfo && (
                        <p className="text-gray-600">
                          {address.additionalInfo}
                        </p>
                      )}
                      <p className="text-gray-600">
                        {address.postalCode} {address.city}
                      </p>
                      <p className="text-gray-600">{address.country}</p>
                      {address.phoneNumber && (
                        <p className="text-gray-600 mt-1">
                          {address.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingAddress(address)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {t("address.edit")}
                      </button>
                      <button
                        onClick={() => handleDelete(address.id)}
                        disabled={deleteMutation.isPending}
                        className="text-red-600 hover:text-red-700 font-medium text-sm disabled:opacity-50"
                      >
                        {t("address.delete")}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
