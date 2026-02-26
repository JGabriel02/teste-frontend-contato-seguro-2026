import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Popconfirm, message } from "antd";
import dayjs from "dayjs";

import {
  type Author,
  getAllAuthors,
  createAuthor,
  deleteAuthor, 
} from "../services/authorService";

export default function AuthorsPage() {
  // estado com a lista de autores exibida na tabela
  const [authors, setAuthors] = useState<Author[]>([]);
  // controla se o modal de criação está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);
  // instância do Form do antd para operações como submit/reset
  const [form] = Form.useForm();

  // função reutilizável para carregar autores do storage e atualizar estado
  async function loadAuthors() {
    const data = await getAllAuthors();
    setAuthors(data);
  }

  // carrega autores quando o componente monta
  useEffect(() => {
    // uso de IIFE async para chamar setAuthors de forma segura dentro do effect
    (async () => {
      const data = await getAllAuthors();
      setAuthors(data);
    })();
  }, []);

  // handler chamado quando o formulário de criação é enviado
  async function handleCreateAuthor(values: { name: string; email?: string }) {
    // monta o novo autor com id, nome, e data atual
    const newAuthor: Author = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      createdAt: dayjs().toISOString(),
    };

    // persiste o autor, mostra mensagem e atualiza a lista
    await createAuthor(newAuthor);
    message.success("Autor criado com sucesso");

    form.resetFields();
    setIsModalOpen(false);
    loadAuthors();
  }

  // handler para remover um autor (chama serviço e recarrega lista)
  async function handleDeleteAuthor(id: string) {
    await deleteAuthor(id);
    message.success("Autor removido");
    loadAuthors();
  }

  // definição das colunas da tabela exibida ao usuário
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Criado em",
      dataIndex: "createdAt",
      key: "createdAt",
      // formata a data para exibição legível
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Ações",
      key: "actions",
      // coluna com botões de ação por linha (ex.: excluir)
      render: (_: unknown, record: Author) => (
        <Popconfirm
          title="Tem certeza que deseja excluir?"
          onConfirm={() => handleDeleteAuthor(record.id)}
        >
          <Button danger>Excluir</Button>
        </Popconfirm>
      ),
    },
  ];

  // UI do componente
  return (
    <>
      <h1>Autores</h1>

      {/* botão que abre o modal para criar novo autor */}
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Novo Autor
      </Button>

      {/* tabela que lista os autores */}
      <Table
        style={{ marginTop: 20 }}
        dataSource={authors}
        columns={columns}
        rowKey="id"
      />

      {/* modal com formulário para criar autor */}
      <Modal
        title="Criar Autor"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateAuthor}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Nome é obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}