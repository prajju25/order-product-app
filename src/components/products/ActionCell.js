import React from "react";

export const ActionCell = props => {
  const { dataItem } = props;
  let isOrder = props.isOrder;

  return isOrder ? (
    <td className="k-command-cell">
      <button
        className="k-button k-sgrid-save-command"
        onClick={() => props.addToCart(dataItem)}
      >
        Order
      </button>
    </td>
  ) : (
    <td className="k-command-cell">
      <button
        className="k-button k-grid-cancel-command"
        onClick={() => props.cancelOrder(dataItem)}
      >
        Cancel Order
      </button>
    </td>
  );
};