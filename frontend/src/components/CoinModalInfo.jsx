import { Typography, Tag, Divider } from "antd";
import CoinInfo from "./CoinInfo";

// eslint-disable-next-line react/prop-types
export default function CoinModalInfo({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} withSymbol />

      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>
          1 hour
          <Tag
            color={coin.priceChange1h > 0 ? "green" : "red"}
            style={{ marginLeft: 5 }}
          >
            {coin.priceChange1h}
          </Tag>
        </Typography.Text>
        <Typography.Text strong>
          1 day
          <Tag
            color={coin.priceChange1d > 0 ? "green" : "red"}
            style={{ marginLeft: 5 }}
          >
            {coin.priceChange1d}
          </Tag>
        </Typography.Text>
        <Typography.Text strong>
          1 week
          <Tag
            color={coin.priceChange1w > 0 ? "green" : "red"}
            style={{ marginLeft: 5 }}
          >
            {coin.priceChange1w}
          </Tag>
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
          {" "}
          Price: {coin.price.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
          Price BTC: {coin.priceBtc.toFixed(2)}
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
          MarketCap: {coin.marketCap.toFixed(2)}$
        </Typography.Text>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>
          ContractAddress: {coin.contractAddress}
        </Typography.Text>
      </Typography.Paragraph>
    </>
  );
}
