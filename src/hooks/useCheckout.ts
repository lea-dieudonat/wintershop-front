import { useMutation } from "@tanstack/react-query";
import { checkoutApi } from "@/services/api/checkoutApi";
import type { CheckoutInput } from "@/types/checkoutTypes";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (checkoutInput: CheckoutInput) =>
      checkoutApi.createSession(checkoutInput),
  });
};
