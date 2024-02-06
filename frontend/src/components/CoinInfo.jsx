import { Flex, Typography } from "antd";

// eslint-disable-next-line react/prop-types
export default function CoinInfo({ coin, withSymbol }) {
  return (
    <Flex>
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 35, height: 35, marginRight: 10 }}
      />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && coin.symbol}
        {coin.name}
      </Typography.Title>
    </Flex>
  );
}
