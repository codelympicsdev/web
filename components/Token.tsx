import { createContext, ReactNode, useContext } from 'react';

const TokenContext = createContext<string>(null);

export const TokenProvider = ({
  children,
  token,
}: {
  children: ReactNode | ReactNode[];
  token: string;
}) => <TokenContext.Provider value={token}>{children}</TokenContext.Provider>;

export const useToken = () => useContext(TokenContext);

export const useUserSignedIn = () => !!useToken();
