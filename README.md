# Site de Receitas :hamburger: :cocktail:

Site projetado pensado na pesquisa de receitas e criação de perfil para salvar receitas favoritas e marcar receitas já testadas.

## Objetivo

:fire: Testar e aperfeiçoar conhecimentos de JavaScript e React com Context e Hooks, além de aperfeiçoar aprendizados de testes automatizados com Cypress.

### Diferenciais

- Projeto dividido em diversas páginas: consulta, perfil, receitas favoritas e testadas, dividido também em componentes/elementos e utilizando como APIs de consulta TheMealDb e TheCocktailDb.
- Utilização de useState em diversas páginas da aplicação, conexão entre as páginas por useContext e useMemo.
- Implementação de diversos botões com filtros em pesquisas, utilizando também localStorage para guardar informações uteis e modificações visuais e atualizações de página com useEffect.
- Testes em Cypress cobrindo boa parte da visualização do site e de pesquisas usando todos os métodos disponíveis pelo componente `Search`. Verificando a amostra correta dos valores encontrados na API, tanto gerais quanto informações detalhadas de cada receita. Verificando também login e logout, além das páginas de receitas salvas mostrando corretamente seus valores.

### Scripts

Primeiro instale as dependências com o comando `npm install`

Depois rode o app com o comando `npm start`

Abra [http://localhost:3000](http://localhost:3000) pra ver o app rodando no seu browser.

Para rodar os testes em Cypress, rode o comando `npx cypress open`