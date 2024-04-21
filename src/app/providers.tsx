"use client";

import React, {useContext} from "react";
import WalletProvider from "@/app/WalletProvider";
import {ConfigContext, ConfigProvider} from "@/app/ConfigContext";

export function Providers({ children }: { children: React.ReactNode }) {
    const useConfig = (): Config | null => useContext(ConfigContext);


    return (
    <ConfigProvider>
      <WalletProvider>{children}</WalletProvider>
    </ConfigProvider>
  );
}
