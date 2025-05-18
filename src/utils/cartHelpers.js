/**
 * Utility functions for cart operations
 */

import { updateEntireCart } from "../redux/slices/cart";

/**
 * Updates the Redux cart state from the latest React Query data
 * @param {Object} queryClient - The React Query client instance
 * @param {Function} dispatch - The Redux dispatch function
 */
export function updateReduxCartFromQuery(queryClient, dispatch) {
  const cartData = queryClient.getQueryData(["cartList"]);
  if (cartData?.data) {
    dispatch(
      updateEntireCart(
        cartData.data.map((item) => ({
          id: item.id,
          service_id: item.service?.id,
          quantity: item.quantity,
          developments: item.service?.developments
            ?.filter((dev) => dev.in_cart !== false)
            .map((dev) => dev.id),
        }))
      )
    );
  } else {
    // If cart is empty, update Redux with empty array
    dispatch(updateEntireCart([]));
  }
}
