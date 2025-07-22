import http from "../utils/https";

export const getCategory = () => http.get("/categories");
