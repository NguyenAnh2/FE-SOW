import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProduct,
  fetchProducts,
} from "../features/products/productsSlice";

const DeleteProductDialog = ({
  openDeleteDialog,
  setOpenDeleteDialog,
  translations,
  product,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      const result = await dispatch(deleteProduct(product.id));

      if (result.payload && result.payload.success) {
        handleClose();
        dispatch(fetchProducts());
      } else {
        throw new Error(result.payload?.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  if (!openDeleteDialog) return null;

  return (
    <div
      className="dialogOverlay"
      onClick={(e) => e.target.className === "dialogOverlay" && handleClose()}
    >
      <div className="dialog createProductDialog">
        <div className="dialogHeader">
          <h2>{translations?.price_list?.delete_product}</h2>
          <button className="closeButton" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="dialogContent">
          <h3>
            {translations?.price_list?.delete_confirmation} <br/>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>{product?.name}</span>
          </h3>
        </div>

        <div className="dialogActions">
          <button className="cancelButton" onClick={handleClose}>
            {translations?.price_list?.no}
          </button>
          <button className="createButton" onClick={handleSubmit}>
            {translations?.price_list?.yes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialog;
