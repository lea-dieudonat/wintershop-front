import { useTranslate } from "@tolgee/react";
import { MapPin, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Address } from "@/types/addressTypes";

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelectAddress: (addressId: number) => void;
  onCreateNew: () => void;
  label: string;
  required?: boolean;
}

export const AddressSelector = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onCreateNew,
  label,
  required = false,
}: AddressSelectorProps) => {
  const { t } = useTranslate();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-lg font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <Button onClick={onCreateNew} variant="outline" size="sm" type="button">
          <Plus className="mr-2 h-4 w-4" />
          {t("address.addNew", "Add New")}
        </Button>
      </div>

      {addresses.length === 0 ? (
        <Card className="p-4 text-center">
          <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-600 mb-4">
            {t("address.noAddresses", "No addresses saved yet.")}
          </p>
          <Button onClick={onCreateNew}>
            <Plus className="mr-2 h-4 w-4" />
            {t("address.createFirst", "Create your first address")}
          </Button>
        </Card>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
            <label
              key={address.id}
              className={`block cursor-pointer transition-all ${
                selectedAddressId === address.id
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Card
                className={`p-4 ${
                  selectedAddressId === address.id ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name={`address-${label}`}
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => onSelectAddress(address.id)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex-items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {address.firstName} {address.lastName}
                      </span>
                      {address.isDefault && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                          {t("address.default", "Default")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {address.street}
                      {address.additionalInfo && `, ${address.additionalInfo}`}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {address.postalCode} {address.city}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      {address.country}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t("address.phone", "Phone")}: {address.phoneNumber}
                    </p>
                  </div>
                </div>
              </Card>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
