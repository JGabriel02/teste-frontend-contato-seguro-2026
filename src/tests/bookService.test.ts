import { describe, it, expect, beforeEach } from "vitest";
import storage from "../services/storage";
import { createBook, getAllBooks, getBookById, deleteBook, deleteBooksByAuthorId, type Book, } from "../services/bookService";

const BOOKS_KEY = "books";

describe("Book Service", () => {
  // limpa o storage antes de cada teste
  beforeEach(async () => {
    await storage.removeItem(BOOKS_KEY);
  });

  it("should create a new book", async () => {
    const mockBook: Book = {
      id: "1",
      code: 1,
      name: "Livro Teste",
      author_id: "10",
      pages: 200,
      createdAt: new Date().toISOString(),
    };

    await createBook(mockBook);

    const books = await getAllBooks();

    expect(books.length).toBe(1);
    expect(books[0].name).toBe("Livro Teste");
    expect(books[0].author_id).toBe("10");
    expect(books[0].pages).toBe(200);
  });

  it("should return book by id", async () => {
    const mockBook: Book = {
      id: "2",
      code: 2,
      name: "Livro Busca",
      author_id: "20",
      createdAt: new Date().toISOString(),
    };

    await createBook(mockBook);

    const book = await getBookById("2");

    expect(book).toBeDefined();
    expect(book?.name).toBe("Livro Busca");
  });

  it("should delete a book", async () => {
    const mockBook: Book = {
      id: "3",
      code: 3,
      name: "Livro Delete",
      author_id: "30",
      createdAt: new Date().toISOString(),
    };

    await createBook(mockBook);

    await deleteBook("3");

    const books = await getAllBooks();

    expect(books.length).toBe(0);
  });

  it("should delete all books from a specific author", async () => {
    const book1: Book = {
      id: "4",
      code: 4,
      name: "Livro Autor A",
      author_id: "100",
      createdAt: new Date().toISOString(),
    };

    const book2: Book = {
      id: "5",
      code: 5,
      name: "Livro Autor B",
      author_id: "200",
      createdAt: new Date().toISOString(),
    };

    await createBook(book1);
    await createBook(book2);

    await deleteBooksByAuthorId("100");

    const books = await getAllBooks();

    expect(books.length).toBe(1);
    expect(books[0].author_id).toBe("200");
  });
});
