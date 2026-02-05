import { Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useIsInWishlist,
} from "@/hooks/useWishlist";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/router/routes";

interface WishlistButtonProps {
  productId: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const WishlistButton = ({
  productId,
  size = "md",
  className = "",
}: WishlistButtonProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isInWishlist = useIsInWishlist(productId);
  const addToWishlist = useAddToWishlist();
  const removeFromWishlist = useRemoveFromWishlist();

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la navigation si dans un Link
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (isInWishlist) {
      removeFromWishlist.mutate(productId);
    } else {
      addToWishlist.mutate(productId);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={addToWishlist.isPending || removeFromWishlist.isPending}
      className={`p-2 rounded-full transition-all duration-200 ${
        isInWishlist
          ? "text-secondary-500 hover:text-secondary-400 scale-110"
          : "text-neutral-500 hover:text-secondary-400"
      } disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      aria-label={isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
      title={isInWishlist ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <Heart
        className={`${sizeClasses[size]} transition-all ${
          isInWishlist ? "fill-current" : ""
        }`}
      />
    </button>
  );
};
