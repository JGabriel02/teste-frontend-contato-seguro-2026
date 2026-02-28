import localforage from "localforage";

/**
 * Instância de storage baseada em localforage usada pela aplicação.
 * A configuração cria um banco local com nome e store padrão.
 * Exportamos a instância para ser usada pelos services (getItem/setItem).
 */
const storage = localforage.createInstance({
  name: "crud-livros-autores-db",
  storeName: "keyvaluepairs",
});

export default storage;