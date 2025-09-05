import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./CreateProductDialog.css";
import {
  createProduct,
  fetchProducts,
} from "../features/products/productsSlice";

const CreateProductDialog = ({
  openCreateDialog,
  setOpenCreateDialog,
  translations,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    unit: "",
    in_price: "",
    price: "",
    vat: "",
    currency: "$",
    stock: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "name",
      "code",
      "unit",
      "in_price",
      "price",
      "vat",
      "stock",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].toString().trim() === "") {
        newErrors[field] = "-";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        code: formData.code.trim(),
        unit: formData.unit.trim(),
        in_price: Number(formData.in_price),
        price: Number(formData.price),
        vat: Number(formData.vat),
        currency: formData.currency.trim(),
        stock: parseInt(formData.stock),
        description: formData.description.trim() || undefined,
      };

      const result = await dispatch(createProduct(payload));

      if (result.payload && result.payload.success) {
        handleClose();
        dispatch(fetchProducts());
      } else {
        throw new Error(result.payload?.message);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      code: "",
      unit: "",
      in_price: "",
      price: "",
      vat: "",
      currency: "$",
      stock: "",
      description: "",
    });
    setErrors({});
    setOpenCreateDialog(false);
  };

  if (!openCreateDialog) return null;

  return (
    <div
      className="dialogOverlay"
      onClick={(e) => e.target.className === "dialogOverlay" && handleClose()}
    >
      <div className="createProductDialog">
        <div className="dialogHeader">
          <h2>{translations?.price_list?.new_product}</h2>
          <button className="closeButton" onClick={handleClose}>
            &times;
          </button>
        </div>

        <div className="dialogContent">
          <div className="formGrid">
            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.product_or_service}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={
                  translations?.price_list?.product_service_placeholder
                }
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="errorText">{errors.name}</span>}
            </div>

            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.article_number}
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => handleChange("code", e.target.value)}
                placeholder={
                  translations?.price_list?.article_number_placeholder
                }
                className={errors.code ? "error" : ""}
              />
              {errors.code && <span className="errorText">{errors.code}</span>}
            </div>

            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.in_price}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.in_price}
                onChange={(e) => handleChange("in_price", e.target.value)}
                placeholder={translations?.price_list?.in_price_placeholder}
                className={errors.in_price ? "error" : ""}
              />
              {errors.in_price && (
                <span className="errorText">{errors.in_price}</span>
              )}
            </div>

            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.price}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder={translations?.price_list?.price_placeholder}
                className={errors.price ? "error" : ""}
              />
              {errors.price && (
                <span className="errorText">{errors.price}</span>
              )}
            </div>

            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.unit}
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder={translations?.price_list?.unit_placeholder}
                className={errors.unit ? "error" : ""}
              />
              {errors.unit && <span className="errorText">{errors.unit}</span>}
            </div>

            <div className="formGroup">
              <label className="required">VAT (%)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="100"
                value={formData.vat}
                onChange={(e) => handleChange("vat", e.target.value)}
                placeholder="5.00"
                className={errors.vat ? "error" : ""}
              />
              {errors.vat && <span className="errorText">{errors.vat}</span>}
            </div>

            <div className="formGroup">
              <label className="required">
                {translations?.price_list?.in_stock}
              </label>
              <input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => handleChange("stock", e.target.value)}
                placeholder={translations?.price_list?.in_stock_placeholder}
                className={errors.stock ? "error" : ""}
              />
              {errors.stock && (
                <span className="errorText">{errors.stock}</span>
              )}
            </div>

            <div className="formGroup fullWidth">
              <label>
                {translations?.price_list?.description}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder={translations?.price_list?.description_placeholder}
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="dialogActions">
          <button
            className="cancelButton"
            onClick={handleClose}
            disabled={loading}
          >
            {translations?.price_list?.cancel}
          </button>
          <button
            className="createButton"
            onClick={handleSubmit}
            disabled={loading}
          >
            {translations?.price_list?.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductDialog;
