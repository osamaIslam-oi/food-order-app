import React, { useContext, useState } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  const [orderSubmit, setOrderSubmit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    street: "",
    postalCode: "",
    city: "",
  });
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleInputChange(event) {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  function isFormValid() {
    return Object.values(formData).every((value) => value.trim() !== "");
  }

  function handleOrderSubmit() {
    if (isFormValid()) {
      setOrderSubmit(true);
    }
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input
          label="Full Name"
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="E-Mail Address"
          type="email"
          id="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <Input
          label="Street"
          type="text"
          id="street"
          value={formData.street}
          onChange={handleInputChange}
        />
        <div className="control-row">
          <Input
            label="Postal Code"
            type="text"
            id="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
          <Input
            label="City"
            type="text"
            id="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>

        {!orderSubmit ? (
          <p className="modal-actions">
            <Button type="button" textOnly onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleOrderSubmit}>Submit Order</Button>
          </p>
        ) : (
          <p className="modal-actions">
            <Button type="button" onClick={handleClose}>
              Close
            </Button>
            Order has been sent have a nice day
          </p>
        )}
      </form>
    </Modal>
  );
}
