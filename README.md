
    # Projeto: CRUD de Livros e Autores

    Esta é a implementação do desafio de front-end (aplicação SPA simples para gerenciar autores e livros).
    O projeto usa Vite + React (TypeScript) e persiste dados no navegador utilizando IndexedDB via `localforage`.

    ## Tecnologias
    - React 18 + TypeScript
    - Vite
    - Ant Design (UI)
    - Dayjs (datas)
    - localForage (IndexedDB wrapper)
    - Vitest (testes)
    - Docker (build para Nginx)

    ## Estrutura principal
    - `src/pages` — páginas: `AuthorsPage`, `BooksPage`.
    - `src/services` — serviços: `bookService`, `authorService`, `storage`.
    - `src/components` — componentes reutilizáveis (`ActionButtons`, `MainLayout`, etc.).
    - `src/routes` — roteamento da aplicação.

    ---

    ## Requisitos locais (recomendados)
    - Node.js >= 18
    - npm 9+ (ou gerenciador de pacotes equivalente)
    - Docker (opcional, para rodar via container)

    ## Rodando em modo desenvolvedor
    Abra um terminal (PowerShell) na raiz do projeto e execute:

    ```powershell
    npm install
    npm run dev
    ```

    Por padrão o Vite roda em http://localhost:5173 — o terminal informará a URL exata.

    ## Build de produção
    Gerar build de produção (gera a pasta `dist/`):

    ```powershell
    npm run build
    ```

    Você pode pré-visualizar o build com:

    ```powershell
    npm run preview
    ```

    ---

    ## Testes (Vitest)
    O projeto já tem configuração inicial do Vitest e alguns testes. Para rodar:

    ```powershell
    npm test          # executa os testes uma vez
    npm run test:watch # executa em modo watch
    ```

    Se os testes não forem encontrados, verifique se as dependências estão instaladas (`npm install`) e se os arquivos de teste seguem o padrão `*.test.*` dentro de `src/`.

    ---

    ## Docker — build e execução
    Há um `Dockerfile` que faz o build da aplicação e empacota o `dist/` em um servidor Nginx.

    Build da imagem (na raiz do projeto):

    ```powershell
    docker build -t teste-frontend-contato-seguro:latest .
    ```

    Executar o container (mapeando a porta 80):

    ```powershell
    docker run --rm -p 80:80 teste-frontend-contato-seguro:latest
    ```

    Abra http://localhost no seu navegador para ver a aplicação em produção (Nginx).

    Observações:
    - Use `--rm` para remover o container quando ele for parado automaticamente.
    - Se precisar ver logs, rode `docker ps` e depois `docker logs <container-id>`.

    ---

    ## Persistência de dados
    Os dados são salvos no navegador usando IndexedDB via `localforage`.
    - Arquivo principal: `src/services/storage.ts`
    - Serviços: `src/services/bookService.ts`, `src/services/authorService.ts`

    Isso significa que os dados são locais ao navegador — para resetar, limpe o IndexedDB nas DevTools do navegador.

    ---

    ## O que foi implementado
    - CRUD de Autores: criar, listar, visualizar, excluir.
    - CRUD de Livros: criar, listar, visualizar, excluir.
    - UI com Ant Design e validações básicas nos formulários.
    - Persistência via IndexedDB (localforage).
    - JSDoc e comentários em muitos arquivos para documentação.
    - Configuração inicial de testes com Vitest.
    - Dockerfile para gerar imagem estática servida por Nginx.

    

    
