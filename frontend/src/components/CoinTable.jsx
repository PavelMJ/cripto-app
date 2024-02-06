import { Table } from "antd";
import { useCrypto } from "../context/crypto-context";
import { capitalize } from "../utils";

export default function CoinTable() {
  const { assets } = useCrypto();

  // const headers = ["coin", "price", "amount", "tags"];

  const dataSource = assets.map((asset, i) => {
    return {
      key: i,
      coinName: capitalize(asset.id),
      price: +asset.price,
      amount: asset.totalAmount.toFixed(2),
      tags: asset.percentage,
    };
  });
  const columns = [
    {
      title: "Coin Name",
      dataIndex: "coinName",
      sorter: (a, b) => a.coinName.length - b.coinName.length,
      sortDirections: ["descend"],
    },
    {
      title: "Price -$-",
      dataIndex: "price",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params:", pagination, filters, sorter, extra);
  };
  return (
    <div className="CoinTable">
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={columns}
        onChange={onChange}
      />
    </div>
  );
}
