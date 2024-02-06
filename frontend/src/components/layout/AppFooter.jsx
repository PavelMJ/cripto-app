import React from "react";
import { Layout } from "antd";

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

export default function AppFooter() {
  return (
    <div>
      <Layout.Footer style={footerStyle}>Footer</Layout.Footer>
    </div>
  );
}
