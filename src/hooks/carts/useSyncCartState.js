import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateEntireCart } from "../../redux/slices/cart";
import useCartList from "./useCartList";

/**
 * Hook to synchronize cart state between React Query and Redux
 * This ensures that the Redux store always has the latest cart data
 * from the server, which can be used by components that don't have
 * direct access to React Query data.
 */
export default function useSyncCartState() {
  const { data: cartQuery } = useCartList();
  const dispatch = useDispatch();

  useEffect(() => {
    if (cartQuery?.data) {
      // Map cart data to the format expected by Redux
      const cartItems = cartQuery.data.map((item) => ({
        id: item.id,
        service_id: item.service?.id,
        quantity: item.quantity,
        developments: item.service?.developments
          ?.filter((dev) => dev.in_cart !== false)
          .map((dev) => dev.id),
      }));

      // Update Redux store with the latest cart data
      dispatch(updateEntireCart(cartItems));
    } else {
      // If cart is empty or undefined, update Redux with empty array
      dispatch(updateEntireCart([]));
    }
  }, [cartQuery, dispatch]);

  return null; // This hook doesn't return anything, it just performs the sync
}
