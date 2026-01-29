import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@tolgee/react";
import { ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useCart } from "@/hooks/useCarts";
import { useAddresses } from "@/hooks/useAddress";
import { useCheckout } from "@/hooks/useCheckout";
import { AddressSelector } from "@/features/address/addressSelector";
import { ShippingMethodSelector } from "@/features/checkout/ShippingMethodSelector";
import { CheckoutSummary } from "@/features/checkout/CheckoutSummary";
import { AddressFormModal } from "@/features/address/addressFormModal";
import { ROUTES } from "@/router/routes";
import type { ShippingMethod } from "@/types/checkoutTypes";
import type { Address } from "@/types/addressTypes";
import { useTolgee } from "@tolgee/react";

export const CheckoutPage = () => {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const tolgee = useTolgee(["language"]);
  const currentLanguage = tolgee.getLanguage() ?? "en";

  const { data: cart, isLoading: isLoadingCart, error: cartError } = useCart();
  const {
    data: addresses,
    isLoading: isLoadingAddresses,
    error: addressesError,
  } = useAddresses();
  const checkout = useCheckout();

  const [shippingAddressId, setShippingAddressId] = useState<number | null>(
    null,
  );
  const [billingAddressId, setBillingAddressId] = useState<number | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(
    null,
  );
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const isLoading = isLoadingCart || isLoadingAddresses;
  const error = cartError || addressesError;

  // Auto-select default address if available
  useEffect(() => {
    if (addresses && addresses.length > 0 && !shippingAddressId) {
      const defaultAddress = addresses.find((addr: Address) => addr.isDefault);
      if (defaultAddress) {
        setShippingAddressId(defaultAddress.id);
        setBillingAddressId(defaultAddress.id);
        setSameAsBilling(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked && shippingAddressId) {
      setBillingAddressId(shippingAddressId);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!shippingAddressId) {
      toast.error(
        t(
          "checkout.error.noShippingAddress",
          "Please select a shipping address.",
        ),
      );
      return;
    }

    if (!billingAddressId) {
      toast.error(
        t(
          "checkout.error.noBillingAddress",
          "Please select a billing address.",
        ),
      );
      return;
    }

    if (!shippingMethod) {
      toast.error(
        t(
          "checkout.error.noShippingMethod",
          "Please select a shipping method.",
        ),
      );
      return;
    }

    try {
      const result = await checkout.mutateAsync({
        shippingAddressId,
        billingAddressId,
        shippingMethod,
      });

      // Redirect to Stripe Checkout
      window.location.href = result.sessionUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        t("checkout.error.failed", "Checkout failed. Please try again."),
        {
          description: t(
            "checkout.error.failedDesc",
            "There was an error processing your checkout.",
          ),
        },
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage
          message={t("checkout.error.load", "Failed to load checkout data.")}
        />
        <Button
          onClick={() => navigate(ROUTES.CART)}
          variant="outline"
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("common.backToCart", "Back to Cart")}
        </Button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            {t("checkout.emptyCart", "Your cart is empty.")}
          </p>
          <Button onClick={() => navigate(ROUTES.PRODUCTS)}>
            {t("checkout.continueShopping", "Continue Shopping")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        onClick={() => navigate(ROUTES.CART)}
        variant="outline"
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("common.backToCart", "Back to Cart")}
      </Button>

      <h1 className="text-3xl font-bold mb-8">
        {t("checkout.title", "Checkout")}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Addresses & Shipping */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <AddressSelector
              addresses={addresses || []}
              selectedAddressId={shippingAddressId}
              onSelectAddress={(id: number) => {
                setShippingAddressId(id);
                if (sameAsBilling) {
                  setBillingAddressId(id);
                }
              }}
              onCreateNew={() => setIsAddressModalOpen(true)}
              label={t("checkout.shippingAddress", "Shipping Address")}
            />

            {/* Same as Billing Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="sameAsBilling"
                checked={sameAsBilling}
                onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="sameAsBilling"
                className="ml-2 text-sm text-gray-700"
              >
                {t(
                  "checkout.sameAsBilling",
                  "Billing address same as shipping address",
                )}
              </label>
            </div>

            {/* Billing Address - Only show if different */}
            {!sameAsBilling && (
              <AddressSelector
                addresses={addresses || []}
                selectedAddressId={billingAddressId}
                onSelectAddress={setBillingAddressId}
                onCreateNew={() => setIsAddressModalOpen(true)}
                label={t("checkout.billingAddress", "Billing Address")}
              />
            )}

            {/* Shipping Method */}
            <ShippingMethodSelector
              selectedMethod={shippingMethod}
              onSelectMethod={setShippingMethod}
              currentLanguage={currentLanguage}
            />
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              cart={cart}
              shippingMethod={shippingMethod}
              currentLanguage={currentLanguage}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full mt-6"
              size="lg"
              isLoading={checkout.isPending}
              disabled={
                checkout.isPending ||
                !shippingAddressId ||
                !billingAddressId ||
                !shippingMethod
              }
            >
              <CreditCard className="w-5 h-5 mr-2" />
              {t("checkout.proceedToPayment", "Proceed to Payment")}
            </Button>
          </div>
        </div>
      </form>

      {/* Address Form Modal */}
      <AddressFormModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSuccess={() => {
          // Modal will close automatically
        }}
      />
    </div>
  );
};
