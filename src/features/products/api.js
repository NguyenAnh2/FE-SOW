import apiClient from "../../services/apiClient";

export const getProductsApi = (searchParams = {}) => {
  const params = new URLSearchParams();

  const searchTerms = [];
  if (searchParams.articleSearch) searchTerms.push(searchParams.articleSearch);
  if (searchParams.productSearch) searchTerms.push(searchParams.productSearch);

  if (searchTerms.length > 0) {
    params.append("search", searchTerms.join(" "));
  }

  if (searchParams.minPrice) {
    params.append("minPrice", searchParams.minPrice.trim());
  }
  if (searchParams.maxPrice) {
    params.append("maxPrice", searchParams.maxPrice.trim());
  }

  if (searchParams.sortBy) {
    params.append("sortBy", searchParams.sortBy);
  }
  if (searchParams.order) {
    params.append("order", searchParams.order);
  }

  const queryString = params.toString();
  return apiClient.get(`/products${queryString ? `?${queryString}` : ""}`);
};

export const exportProductsApi = (searchParams = {}) => {
  const params = new URLSearchParams();

  const searchTerms = [];
  if (searchParams.articleSearch) searchTerms.push(searchParams.articleSearch);
  if (searchParams.productSearch) searchTerms.push(searchParams.productSearch);

  if (searchTerms.length > 0) {
    params.append("search", searchTerms.join(" "));
  }

  if (searchParams.sortBy) {
    params.append("sortBy", searchParams.sortBy);
  }
  if (searchParams.order) {
    params.append("order", searchParams.order);
  }

  const queryString = params.toString();
  return apiClient.get(`/products/export${queryString ? `?${queryString}` : ""}`, {
    responseType: "blob",
  });
};

export const getProductApi = (id) => apiClient.get(`/products/${id}`);
export const createProductApi = (productData) => {
  return apiClient.post('/products', productData);
};
export const editProductApi = (id, payload) => apiClient.put(`/products/${id}`, payload);
export const deleteProductApi = (id) => apiClient.delete(`/products/${id}`);
