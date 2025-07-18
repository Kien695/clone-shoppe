import http from "../utils/https";

export const getProduct = (params) => http.get("/products", { params });
export const getProductDetail = (id) => http.get(`/products/${id}`);
