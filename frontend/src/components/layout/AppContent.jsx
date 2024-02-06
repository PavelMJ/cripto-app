// import React from "react";
import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import CryptoChart from "../CryptoChart";
import CoinTable from "../CoinTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
  color: "#fff",
  backgroundColor: "#001529",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  console.log(assets);
  console.log(crypto);
  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, val) => (acc += val), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <CryptoChart />
      <CoinTable />
    </Layout.Content>
  );
}
