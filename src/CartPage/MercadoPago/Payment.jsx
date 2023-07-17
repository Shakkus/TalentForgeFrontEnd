import React from "react";
import classnames from "classnames";
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";

export const Payment = () => {
  const { preferenceId, orderData } = React.useContext(Context);
  const [isReady, setIsReady] = React.useState(false);
  const paymentClass = classnames("payment-form dark", {
    "payment-form--hidden": !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady}
      />
    );
  };

  return (
    <div className={paymentClass}>
      <div className="form-group col-sm-12">
        {renderCheckoutButton(preferenceId)}
      </div>
    </div>
  );
};
