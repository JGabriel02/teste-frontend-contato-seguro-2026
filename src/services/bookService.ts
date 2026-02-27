// importa o módulo de storage que encapsula getItem/setItem (por exemplo localStorage)
import storage from "./storage";

// definição do formato (tipo) de um livro usado na aplicação
export interface Book {
  // identificador único do livro
  id: string;
     // número sequencial visível
    code: number; 
  // título/nome do livro
  name: string;
  // id do autor associado (chave estrangeira)
  author_id: string;
  // número de páginas (opcional)
  pages?: number;
  // data de criação/registro do livro (string ISO)
  createdAt: string;
}

// chave usada para armazenar a lista de livros no storage
const BOOKS_KEY = "books";

// retorna todos os livros salvos. Se não houver nada, retorna array vazio.
export async function getAllBooks(): Promise<Book[]> {
  const books = await storage.getItem<Book[]>(BOOKS_KEY);
  // operador de coalescência para garantir que sempre volte um array
  return books ?? [];
}

// busca um livro específico pelo seu id — retorna undefined se não encontrado
export async function getBookById(id: string): Promise<Book | undefined> {
  const books = await getAllBooks();
  return books.find((book) => book.id === id);
}

// adiciona um novo livro à lista e persiste no storage
export async function createBook(newBook: Book): Promise<void> {
  const books = await getAllBooks();
  const updatedBooks = [...books, newBook];
  await storage.setItem(BOOKS_KEY, updatedBooks);
}

// remove um livro pelo id e salva a lista filtrada
export async function deleteBook(id: string): Promise<void> {
  const books = await getAllBooks();
  const filteredBooks = books.filter((book) => book.id !== id);
  await storage.setItem(BOOKS_KEY, filteredBooks);
}

/**
 * Remove todos os livros de um autor específico
 * (usado para delete em cascata)
 */
export async function deleteBooksByAuthorId(authorId: string): Promise<void> {
  // obtém todos os livros e filtra os que NÃO pertencem ao authorId
  const books = await getAllBooks();
  const filteredBooks = books.filter(
    (book) => book.author_id !== authorId
  );
  // persiste a lista atualizada sem os livros do autor removido
  await storage.setItem(BOOKS_KEY, filteredBooks);
}