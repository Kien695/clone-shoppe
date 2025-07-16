export const saveAccessTokenToLS = (access_token) => {
  localStorage.setItem("access_token", access_token);
};
export const clearToLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("profile");
};
export const getAccessTokenToLS = () => {
  return localStorage.getItem("access_token") || "";
};
export const saveProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
export const getProfileToLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};
