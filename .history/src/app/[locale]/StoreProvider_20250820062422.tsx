'use client';

import React from 'react';
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, initStore } from "../../store";

export default function StoreProvider({children}: {children: React.ReactNode}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = initStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
    </Provider>
  );
}
