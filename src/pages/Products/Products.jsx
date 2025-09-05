import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateProductDialog from "../../components/CreateProductDialog";
import DeleteProductDialog from "../../components/DeleteProductDialog";
import EditProductDialog from "../../components/EditProductDialog";
import ProductActions from "../../components/ProductActions";
import ProductsTable from "../../components/ProductsTable";
import { COLUMN_TO_FIELD_MAP, DEFAULT_SORT_CONFIG } from "../../constants";
import {
  fetchProducts,
  setSearchFilters,
} from "../../features/products/productsSlice";
import "./Products.css";
import { exportProductsApi } from "../../features/products/api";

export function Products() {
  const dispatch = useDispatch();
  const { translations } = useSelector((state) => state.language);
  const { list: products, loading } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useState({});
  const [articleSearch, setArticleSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(DEFAULT_SORT_CONFIG);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = () => {
    const newSearchParams = {
      articleSearch: articleSearch.trim(),
      productSearch: productSearch.trim(),
    };

    setSearchParams(newSearchParams);
    dispatch(setSearchFilters(newSearchParams));
    dispatch(fetchProducts({ ...newSearchParams, ...sortConfig }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchProductsWithSort = (params) => {
    dispatch(fetchProducts(params));
  };

  const handleSort = (columnKey) => {
    const fieldName = COLUMN_TO_FIELD_MAP[columnKey];
    if (!fieldName) return;

    let newOrder = "asc";

    if (sortConfig.sortBy === fieldName) {
      newOrder = sortConfig.order === "asc" ? "desc" : "asc";
    }

    const newSortConfig = {
      sortBy: fieldName,
      order: newOrder,
    };

    setSortConfig(newSortConfig);

    fetchProductsWithSort({
      ...searchParams,
      ...newSortConfig,
    });
  };

  const renderSortIcon = (columnKey) => {
    const fieldName = COLUMN_TO_FIELD_MAP[columnKey];
    if (sortConfig.sortBy === fieldName) {
      return sortConfig.order === "asc" ? (
        <span className="sort-icon active">↑</span>
      ) : (
        <span className="sort-icon active">↓</span>
      );
    }
  };

  const handleOpenOptions = (product, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const tableContainer = event.currentTarget
      .closest(".table-container")
      .getBoundingClientRect();

    setMenuPosition({
      top: rect.bottom - tableContainer.top + 5,
      left: rect.left - tableContainer.left - 150,
    });

    setSelectedProduct(product);
    setOpenOptions(openOptions === product.id ? null : product.id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openOptions &&
        !event.target.closest(".optionsMenu") &&
        !event.target.closest(".options-trigger")
      ) {
        setOpenOptions(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openOptions]);

  const handleExport = async () => {
    try {
      const res = await exportProductsApi({
        articleSearch: articleSearch.trim(),
        productSearch: productSearch.trim(),
        sortBy: "id",
        order: "asc",
      });

      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `products_export_${new Date().toISOString().split("T")[0]}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  return (
    <div className="productsContainer">
      <div className="productsContent">
        <h1 style={{ marginBottom: "12px" }}>
          {translations?.price_list?.products}
        </h1>
        <ProductActions
          translations={translations}
          articleSearch={articleSearch}
          setArticleSearch={setArticleSearch}
          productSearch={productSearch}
          setProductSearch={setProductSearch}
          setOpenCreateDialog={setOpenCreateDialog}
          handleKeyPress={handleKeyPress}
          handleSearch={handleSearch}
          handleExport={handleExport}
          loading={loading}
        />
        <ProductsTable
          products={products}
          translations={translations}
          handleSort={handleSort}
          renderSortIcon={renderSortIcon}
          openOptions={openOptions}
          setOpenOptions={setOpenOptions}
          menuPosition={menuPosition}
          handleOpenOptions={handleOpenOptions}
          setOpenEditDialog={setOpenEditDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
        {openCreateDialog && (
          <CreateProductDialog
            openCreateDialog={openCreateDialog}
            setOpenCreateDialog={setOpenCreateDialog}
            translations={translations}
          />
        )}

        {openEditDialog && (
          <EditProductDialog
            openEditDialog={openEditDialog}
            setOpenEditDialog={setOpenEditDialog}
            translations={translations}
            product={selectedProduct}
          />
        )}
        {openDeleteDialog && (
          <DeleteProductDialog
            openDeleteDialog={openDeleteDialog}
            setOpenDeleteDialog={setOpenDeleteDialog}
            translations={translations}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
}
