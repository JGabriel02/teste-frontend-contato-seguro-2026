import localforage from "localforage";

const storage = localforage.createInstance({
  name: "crud-livros-autores-db", // nome do banco
  storeName: "keyvaluepairs", // store padrão 
});

export default storage;