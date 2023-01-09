import { createContext, ReactNode } from "react";
import { useWindowSize } from "./common";

export const AppContext = createContext({ height: 0, style: {} });

type AppContextProviderPropTypes = {
  children: ReactNode;
};

export const AppContextProvider: React.FC<AppContextProviderPropTypes> = ({
  children,
}) => {
  const { height: windowHeight } = useWindowSize();

  return (
    <AppContext.Provider
      value={{
        height: windowHeight || 0,
        style: { height: `${windowHeight}px`, transition: "0.2s" },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
