import React from "react";
import useDecreaseCartQuantity from "../../hooks/carts/useDecreaseCartQuantity";
import useIncreaseCartQuantity from "../../hooks/carts/useIncreaseCartQuantity";

/**
 * Component that provides cart item operation buttons
 * Each operation uses its own dedicated hook following SOLID principles
 */
function CartItemOperations({ item, onQuantityChange }) {
  // Use individual hooks for each cart operation
  const { increaseQuantity, isIncreasing } = useIncreaseCartQuantity();
  const { decreaseQuantity, isDecreasing } = useDecreaseCartQuantity();

  // Handle increasing item quantity
  const handleIncrease = () => {
    increaseQuantity(item.id);
    if (onQuantityChange) {
      onQuantityChange(item.quantity + 1);
    }
  };

  // Handle decreasing item quantity
  const handleDecrease = () => {
    decreaseQuantity(item.id);
    if (onQuantityChange && item.quantity > 1) {
      onQuantityChange(item.quantity - 1);
    }
  };

  return (
    <>
      <div className="input-field">
        <button
          className="add"
          disabled={isIncreasing}
          onClick={handleIncrease}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
        <input type="number" min={1} readOnly value={item?.quantity} />
        <button
          className="minus"
          disabled={isDecreasing || item.quantity <= 1}
          onClick={handleDecrease}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
      </div>
    </>
  );
}

export default CartItemOperations;
