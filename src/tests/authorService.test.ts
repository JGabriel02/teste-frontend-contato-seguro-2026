import { describe, it, expect, beforeEach, vi } from "vitest";
import storage from "../services/storage";
import { createAuthor, getAllAuthors, getAuthorById, deleteAuthor, type Author, } from "../services/authorService";

// 🔥 mock da função de cascade delete
vi.mock("./bookService", () => ({
  deleteBooksByAuthorId: vi.fn(),
}));

const AUTHORS_KEY = "authors";

describe("Author Service", () => {
  // limpa o banco antes de cada teste
  beforeEach(async () => {
    await storage.removeItem(AUTHORS_KEY);
    vi.clearAllMocks();
  });

  it("should create a new author", async () => {
    const mockAuthor: Author = {
      id: "1",
      code: 1,
      name: "Autor Teste",
      email: "autor@email.com",
      createdAt: new Date().toISOString(),
    };

    await createAuthor(mockAuthor);

    const authors = await getAllAuthors();

    expect(authors.length).toBe(1);
    expect(authors[0].name).toBe("Autor Teste");
    expect(authors[0].email).toBe("autor@email.com");
    expect(authors[0].id).toBe("1");
  });

  it("should return author by id", async () => {
    const mockAuthor: Author = {
      id: "2",
      code: 2,
      name: "Autor Busca",
      createdAt: new Date().toISOString(),
    };

    await createAuthor(mockAuthor);

    const author = await getAuthorById("2");

    expect(author).toBeDefined();
    expect(author?.name).toBe("Autor Busca");
  });

  it("should delete an author", async () => {
    const mockAuthor: Author = {
      id: "3",
      code: 3,
      name: "Autor Delete",
      createdAt: new Date().toISOString(),
    };

    await createAuthor(mockAuthor);

    await deleteAuthor("3");

    const authors = await getAllAuthors();

    expect(authors.length).toBe(0);
  });
});
