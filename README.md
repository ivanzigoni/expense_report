Serviço para gerenciamento de desespesas.

Para iniciar a aplicação com uma instância do banco de dados e uma instância do redis através do docker-compose, rodar o comando `docker compose up -d`.

As migrations devem ser rodadas de forma manual, inclusive ao subir o container com uma imagem nova do banco de dados. O comando é `npm run migration:run`.

O token retornado para o login é um Bearer JWT.

---

Diagrama ER.

![db diagram](./assets/diagram.png)

---

Coleção de requisições para o Insomnia (JSON) em assets/routes_insomnia.json

Documentação da API através do Swagger disponível na rota /api (HTML).

![swagger document](./assets/swagger.png)

---

Cobertura de testes.

![test coverage](./assets/coverage.png)

---
