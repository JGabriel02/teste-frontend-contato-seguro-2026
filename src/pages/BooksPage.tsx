import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message, Space } from "antd";
import dayjs from "dayjs";
import { getAllBooks, createBook, deleteBook } from "../services/bookService";
import type { Book } from "../services/bookService";
import { getAllAuthors, type Author } from "../services/authorService";
import ActionButtons from "../components/common/ActionButtons";

/**
 * Página de lista de livros: exibe tabela, permite criar, visualizar e deletar livros.
 */
export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [form] = Form.useForm();

  /**
   * Carrega livros e autores do storage e atualiza estados locais.
   */
  async function loadData() {
    const booksData = await getAllBooks();
    const authorsData = await getAllAuthors();

    setBooks(booksData);
    setAuthors(authorsData);
  }

  useEffect(() => {
    async function fetchData() {
      await loadData();
    }
    fetchData();
  }, []);

  /**
   * Resolve o nome do autor pelo seu id.
   * @param authorId id do autor
   */
  function getAuthorName(authorId: string) {
    const author = authors.find((a) => a.id === authorId);
    return author ? author.name : "Autor não encontrado";
  }

  /**
   * Handler para criação de livro a partir do formulário.
   * @param values valores do formulário (name, author_id, pages)
   */
  async function handleCreateBook(values: {
    name: string;
    author_id: string;
    pages?: string;
  }) {
    const lastCode =
      books.length > 0 ? Math.max(...books.map((b) => b.code)) : 0;

    const newBook: Book = {
      id: crypto.randomUUID(),
      code: lastCode + 1,
      name: values.name,
      author_id: values.author_id,
      pages: values.pages ? Number(values.pages) : undefined,
      createdAt: dayjs().toISOString(),
    };

    await createBook(newBook);
    message.success("Livro criado com sucesso");

    form.resetFields();
    setIsModalOpen(false);
    loadData();
  }

  /**
   * Remove um livro pelo id e atualiza a lista.
   * @param id id do livro a ser removido
   */
  async function handleDeleteBook(id: string) {
    await deleteBook(id);
    message.success("Livro removido");
    loadData();
  }

  /**
   * Define o livro selecionado e abre o modal de visualização.
   * @param book livro a ser visualizado
   */
  function handleViewBook(book: Book) {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  }

  const columns = [
    {
      title: "Código",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: Book) => (
        <ActionButtons
          onView={() => handleViewBook(record)}
          onDelete={() => handleDeleteBook(record.id)}
        />
      ),
    },
  ];

  return (
    <>
      <h1>Livros</h1>

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Novo Livro
      </Button>

      <Table
        style={{ marginTop: 20 }}
        dataSource={books}
        columns={columns}
        rowKey="id"
      />

      {/* Modal Criar Livro */}
      <Modal
        title="Criar Livro"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateBook}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Nome é obrigatório" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Autor"
            name="author_id"
            rules={[{ required: true, message: "Selecione um autor" }]}
          >
            <Select>
              {authors.map((author) => (
                <Select.Option key={author.id} value={author.id}>
                  {author.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Páginas" name="pages">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Visualizar Livro */}
      <Modal
        title="Detalhes do Livro"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={null}
      >
        {selectedBook && (
          <Space direction="vertical">
            <div>
              <strong>Nome:</strong> {selectedBook.name}
            </div>

            <div>
              <strong>Autor:</strong> {getAuthorName(selectedBook.author_id)}
            </div>

            <div>
              <strong>Páginas:</strong> {selectedBook.pages ?? "Não informado"}
            </div>

            <div>
              <strong>Adicionado em:</strong>{" "}
              {dayjs(selectedBook.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
          </Space>
        )}
      </Modal>
    </>
  );
}
