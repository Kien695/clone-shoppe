import { createContext, useState } from "react";
import { getAccessTokenToLS, getProfileToLS } from "../utils/auth";

const initialAppContext = {
  isAuthenticated: Boolean(getAccessTokenToLS()),

  setIsAuthenticated: () => null,
  profile: getProfileToLS(),
  setProfile: () => null,
};

export const AppContext = createContext(initialAppContext);
export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    initialAppContext.isAuthenticated
  );
  const [profile, setProfile] = useState(initialAppContext.profile);

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  );
};
