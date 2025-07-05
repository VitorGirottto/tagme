-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 05/07/2025 às 02:36
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `blog`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `comments`
--

INSERT INTO `comments` (`id`, `content`, `user_id`, `post_id`, `created_at`, `updated_at`) VALUES
(153, 'Muito bom mesmo, parabéns!', 7, 12, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(154, 'Gostei da explicação, bem clara.', 8, 13, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(155, 'Salvando aqui pra revisar depois.', 9, 14, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(156, 'Continue postando, conteúdo ótimo!', 10, 15, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(157, 'Esclareceu minha dúvida, obrigado.', 11, 16, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(158, 'Você explica muito bem!', 12, 17, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(159, 'Top demais!', 13, 18, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(160, 'Não sabia disso, valeu!', 14, 19, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(161, 'Ótimo resumo do assunto.', 15, 20, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(162, 'Sempre aprendo com seus posts.', 16, 21, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(163, 'Já compartilhei com amigos.', 17, 22, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(164, 'Excelente iniciativa!', 18, 23, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(165, 'Conteúdo valioso!', 19, 24, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(166, 'Mandou bem demais!', 20, 25, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(167, 'Simples e direto ao ponto.', 21, 26, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(168, 'Gostei da didática.', 22, 27, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(169, 'Esse post foi essencial pra mim.', 23, 28, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(170, 'Obrigado por compartilhar!', 24, 29, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(171, 'Muito bom, favoritado.', 25, 30, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(172, 'Continue assim, sucesso!', 26, 31, '2025-06-26 22:26:42', '2025-06-26 22:26:42'),
(176, 'Demita o Ian por favor', 27, 36, '2025-06-26 22:59:25', '2025-06-26 22:59:25');

-- --------------------------------------------------------

--
-- Estrutura para tabela `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `post_id`, `created_at`, `updated_at`) VALUES
(20, 7, 12, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(21, 8, 13, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(22, 9, 14, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(23, 10, 15, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(24, 11, 16, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(25, 12, 17, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(26, 13, 18, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(27, 14, 19, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(28, 15, 20, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(29, 16, 21, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(30, 17, 22, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(31, 18, 23, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(32, 19, 24, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(33, 20, 25, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(34, 21, 26, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(35, 22, 27, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(36, 23, 28, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(37, 24, 29, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(38, 25, 30, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(39, 26, 31, '2025-06-26 22:27:16', '2025-06-26 19:27:16'),
(41, 27, 20, '2025-06-26 22:28:31', '2025-06-26 22:28:31'),
(42, 27, 23, '2025-06-26 22:28:32', '2025-06-26 22:28:32'),
(44, 27, 12, '2025-06-26 22:48:23', '2025-06-26 22:48:23'),
(48, 27, 36, '2025-06-26 22:59:08', '2025-06-26 22:59:08'),
(53, 29, 12, '2025-06-26 23:59:53', '2025-06-26 23:59:53'),
(58, 29, 36, '2025-06-27 00:05:53', '2025-06-27 00:05:53'),
(59, 29, 18, '2025-06-27 00:07:01', '2025-06-27 00:07:01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `posts`
--

INSERT INTO `posts` (`id`, `title`, `content`, `author_id`, `created_at`, `updated_at`) VALUES
(12, 'Como comecei na programação', 'Neste post conto como foi minha jornada até aprender PHP e outras linguagens.', 7, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(13, 'Dicas para iniciantes em desenvolvimento web', 'Compartilho dicas que me ajudaram muito quando comecei na área.', 8, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(14, 'O que é back-end e por onde começar?', 'Uma introdução prática sobre o que é back-end e como estudar.', 9, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(15, 'Front-end vs Back-end: Diferenças e caminhos', 'Um post para entender de forma clara as áreas do desenvolvimento.', 10, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(16, 'Primeiros passos com Laravel', 'Como comecei a usar o Laravel e por que gosto tanto do framework.', 11, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(17, 'Entendendo o MVC com PHP', 'Explico como funciona o padrão MVC com exemplos práticos em PHP.', 12, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(18, 'Erros comuns de quem está começando', 'Uma lista com erros que cometi no início e como evitá-los.', 13, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(19, 'Como melhorar seu código com boas práticas', 'Dicas de boas práticas para tornar seu código mais limpo e eficiente.', 14, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(20, 'Introdução ao MySQL para desenvolvedores', 'Neste post, explico como começar a usar o MySQL e fazer consultas básicas.', 15, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(21, '5 extensões do VS Code que uso todos os dias', 'Lista das extensões que me ajudam a ser mais produtivo no VS Code.', 16, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(22, 'Como criar um sistema de login em PHP', 'Neste tutorial, crio um sistema de login simples e seguro usando PHP.', 17, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(23, 'Versionamento com Git na prática', 'Demonstro como uso o Git no dia a dia para versionar meus projetos.', 18, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(24, 'Como estudar programação com consistência', 'Falo sobre como mantenho uma rotina de estudos eficiente.', 19, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(25, 'Por que você deveria aprender lógica de programação primeiro', 'Explico a importância da lógica como base para qualquer linguagem.', 20, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(26, 'Criei meu primeiro CRUD com PHP e MySQL', 'Relato minha experiência criando um CRUD simples e o que aprendi.', 21, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(27, 'Como fazer deploy de um site simples', 'Passo a passo de como publiquei meu site PHP com banco de dados.', 22, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(28, 'Aprendendo orientação a objetos em PHP', 'Neste artigo explico os conceitos de OOP usando exemplos em PHP.', 23, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(29, 'Segurança em aplicações PHP', 'Dicas e práticas para evitar falhas comuns de segurança.', 24, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(30, 'Como usar sessions e cookies em PHP', 'Mostro como utilizar sessions e cookies para login e outras funcionalidades.', 25, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(31, 'Como fazer um blog com PHP do zero', 'Compartilho o passo a passo de como estou construindo um blog usando PHP e MySQL.', 26, '2025-06-26 22:20:05', '2025-06-26 22:20:05'),
(36, 'Olá', 'Seja bem vindo ao TAGME, Marcos Moretto! :)\n\n\n\n', 27, '2025-06-26 22:58:10', '2025-06-26 22:58:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `biography` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `biography`, `created_at`, `updated_at`) VALUES
(7, 'Ana Souza', 'ana.souza@example.com', '$2y$10$A1b2C3d4E5f6G7h8I9j0K1L2M3N4O5P6Q7R8S9T0U1', 'Desenvolvedora web apaixonada por PHP.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(8, 'Bruno Lima', 'bruno.lima@example.com', '$2y$10$X1y2Z3w4V5u6T7s8R9q0P1O2N3M4L5K6J7H8G9F0E1', 'Amo tecnologia e resolver problemas com código.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(9, 'Carla Mendes', 'carla.mendes@example.com', '$2y$10$Q1w2E3r4T5y6U7i8O9p0A1S2D3F4G5H6J7K8L9Z0X1', 'Apaixonada por UX/UI e desenvolvimento front-end.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(10, 'Daniel Rocha', 'daniel.rocha@example.com', '$2y$10$Z1x2C3v4B5n6M7l8K9j0H1G2F3D4S5A6P7O8I9U0Y1', 'Back-end developer com foco em segurança da informação.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(11, 'Elisa Tavares', 'elisa.tavares@example.com', '$2y$10$M1n2B3v4C5x6Z7l8K9j0H1G2F3D4S5A6Q7W8E9R0T1', 'Desenvolvedora full stack com experiência em Laravel.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(12, 'Fábio Alves', 'fabio.alves@example.com', '$2y$10$P1o2I3u4Y5t6R7e8W9q0A1S2D3F4G5H6J7K8L9Z0X1', 'Trabalho com APIs RESTful e banco de dados MySQL.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(13, 'Gabriela Dias', 'gabriela.dias@example.com', '$2y$10$N1m2L3k4J5h6G7f8D9s0A1Q2W3E4R5T6Y7U8I9O0P1', 'Entusiasta de tecnologia e inovação.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(14, 'Henrique Silva', 'henrique.silva@example.com', '$2y$10$A1s2D3f4G5h6J7k8L9z0X1C2V3B4N5M6Q7W8E9R0T1', 'Sou focado em desenvolvimento ágil e integração contínua.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(15, 'Isabela Torres', 'isabela.torres@example.com', '$2y$10$Z1x2C3v4B5n6M7l8K9j0H1G2F3D4S5A6P7O8I9U0Y1', 'Analista de sistemas e estudante de IA.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(16, 'João Pedro', 'joao.pedro@example.com', '$2y$10$X1y2Z3w4V5u6T7s8R9q0P1O2N3M4L5K6J7H8G9F0E1', 'Buscando sempre evoluir como dev.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(17, 'Karla Nunes', 'karla.nunes@example.com', '$2y$10$L1k2J3h4G5f6D7s8A9q0W1E2R3T4Y5U6I7O8P9Z0X1', 'Gosto de criar interfaces acessíveis e responsivas.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(18, 'Lucas Martins', 'lucas.martins@example.com', '$2y$10$M1n2B3v4C5x6Z7l8K9j0H1G2F3D4S5A6Q7W8E9R0T1', 'Especialista em back-end e otimização de queries SQL.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(19, 'Marina Costa', 'marina.costa@example.com', '$2y$10$P1o2I3u4Y5t6R7e8W9q0A1S2D3F4G5H6J7K8L9Z0X1', 'Sou apaixonada por desafios tecnológicos.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(20, 'Nicolas Araújo', 'nicolas.araujo@example.com', '$2y$10$N1m2L3k4J5h6G7f8D9s0A1Q2W3E4R5T6Y7U8I9O0P1', 'Trabalho com sistemas distribuídos e cloud.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(21, 'Olívia Freitas', 'olivia.freitas@example.com', '$2y$10$Q1w2E3r4T5y6U7i8O9p0A1S2D3F4G5H6J7K8L9Z0X1', 'Gosto de aprender e ensinar programação.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(22, 'Paulo Gomes', 'paulo.gomes@example.com', '$2y$10$Z1x2C3v4B5n6M7l8K9j0H1G2F3D4S5A6P7O8I9U0Y1', 'Dev front-end com foco em acessibilidade.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(23, 'Quésia Brito', 'quesia.brito@example.com', '$2y$10$X1y2Z3w4V5u6T7s8R9q0P1O2N3M4L5K6J7H8G9F0E1', 'Minha missão é conectar pessoas com tecnologia.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(24, 'Rafael Lacerda', 'rafael.lacerda@example.com', '$2y$10$A1s2D3f4G5h6J7k8L9z0X1C2V3B4N5M6Q7W8E9R0T1', 'Desenvolvedor Node.js e apaixonado por back-end.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(25, 'Sofia Andrade', 'sofia.andrade@example.com', '$2y$10$L1k2J3h4G5f6D7s8A9q0W1E2R3T4Y5U6I7O8P9Z0X1', 'Estudante de computação e desenvolvedora júnior.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(26, 'Thiago Pinto', 'thiago.pinto@example.com', '$2y$10$M1n2B3v4C5x6Z7l8K9j0H1G2F3D4S5A6Q7W8E9R0T1', 'Sempre explorando novas tecnologias e frameworks.', '2025-06-26 22:14:35', '2025-06-26 22:14:35'),
(27, 'ADM', 'adm@adm', '$2a$10$t4hT0Mf3EYNZyPRLlzg.2OeT/8ZMW57AXIofUE0f3nfFkIzKRZNMe', '', '2025-06-26 22:27:57', '2025-06-26 22:27:57'),
(29, 'testeee', 'adm@admadm', '$2a$10$Rom/TNosRplp9nOVZow5Le5mk6hBsqisVjBo3i.3WYu6q..e5HusG', '', '2025-06-26 23:59:45', '2025-06-26 23:59:45');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Índices de tabela `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`user_id`,`post_id`),
  ADD UNIQUE KEY `likes_user_id_post_id` (`user_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Índices de tabela `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- AUTO_INCREMENT de tabela `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
