/**
 * Storage wrapper usado para persistir dados (localForage instance).
 * Fornece getItem / setItem usados pelos services.
 */
import storage from "./storage";

/**
 * Representa um livro na aplicação.
 * @property id Identificador único (UUID)
 * @property code Número sequencial visível no cadastro
 * @property name Título do livro
 * @property author_id ID do autor associado
 * @property pages Número de páginas (opcional)
 * @property createdAt Data de criação em ISO string
 */
export interface Book {
  id: string;
  code: number;
  name: string;
  author_id: string;
  pages?: number;
  createdAt: string;
}

// chave usada para armazenar a lista de livros no storage
const BOOKS_KEY = "books";

/**
 * Retorna todos os livros salvos.
 * @returns Promise<Book[]> lista de livros (array vazio se não houver)
 */
export async function getAllBooks(): Promise<Book[]> {
  const books = await storage.getItem<Book[]>(BOOKS_KEY);
  return books ?? [];
}

/**
 * Busca um livro pelo id.
 * @param id id do livro
 * @returns Promise<Book | undefined> o livro ou undefined se não encontrado
 */
export async function getBookById(id: string): Promise<Book | undefined> {
  const books = await getAllBooks();
  return books.find((book) => book.id === id);
}

/**
 * Adiciona um novo livro e persiste a lista.
 * @param newBook objeto Book a ser adicionado
 */
export async function createBook(newBook: Book): Promise<void> {
  const books = await getAllBooks();
  const updatedBooks = [...books, newBook];
  await storage.setItem(BOOKS_KEY, updatedBooks);
}

/**
 * Remove um livro pelo id.
 * @param id id do livro a remover
 */
export async function deleteBook(id: string): Promise<void> {
  const books = await getAllBooks();
  const filteredBooks = books.filter((book) => book.id !== id);
  await storage.setItem(BOOKS_KEY, filteredBooks);
}

/**
 * Remove todos os livros de um autor específico (delete em cascata).
 * @param authorId id do autor cujos livros serão removidos
 */
export async function deleteBooksByAuthorId(authorId: string): Promise<void> {
  const books = await getAllBooks();
  const filteredBooks = books.filter((book) => book.author_id !== authorId);
  await storage.setItem(BOOKS_KEY, filteredBooks);
}
