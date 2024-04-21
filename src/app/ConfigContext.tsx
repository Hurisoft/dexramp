"use client"

import React, { useState, useEffect, createContext, useContext } from 'react';
import {configEndpoint} from "@/services/app_urls";

export const ConfigContext = createContext<Config | null>(null);


export function ConfigProvider({children}: { children: React.ReactNode }) {
    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(configEndpoint);
                if (!response.ok) {
                    throw new Error('Failed to fetch config');
                }
                const data = await response.json();
                setConfig(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}

export const useAppConfig = (): Config | null => useContext(ConfigContext);
