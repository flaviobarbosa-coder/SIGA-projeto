-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/06/2026 às 15:05
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `siga_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `associados`
--

CREATE TABLE `associados` (
  `id` int(11) NOT NULL,
  `utilizador_id` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` enum('fisica','juridica') NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `nif` varchar(20) DEFAULT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `estado` enum('rascunho','submetida','em_analise','aprovada','rejeitada','activo') DEFAULT 'rascunho',
  `data_criacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atividades`
--

CREATE TABLE `atividades` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` enum('conferencia','workshop','formacao','transferencia') NOT NULL,
  `descricao` text DEFAULT NULL,
  `data` date NOT NULL,
  `vagas` int(11) NOT NULL,
  `estado` enum('programada','em_curso','concluida') DEFAULT 'programada'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `inscricoes`
--

CREATE TABLE `inscricoes` (
  `id` int(11) NOT NULL,
  `associado_id` int(11) NOT NULL,
  `atividade_id` int(11) NOT NULL,
  `estado` enum('pendente','aprovada','rejeitada') DEFAULT 'pendente',
  `data_inscricao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `log_auditoria`
--

CREATE TABLE `log_auditoria` (
  `id` int(11) NOT NULL,
  `utilizador_id` int(11) DEFAULT NULL,
  `acao` varchar(255) NOT NULL,
  `data_hora` datetime DEFAULT current_timestamp(),
  `ip` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamentos`
--

CREATE TABLE `pagamentos` (
  `id` int(11) NOT NULL,
  `associado_id` int(11) NOT NULL,
  `tipo` enum('quota','atividade') NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `estado` enum('pendente','confirmado','rejeitado') DEFAULT 'pendente',
  `data_pagamento` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `quotas`
--

CREATE TABLE `quotas` (
  `id` int(11) NOT NULL,
  `associado_id` int(11) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `periodo` enum('mensal','trimestral','anual') NOT NULL,
  `estado` enum('pendente','pago','atrasado') DEFAULT 'pendente',
  `data_vencimento` date NOT NULL,
  `data_pagamento` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `recibos`
--

CREATE TABLE `recibos` (
  `id` int(11) NOT NULL,
  `pagamento_id` int(11) NOT NULL,
  `numero_recibo` varchar(50) NOT NULL,
  `data_emissao` datetime DEFAULT current_timestamp(),
  `valor` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `utilizadores`
--

CREATE TABLE `utilizadores` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `perfil` enum('admin','gestor_associados','gestor_financeiro','gestor_atividades','direcao','associado') NOT NULL,
  `estado` enum('ativo','inativo','bloqueado') DEFAULT 'ativo',
  `tentativas_login` int(11) DEFAULT 0,
  `data_criacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `associados`
--
ALTER TABLE `associados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `utilizador_id` (`utilizador_id`);

--
-- Índices de tabela `atividades`
--
ALTER TABLE `atividades`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `associado_id` (`associado_id`),
  ADD KEY `atividade_id` (`atividade_id`);

--
-- Índices de tabela `log_auditoria`
--
ALTER TABLE `log_auditoria`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilizador_id` (`utilizador_id`);

--
-- Índices de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `associado_id` (`associado_id`);

--
-- Índices de tabela `quotas`
--
ALTER TABLE `quotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `associado_id` (`associado_id`);

--
-- Índices de tabela `recibos`
--
ALTER TABLE `recibos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero_recibo` (`numero_recibo`),
  ADD KEY `pagamento_id` (`pagamento_id`);

--
-- Índices de tabela `utilizadores`
--
ALTER TABLE `utilizadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `associados`
--
ALTER TABLE `associados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atividades`
--
ALTER TABLE `atividades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `inscricoes`
--
ALTER TABLE `inscricoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `log_auditoria`
--
ALTER TABLE `log_auditoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pagamentos`
--
ALTER TABLE `pagamentos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `quotas`
--
ALTER TABLE `quotas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `recibos`
--
ALTER TABLE `recibos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `utilizadores`
--
ALTER TABLE `utilizadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `associados`
--
ALTER TABLE `associados`
  ADD CONSTRAINT `associados_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores` (`id`);

--
-- Restrições para tabelas `inscricoes`
--
ALTER TABLE `inscricoes`
  ADD CONSTRAINT `inscricoes_ibfk_1` FOREIGN KEY (`associado_id`) REFERENCES `associados` (`id`),
  ADD CONSTRAINT `inscricoes_ibfk_2` FOREIGN KEY (`atividade_id`) REFERENCES `atividades` (`id`);

--
-- Restrições para tabelas `log_auditoria`
--
ALTER TABLE `log_auditoria`
  ADD CONSTRAINT `log_auditoria_ibfk_1` FOREIGN KEY (`utilizador_id`) REFERENCES `utilizadores` (`id`);

--
-- Restrições para tabelas `pagamentos`
--
ALTER TABLE `pagamentos`
  ADD CONSTRAINT `pagamentos_ibfk_1` FOREIGN KEY (`associado_id`) REFERENCES `associados` (`id`);

--
-- Restrições para tabelas `quotas`
--
ALTER TABLE `quotas`
  ADD CONSTRAINT `quotas_ibfk_1` FOREIGN KEY (`associado_id`) REFERENCES `associados` (`id`);

--
-- Restrições para tabelas `recibos`
--
ALTER TABLE `recibos`
  ADD CONSTRAINT `recibos_ibfk_1` FOREIGN KEY (`pagamento_id`) REFERENCES `pagamentos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
