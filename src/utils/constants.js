export const PAGE_SIZE = 10;

export const FILTER_STATUS = [
  "all",
  "new",
  "in_progress",
  "ready",
  "received",
  "canceled",
];

export const TRANSACTIONS_STATUS = [
  "charge",
  "app_service_percentage",
  "app_project_percentage",
  "project_accept",
  "refund_project",
  "project_complete",
  "service_order_finish",
  "service_order_create",
  "refund_service_order",
  "withdraw_balance_complete",
  "withdraw_balance_request",
  "withdraw_balance_canceled",
];

export const COMMUNITIES_OPTIONS = [
  {
    name: "unexisited-requests-orders",
  },
  {
    name: "users-stories",
  },
  {
    name: "done-works-modals",
  },
];

export const ORDER_STATUS_AR = {
  new: "جديد",
  in_progress: "قيد التنفيذ",
  ready: "جاهز",
  complete: "تم الانتهاء",
  received: "تم الاستلام",
  canceled: "ملغى",
};

export const ORDER_STATUS_EN = {
  new: "New",
  in_progress: "In Progress",
  ready: "Ready",
  received: "Received",
  complete: "Complete",
  canceled: "Canceled",
};

export const ORDER_STATUS_PERSENTAGE = {
  new: 25,
  in_progress: 50,
  ready: 75,
  received: 100,
  canceled: 100,
};
