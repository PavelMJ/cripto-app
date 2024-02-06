import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { useCrypto } from "../../context/crypto-context";
import { useEffect, useState } from "react";
import CoinModalInfo from "../CoinModalInfo";
import CoinForm from "../CoinForm";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: "1rem",
  backgroundColor: "#001529",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoint] = useState(null);
  const [drawer, setDrawer] = useState(false);

  const { crypto } = useCrypto();

  const handleSelect = (value) => {
    console.log(value);
    setModal(true);
    setCoint(crypto.find((c) => c.id === value));
  };

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect(true);
      }
    };

    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 350,
        }}
        onSelect={handleSelect}
        open={select}
        onClick={() => {
          setSelect((prev) => !prev);
        }}
        value="press / to open"
        optionLabelProp="label"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.value}
          </Space>
        )}
      />
      <Modal
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
        footer={null}
      >
        <CoinModalInfo coin={coin} />
      </Modal>
      <Button
        type="primary"
        onClick={() => {
          setDrawer(true);
        }}
      >
        Add Coin
      </Button>

      <Drawer
        title="Add new Asset of Coin"
        onClose={() => {
          setDrawer(false);
        }}
        open={drawer}
        destroyOnClose
      >
        <CoinForm
          onClose={() => {
            setDrawer(false);
          }}
        />
      </Drawer>
    </Layout.Header>
  );
}
