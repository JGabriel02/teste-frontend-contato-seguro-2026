import storage from "./storage";
import { deleteBooksByAuthorId } from "./bookService";

// formato (tipo) de um autor usado pela aplicação
export interface Author {
  // identificador único do autor
  id: string;
  // nome do autor
  code: number;
  // número sequencial visível
  name: string;
  // e-mail opcional
  email?: string;
  // data de criação/registro (string ISO)
  createdAt: string;
}

/**
 * Chave usada para salvar/recuperar autores no storage.
 * É uma aplicação key-value, então precisamos de uma chave fixa.
 */
const AUTHORS_KEY = "authors";

// Busca todos os autores salvos. Se não houver nada, retorna um array vazio.
export async function getAllAuthors(): Promise<Author[]> {
  const authors = await storage.getItem<Author[]>(AUTHORS_KEY);

  // garante que sempre retornamos um array
  return authors ?? [];
}

// Busca um autor específico pelo id — retorna undefined se não encontrar.
export async function getAuthorById(id: string): Promise<Author | undefined> {
  const authors = await getAllAuthors();
  return authors.find((author) => author.id === id);
}

// Cria um novo autor: lê a lista, adiciona o novo e persiste.
export async function createAuthor(newAuthor: Author): Promise<void> {
  const authors = await getAllAuthors();

  // adiciona o novo autor ao array existente
  const updatedAuthors = [...authors, newAuthor];

  // salva a lista atualizada no storage
  await storage.setItem(AUTHORS_KEY, updatedAuthors);
}

// Deleta um autor pelo id: filtra o array e persiste a nova lista.
export async function deleteAuthor(id: string): Promise<void> {
  const authors = await getAllAuthors();

  const filteredAuthors = authors.filter((author) => author.id !== id);

  await storage.setItem(AUTHORS_KEY, filteredAuthors);

  // delete em cascata
  await deleteBooksByAuthorId(id);
}
