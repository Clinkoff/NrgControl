# NRG Control

## Visão Geral
O NRG Control é uma aplicação web que permite o monitoramento em tempo real do consumo de energia de um computador, com foco em métricas como uso de CPU, memória e potência total consumida. A aplicação coleta dados de hardware, armazena-os em um banco de dados MySQL e apresenta os resultados em gráficos interativos, permitindo ao usuário analisar o consumo por diferentes períodos (dia, 7 dias, 1 mês). O objetivo é fornecer uma ferramenta eficiente para monitoramento de energia, ajudando os usuários a entenderem o impacto energético de seus dispositivos.

## Escopo
O projeto abrange o desenvolvimento de um sistema completo com backend e frontend:

- **Backend**: Uma API RESTful em Java com Spring Boot para coletar e armazenar dados de consumo.
- **Frontend**: Uma interface React para visualização dos dados em tempo real e históricos.
- **Banco de Dados**: MySQL para persistência de dados históricos.

## Funcionalidades Principais
- Monitoramento em tempo real do uso de CPU, memória e consumo energético.
- Armazenamento de dados históricos.
- Visualização de dados por intervalos (dia, 7 dias, 1 mês).
- Autenticação de usuários para acesso seguro.

## Tecnologias Utilizadas

### Backend
- **Java 17**: Linguagem principal para o backend.
- **Spring Boot 3**: Framework para construção da API RESTful.
- **Spring Data JPA**: Para interação com o banco de dados.
- **Spring Security**: Para autenticação e autorização.
- **MySQL**: Banco de dados relacional para armazenamento de dados.
- **OSHI**: Biblioteca para coleta de dados de hardware (CPU, memória, potência).
- **Maven**: Gerenciador de dependências e build.

### Frontend
- **React 18**: Biblioteca JavaScript para construção da interface.
- **Recharts**: Biblioteca para gráficos interativos.
- **Vite**: Ferramenta de build para o frontend.
- **Tailwind CSS**: Framework CSS para estilização.
- **Node.js 18+ e npm**: Para gerenciamento de pacotes e execução do frontend.

### Outras Ferramentas
- **Postman**: Para testes de API.
- **MySQL Workbench**: Para gerenciamento do banco de dados (opcional).
- **Git**: Controle de versão.

## Pré-requisitos para Rodar o Projeto

### Geral
- **Git**: Para clonar o repositório.
- **Java 17**: Para rodar o backend.
- **Node.js 18+ e npm**: Para rodar o frontend.
- **MySQL 8.0+**: Banco de dados configurado.

### Configuração do Banco de Dados
1. Instale o MySQL e crie um banco chamado `energy_monitoring`:
   ```sql
   CREATE DATABASE energy_monitoring;
