import type { RefundStatus } from "../../types/orderTypes";

interface RefundStatusBadgeProps {
  status: RefundStatus;
}

const getStatusStyles = (status: RefundStatus) => {
  switch (status) {
    case "requested":
      return "bg-yellow-100 text-yellow-800";
    case "approved":
      return "bg-blue-100 text-blue-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "refunded":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusLabel = (status: RefundStatus): string => {
  const labels: Record<RefundStatus, string> = {
    requested: "Requested",
    approved: "Approved",
    rejected: "Rejected",
    refunded: "Refunded",
  };
  return labels[status];
};

export const RefundStatusBadge = ({ status }: RefundStatusBadgeProps) => {
  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
        status
      )}`}
    >
      {getStatusLabel(status)}
    </span>
  );
};
