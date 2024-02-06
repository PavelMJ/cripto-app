import { useRef, useState } from "react";
import { useCrypto } from "../context/crypto-context";
import {
  Select,
  Space,
  Divider,
  Form,
  DatePicker,
  InputNumber,
  Button,
  Result,
} from "antd";
import CoinInfo from "./CoinInfo";

// eslint-disable-next-line react/prop-types
export default function CoinForm({ onClose }) {
  const [form] = Form.useForm();
  const { crypto, addNewAsset } = useCrypto();
  const [coin, setCoin] = useState(null);
  const [submited, setSubmited] = useState(false);
  const assetRef = useRef();
  if (submited) {
    return (
      <Result
        status="success"
        title="New Asset was added"
        subTitle={`adde ${assetRef.current.amount} coins of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        onSelect={(val) => {
          setCoin(crypto.find((c) => c.id === val));
        }}
        placeholder="Press to choose a coin"
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
    );
  }

  function onFinish(value) {
    const newAsset = {
      id: coin.id,
      amount: value.amount,
      price: value.price,
      date: value.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    console.log(value);
    setSubmited(true);
    addNewAsset(newAsset);
  }

  const validateMassage = {
    required: "${label} is required",
    type: {
      number: "${label} is not a number",
    },
    number: {
      range: "${label} have to be not less than ${min}",
    },
  };

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    });
  }
  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="Coin form"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMassage}
    >
      <CoinInfo coin={coin} />

      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            // message: "Input price!",
            min: 0,
            type: "number",
          },
        ]}
      >
        <InputNumber
          placeholder="Enter Amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber style={{ width: "100%" }} onChange={handlePriceChange} />
      </Form.Item>
      <Form.Item label="Date & Time" name="date">
        <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber style={{ width: "100%" }} disabled />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
