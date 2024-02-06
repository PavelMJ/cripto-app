import { useContext, useEffect, useState } from "react";
import { percentDiference } from "../utils";
import { fakeFetchAssets, fakeFetchData } from "../api";

import { createContext } from "react";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
});

function mapAssets(assets, result) {
  return assets.map((asset) => {
    const coin = result.find((c) => c.id === asset.id);

    return {
      grow: coin.price > asset.price,
      percentage: percentDiference(+asset.price, coin.price),
      totalAmount: asset.amount * coin.price,
      totalProfit: asset.amount * coin.price - asset.amount * asset.price,
      ...asset,
    };
  });
}

// eslint-disable-next-line react/prop-types
export function CriproContextProvider({ children }) {
  const [loading, setloading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setloading(true);
    async function preLoad() {
      const { result } = await fakeFetchData();
      const assets = await fakeFetchAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setloading(false);
    }
    preLoad();
  }, []);

  function addNewAsset(newAsset) {
    setAssets(mapAssets([...assets, newAsset], crypto));
  }
  return (
    <CryptoContext.Provider value={{ loading, crypto, assets, addNewAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
