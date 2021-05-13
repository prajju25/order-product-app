import React from "react";

export const ActionCell = props => {
  const { dataItem } = props;
  let isOrder = props.isOrder;

  return isOrder ? (
    <td className="k-command-cell">
      <button style={{fontSize: '11px'}}
        className="k-button k-sgrid-save-command red-button small"
        onClick={() => props.addToCart(dataItem)}
      >
        Add to Cart
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button style={{fontSize: '11px'}}
        className="k-button k-grid-cancel-command black-button small"
        onClick={() => props.cancelOrder(dataItem)}
      >
        Remove Item
      </button>
    </td>
  );
};