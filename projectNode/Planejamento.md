## Planejando funcionalidades da aplicação

### Recuperação de senha

**Requisitos Funcionais - RF**

- O usuário poderá recuperar sua senha informando o seu email;
- O usuário receberá um e-mail com instruções de recuperação de senha;
- O usuário poderá resetar sua senha;

**Requisitos não funcionais - RNF**

- Utilizar o mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios de email em produção;
- O envio de emails deve acontecer em segundo plano (Background jobs);

**Regras de negócios - RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

---

### Atualização do perfil

**RF**

- O usuário deverá atualizar seu nome, email e senha;

**RNF**

**RN**

- O usuário não poderá alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deverá informar a senha antiga;
- Para atualizar sua senha, o usuário precisará confirmar a nova senha;

---

### Painel do prestador

**RF**

- O usuário poderá listar seus agendamentos de um um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador poderá  visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**

- A notificação deve ter status de lida ou não-lida para que o prestador possa controlar;

---

### Agendamento de serviços

**RF**

- O usuário poderá listar todos os prestadores de serviço cadastrados;
- O usuário poderá listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário poderá listar os horários disponíveis em um dia específico de um prestador;
- o usuário poderá realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache, evitando requisições desnecessárias.

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponíveis entre 8h às 18h ( Primeiro às 8h, último às 17h)
- O usuário não poderá agendar em um horário já ocupado;
- O usuário não poderá agendar um horário que já passou;
- o usuário não poderá agendar serviços com ele mesmo;
