# SIGA — Sistema de Gestão de Associados

Projeto académico desenvolvido na Universidade de Cabo Verde (Uni-CV)
Disciplina: Tecnologias de Desenvolvimento Web II

## Grupo
- Flávio Barbosa — Módulo 6 (Gestão de Utilizadores)
- Miriam — Módulo 5 (Dashboard)
- Sandy — Módulo 4 (Recibos e Financeiro)
- Euline — Módulo 3 (Gestão de Atividades)
- Rafael — Módulo 2 (Gestão de Quotas)
- Marisia — Módulo 1 (Admissão de Associados)

## Tecnologias utilizadas
- Node.js
- Express.js
- EJS
- MySQL
- Sequelize
- Bootstrap 5

## Requisitos
- Node.js instalado
- XAMPP instalado

## Instalação

### 1. Clonar o repositório
git clone https://github.com/flaviobarbosa-coder/SIGA-projeto.git
cd SIGA-projeto

### 2. Instalar dependências
npm install

### 3. Criar a base de dados
- Abrir o XAMPP e iniciar Apache e MySQL
- Ir a http://localhost/phpmyadmin
- Criar base de dados chamada siga_db
- Importar o ficheiro database/siga_db.sql

### 4. Iniciar o servidor
node app.js

### 5. Abrir no browser
http://localhost:3000

## Credenciais de teste
- admin@siga.cv / password123 — Administrador
- financeiro@siga.cv / password123 — Gestor Financeiro
- atividades@siga.cv / password123 — Gestor de Atividades
- direcao@siga.cv / password123 — Direção
- associados@siga.cv / password123 — Gestor de Associados

## Módulos
1. Admissão e Gestão de Associados
2. Gestão de Quotas e Pagamentos
3. Gestão de Atividades
4. Emissão de Recibos e Financeiro
5. Dashboard e Monitorização
6. Gestão de Utilizadores e Controlo de Acessos