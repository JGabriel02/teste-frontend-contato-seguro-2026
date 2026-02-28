import storage from "./storage";
import { deleteBooksByAuthorId } from "./bookService";

/**
 * Representa um autor na aplicação.
 * @property id Identificador único (UUID)
 * @property code Número sequencial visível
 * @property name Nome do autor
 * @property email E-mail opcional
 * @property createdAt Data de criação em ISO string
 */
export interface Author {
  id: string;
  code: number;
  name: string;
  email?: string;
  createdAt: string;
}

/**
 * Chave usada para salvar/recuperar autores no storage.
 */
const AUTHORS_KEY = "authors";

/**
 * Retorna todos os autores salvos.
 * @returns Promise<Author[]> lista de autores (array vazio se não houver)
 */
export async function getAllAuthors(): Promise<Author[]> {
  const authors = await storage.getItem<Author[]>(AUTHORS_KEY);
  return authors ?? [];
}

/**
 * Busca um autor pelo id.
 * @param id id do autor
 * @returns Promise<Author | undefined>
 */
export async function getAuthorById(id: string): Promise<Author | undefined> {
  const authors = await getAllAuthors();
  return authors.find((author) => author.id === id);
}

/**
 * Cria um novo autor e persiste a lista.
 * @param newAuthor Author a ser criado
 */
export async function createAuthor(newAuthor: Author): Promise<void> {
  const authors = await getAllAuthors();
  const updatedAuthors = [...authors, newAuthor];
  await storage.setItem(AUTHORS_KEY, updatedAuthors);
}

/**
 * Deleta um autor e seus livros em cascata.
 * @param id id do autor a ser removido
 */
export async function deleteAuthor(id: string): Promise<void> {
  const authors = await getAllAuthors();
  const filteredAuthors = authors.filter((author) => author.id !== id);
  await storage.setItem(AUTHORS_KEY, filteredAuthors);
  await deleteBooksByAuthorId(id);
}
