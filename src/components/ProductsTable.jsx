const ProductsTable = ({
  products,
  translations,
  handleSort,
  renderSortIcon,
  openOptions,
  setOpenOptions,
  menuPosition,
  handleOpenOptions,
  setOpenEditDialog,
  setOpenDeleteDialog,
}) => {
  const handleOpenEditProduct = () => {
    setOpenOptions(false);
    setOpenEditDialog(true);
  };

  const handleOpenDeleteProduct = () => {
    setOpenOptions(false);
    setOpenDeleteDialog(true);
  };

  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th
              className="articleNumber sortable"
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => handleSort("articleNumber")}
            >
              {translations?.price_list?.article_number}
              {renderSortIcon("articleNumber")}
            </th>

            <th
              className="nameProduct sortable"
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("nameProduct")}
            >
              {translations?.price_list?.product_or_service}
              {renderSortIcon("nameProduct")}
            </th>

            <th
              className="inPrice sortable"
              style={{ width: "100px", cursor: "pointer" }}
              onClick={() => handleSort("inPrice")}
            >
              {translations?.price_list?.in_price}
              {renderSortIcon("inPrice")}
            </th>

            <th
              style={{ width: "100px", cursor: "pointer" }}
              className="sortable"
              onClick={() => handleSort("price")}
            >
              {translations?.price_list?.price}
              {renderSortIcon("price")}
            </th>

            <th
              className="unit sortable"
              style={{ width: "80px", cursor: "pointer" }}
              onClick={() => handleSort("unit")}
            >
              {translations?.price_list?.unit}
              {renderSortIcon("unit")}
            </th>

            <th
              className="stock sortable"
              style={{ width: "140px", cursor: "pointer" }}
              onClick={() => handleSort("stock")}
            >
              {translations?.price_list?.in_stock}
              {renderSortIcon("stock")}
            </th>

            <th
              className="description sortable"
              style={{ width: "150px", cursor: "pointer" }}
              onClick={() => handleSort("description")}
            >
              {translations?.price_list?.description}
              {renderSortIcon("description")}
            </th>

            <th style={{ width: "10px" }}></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={`${product.id}-${product.code}`}>
              <td
                className="articleNumber"
                style={{
                  width: "150px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                title={product.code}
              >
                {product.code}
              </td>

              <td
                className="nameProduct"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
                title={product.name}
              >
                {product.name}
              </td>

              <td className="inPrice" style={{ width: "100px" }}>
                {product.currency}
                {product.in_price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>

              <td style={{ width: "100px" }}>
                {product.currency}
                {product.price?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>

              <td className="unit" style={{ width: "80px" }}>
                {product.unit}
              </td>

              <td className="stock" style={{ width: "140px" }}>
                {product.stock}
              </td>

              <td
                className="description"
                style={{
                  width: "150px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
                title={product.description}
              >
                {product.description || "--"}
              </td>

              <td
                className="options-trigger"
                onClick={(e) => handleOpenOptions(product, e)}
                style={{
                  cursor: "pointer",
                  userSelect: "none",
                  fontWeight: "bold",
                  fontSize: "20px",
                  border: "none",
                  color: "#267DF0",
                }}
              >
                ...
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openOptions && (
        <div
          className="optionsMenu"
          style={{
            position: "absolute",
            top: menuPosition.top,
            left: menuPosition.left,
          }}
        >
          <div className="editProductDialogBtn" onClick={handleOpenEditProduct}>
            {translations?.price_list?.edit_product}
          </div>
          <div
            className="deleteProductDialogBtn"
            onClick={handleOpenDeleteProduct}
          >
            {translations?.price_list?.delete_product}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
