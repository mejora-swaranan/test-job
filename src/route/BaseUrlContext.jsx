import { createContext, useContext, useState } from 'react';

const BaseUrlContext = createContext();

export const useBaseUrl = () => useContext(BaseUrlContext);

export const BaseUrlProvider = ({ children }) => {
    const [baseUrl, setBaseUrl] = useState('http://43.204.210.62:9092/api/v1');

    return (
        <BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>
            {children}
        </BaseUrlContext.Provider>
    );
};
