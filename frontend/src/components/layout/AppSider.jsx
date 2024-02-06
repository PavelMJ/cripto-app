import { capitalize } from "../../utils";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useContext } from "react";
import CriptoContext from "../../context/crypto-context";
const siderStyle = {
  // minWidth: 250,
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppSider() {
  const { assets } = useContext(CriptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map((asset) => (
        <Card
          key={asset.id}
          style={{
            width: "100%",
            margin: "0 0 1rem 0",
          }}
        >
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322 " }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />

          <List
            dataSource={[
              {
                title: "Total Profit",
                value: asset.totalProfit.toFixed(2) + "$",
                taged: true,
              },
              {
                title: "Coin Ammount",
                value: asset.amount.toFixed(2),
                taged: false,
              },
              // {
              //   title: "Deference",
              //   value: asset.percentage.toFixed(2) + "$",
              //   taged: true,
              // },
            ]}
            size="small"
            renderItem={(item) => (
              <List.Item>
                <span style={{ fontWeight: "bold", color: "grey" }}>
                  {item.title}
                </span>

                <span>
                  {item.taged && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.percentage.toFixed(1)}%
                    </Tag>
                  )}
                  {item.title === "Coin Ammount" && item.value}
                  {item.title !== "Coin Ammount" && (
                    <Typography.Text type={asset.grow ? "success" : "danger"}>
                      {item.value}
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
