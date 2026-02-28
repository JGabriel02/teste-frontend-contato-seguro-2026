import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { BookOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const { Sider, Content } = Layout;

/**
 * Layout principal da aplicação que renderiza a sidebar de navegação
 * e o conteúdo principal.
 * @param children conteúdo da página a ser renderizado no layout
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            {
              key: "/",
              icon: <UserOutlined />,
              label: <Link to="/">Autores</Link>,
            },
            {
              key: "/books",
              icon: <BookOutlined />,
              label: <Link to="/books">Livros</Link>,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
