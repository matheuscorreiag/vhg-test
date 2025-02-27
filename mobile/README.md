# Documentação do Projeto Mobile

## Visão Geral

Este projeto mobile foi desenvolvido utilizando React Native com Expo e Expo Router para roteamento, buscando agilidade no desenvolvimento do MVP. Para o estilo, foi escolhido o Nativewind. Além disso, foram utilizadas ferramentas amplamente reconhecidas no ecossistema React, como Zustand e TanStack Query (anteriormente React Query).

Uma decisão no desenvolvimento foi a integração do Zustand com o React Query. Isso permite que, cada vez que um item é adicionado ao carrinho, o Zustand receba esse item, facilitando o gerenciamento do estado do carrinho.

Os itens do carrinho são contados com base no ID do produto. Isso significa que, ao adicionar duas camisas, o carrinho as reconhecerá como um único produto.

## Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento mobile multiplataforma.
- **Expo:** Plataforma para desenvolvimento React Native que facilita a configuração e o deploy.
- **Expo Router:** Roteador para React Native que facilita a navegação entre telas.
- **Nativewind:** Biblioteca para utilizar Tailwind CSS com React Native.
- **Zustand:** Biblioteca para gerenciamento de estado simples e rápido.
- **TanStack Query (React Query):** Biblioteca para gerenciamento de cache e requisições de API.

## Configuração do Ambiente

### Pré-requisitos

- Expo CLI instalado globalmente.
- Node.js e NPM instalados.
- Simulador configurado (iOS ou Android) ou dispositivo físico.

### Instalação

1.  Clone o repositório do projeto.
2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Copie o arquivo `.env.example` e renomeie para `.env`. Configure as variáveis de ambiente necessárias.

### Execução

Para iniciar o aplicativo, utilize os seguintes comandos:

- **iOS:**

  ```bash
  npm run ios
  ```

- **Android:**

  ```bash
  npm run android
  ```

## Estrutura do Projeto

- `app/`: Rotas da aplicação (Expo Router).
- `src/`: Contém o código fonte do aplicativo.
  - `components/common/`: Componentes reutilizáveis e/ou complexos.
  - `icons/`: Ícones do Figma convertidos para JSX.
  - `constants/`: Constantes utilizadas na aplicação.
  - `data/`: Modelos de dados da API.
  - `hooks/`: Hooks para comunicação com serviços externos.
  - `libs/`: Gerenciamento de bibliotecas de terceiros.
  - `utils/`: Funções utilitárias.
  - `store/`: Configurações do Zustand.
- `app.json`: Configurações do Expo.
- `package.json`: Dependências e scripts do projeto.
- `.env`: Variáveis de ambiente.

## Melhorias

- Implementar testes
- Melhorar transições de tela
