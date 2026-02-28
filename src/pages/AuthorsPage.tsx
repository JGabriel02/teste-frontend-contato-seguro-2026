import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { type Author, getAllAuthors, createAuthor, deleteAuthor, } from "../services/authorService";
import ActionButtons from "../components/common/ActionButtons";

/**
 * Página que lista autores, permite criar, visualizar e deletar.
 * Contém tabela, modal de criação e modal de visualização.
 */
export default function AuthorsPage() {
  // estado com a lista de autores exibida na tabela
  const [authors, setAuthors] = useState<Author[]>([]);
  // controla se o modal de criação está aberto
  const [isModalOpen, setIsModalOpen] = useState(false);
  // instância do Form do antd para operações como submit/reset
  const [form] = Form.useForm();
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  /**
   * Carrega todos os autores do storage e atualiza o estado local.
   */
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

  /**
   * Handler chamado quando o formulário de criação é submetido.
   * Cria um novo Author e atualiza a lista.
   * @param values valores do formulário (name, email?)
   */
  async function handleCreateAuthor(values: { name: string; email?: string }) {
    // monta o novo autor com id, nome, e data atual
    const lastCode =
      authors.length > 0 ? Math.max(...authors.map((a) => a.code)) : 0;

    const newAuthor: Author = {
      id: crypto.randomUUID(), // UUID
      code: lastCode + 1, // número visível
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

  /**
   * Remove um autor pelo id e atualiza a lista.
   * @param id id do autor a ser removido
   */
  async function handleDeleteAuthor(id: string) {
    await deleteAuthor(id);
    message.success("Autor removido");
    loadAuthors();
  }

  /**
   * Abre o modal de visualização mostrando os dados do autor informado.
   * @param author autor a ser visualizado
   */
  function handleViewAuthor(author: Author) {
    setSelectedAuthor(author);
    setIsViewModalOpen(true);
  }

  // definição das colunas da tabela exibida ao usuário
  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
      ellipsis: true, // evita quebrar layout
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Author) => (
        <ActionButtons
          onView={() => handleViewAuthor(record)}
          onDelete={() => handleDeleteAuthor(record.id)}
        />
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

      {/* modal separado para visualizar detalhes do autor */}
      <Modal
        title="Detalhes do Autor"
        open={isViewModalOpen}
        onCancel={() => {
          // fecha o modal de visualização e limpa o autor selecionado
          setIsViewModalOpen(false);
          setSelectedAuthor(null);
        }}
        footer={null}
      >
        {selectedAuthor && (
          <>
            <p>
              <strong>ID:</strong> {selectedAuthor.id}
            </p>
            <p>
              <strong>Nome:</strong> {selectedAuthor.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedAuthor.email || "Não informado"}
            </p>
            <p>
              <strong>Criado em:</strong>{" "}
              {dayjs(selectedAuthor.createdAt).format("DD/MM/YYYY HH:mm")}
            </p>
          </>
        )}
      </Modal>
    </>
  );
}
