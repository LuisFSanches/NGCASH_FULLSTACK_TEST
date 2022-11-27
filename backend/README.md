### Run Docker
Rode uma vez
docker network create ng_cash_network
```
Para começar o docker
npm run dc:up
```
Credenciais do postgres no docker podem ser vistas no docker-compose.yml

DB: postgres
USERNAME: postgres
PASSWORD: Test1234
```

### Database
No seu visualizador de banco de dados postgres
Verifique se a tabela ng_cash foi criada, caso não tenha sido crie a tabela.
Crie a tabela ng_cash_test, tabela para os testes de integração.
```

### Dependências
O foi projeto criado utilizando o node v16.16.
Instale as dependências, rode
npm install
```
```

### Migrations
Para ativar as migrations rode
npm run migration:run
```
```

### Para rodar a aplicação
npm run dev
```
```

### Para rodar os testes
npm run test
```
