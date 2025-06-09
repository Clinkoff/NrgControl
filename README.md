# NRG Control

## Visão Geral
O NRG Control é uma aplicação web que permite o monitoramento em tempo real do consumo de energia de um computador, com foco em métricas como uso de CPU, memória e potência total consumida. A aplicação coleta dados de hardware, armazena-os em um banco de dados MySQL e apresenta os resultados em gráficos interativos, permitindo ao usuário analisar o consumo por diferentes períodos (dia, 7 dias, 1 mês). O objetivo é fornecer uma ferramenta eficiente para monitoramento de energia, ajudando os usuários a entenderem o impacto energético de seus dispositivos.

## Escopo
O projeto abrange o desenvolvimento de um sistema completo com backend e frontend:

- **Backend**: Uma API RESTful em Java com Spring Boot para coletar e armazenar dados de consumo.
- **Frontend**: Uma interface React para visualização dos dados em tempo real e históricos.
- **Banco de Dados**: MySQL para persistência de dados históricos.

## Problema

Em um cenário onde os custos com energia elétrica representam uma parcela significativa das despesas mensais, muitos consumidores (sejam indivíduos ou pequenas empresas) enfrentam o desafio de **contas de luz elevadas** sem compreenderem a **origem exata** de seus gastos. A falta de visibilidade sobre o consumo de energia de seus dispositivos eletrônicos, como computadores, impede a identificação de 'vilões' no consumo e a tomada de decisões informadas para otimizar o uso da energia.

Sem ferramentas de monitoramento eficientes, torna-se difícil para o usuário:

- **Identificar quais equipamentos consomem mais energia** em determinados períodos.
- **Entender o padrão de consumo** de seus dispositivos ao longo do dia, da semana ou do mês.
- **Calcular o impacto financeiro real** do uso contínuo de um computador.
- **Determinar se a manutenção ou a substituição** de um dispositivo específico por um mais eficiente seria, de fato, economicamente vantajosa.

Essa lacuna de conhecimento leva a um desperdício energético potencial e à impossibilidade de implementar estratégias eficazes de economia, resultando em surpresas desagradáveis na fatura de energia e na sensação de descontrole sobre os gastos. O problema reside na invisibilidade do consumo energético, que impede ações proativas para a redução de custos e a promoção de hábitos mais sustentáveis.

---
# Requisitos Funcionais (RFs) - NRG Control

Os Requisitos Funcionais detalham as funcionalidades e serviços que o sistema NRG Control deve fornecer, descrevendo o que o usuário pode fazer e como o sistema deve responder.

## RF001: Autenticação de Usuário

**Descrição:** O sistema deve permitir que os usuários façam login para acessar as funcionalidades restritas.

**Atores:** Usuário

**Pré-condições:** O usuário possui um cadastro prévio no sistema.

**Pós-condições:** O usuário é autenticado e redirecionado para a HomePage ou recebe uma mensagem de erro em caso de falha.

**Detalhes:**
- O usuário deve fornecer credenciais válidas (usuário e senha).
- Em caso de credenciais inválidas, o sistema deve exibir uma mensagem de erro clara.

## RF002: Registro de Usuário

**Descrição:** O sistema deve permitir que novos usuários se registrem na aplicação.

**Atores:** Usuário

**Pré-condições:** Nenhuma.

**Pós-condições:** Um novo registro de usuário é criado no banco de dados e o usuário pode fazer login.

**Detalhes:**
- O usuário deve preencher um formulário com as informações necessárias (ex: nome de usuário, senha, e-mail).
- O sistema deve validar os dados de entrada (ex: formato de e-mail, complexidade da senha).

## RF003: Acesso ao Dashboard de Monitoramento

**Descrição:** O usuário deve ser capaz de acessar o dashboard de monitoramento de energia.

**Atores:** Usuário

**Pré-condições:** O usuário está logado no sistema.

**Pós-condições:** O dashboard é carregado com as informações de monitoramento em tempo real ou mensagem de erro se os dados não puderem ser carregados.

**Detalhes:**
- Pode ser acessado através do "resumo semanal" na HomePage.
- Pode ser acessado através da opção "Dashboard" na barra de navegação (navBar).

## RF004: Exibição de Métricas em Tempo Real

**Descrição:** O dashboard deve exibir as métricas de consumo de energia em tempo real.

**Atores:** Usuário

**Pré-condições:** O usuário acessou o dashboard.

**Pós-condições:** Gráficos interativos exibindo "Uso da CPU (%)", "Uso de Memória (MB)" e "Consumo (W)" são apresentados e atualizados.

**Detalhes:**
- As métricas devem ser atualizadas a cada 10 segundos.
- As métricas coletadas incluem Uso da CPU (%), Uso da Memória (MB) e Consumo de Potência (Watts).
- A visualização será conforme a imagem1.
- Ao passar o mouse (hover) sobre os gráficos, detalhes específicos dos pontos de dados (ex: valor e horário) devem ser exibidos.

## RF005: Cálculo e Exibição de Custo Estimado

**Descrição:** O sistema deve calcular e exibir o custo estimado do consumo de energia.

**Atores:** Usuário

**Pré-condições:** Dados de consumo de Watts estão disponíveis.

**Pós-condições:** O custo estimado de consumo é exibido no dashboard.

**Detalhes:**
- O cálculo envolve a conversão de Watts para KWh e a multiplicação pelo valor da tarifa.

## RF006: Armazenamento de Dados Históricos

**Descrição:** O sistema deve armazenar os dados de monitoramento de forma histórica.

**Atores:** Sistema

**Pré-condições:** Dados de monitoramento são coletados.

**Pós-condições:** Os dados são persistidos no banco de dados MySQL.

**Detalhes:**
- A granularidade de armazenamento é a cada 10 segundos.
- Os dados serão armazenados até que uma limpeza de cache ou um "truncate" do banco de dados seja realizado.

## RF007: Exibição do Resumo Semanal

**Descrição:** O sistema deve apresentar um resumo semanal do consumo de energia em um dashboard.

**Atores:** Usuário

**Pré-condições:** Dados históricos de consumo estão disponíveis.

**Pós-condições:** O resumo semanal é exibido, contendo o consumo total, a média diária e o pico de consumo da semana.

## RF008: Visualização de Artigos

**Descrição:** O sistema deve permitir que os usuários visualizem artigos informativos.

**Atores:** Usuário

**Pré-condições:** Artigos estão disponíveis no sistema.

**Pós-condições:** O usuário consegue navegar e ler o conteúdo dos artigos.

**Detalhes:**
- Os artigos serão categorizados.
- Não haverá funcionalidade de comentários nos artigos.
- A adição de novos artigos é feita diretamente pelo desenvolvedor na release.

## RF009: Tratamento de Erros na Coleta/Exibição de Dados

**Descrição:** O sistema deve informar ao usuário quando houver falha na coleta ou exibição dos dados de monitoramento.

**Atores:** Usuário, Sistema

**Pré-condições:** Ocorre uma falha ao tentar carregar ou coletar dados.

**Pós-condições:** Uma imagem de erro é exibida para o usuário (conforme imagem2).

**Detalhes:**
- A mensagem de erro deve ser clara e indicar a impossibilidade de carregar os dados.

---

# Requisitos Não Funcionais (RNFs) - NRG Control

## RNF001: Desempenho

### RNF001.1: Tempo de Resposta

**Descrição:** O sistema deve carregar os dados no dashboard e responder às interações do usuário em um tempo aceitável.

**Métrica:** O tempo máximo de resposta para o carregamento do dashboard e gráficos em tempo real não deve exceder 2 segundos.

**Prioridade:** Essencial

### RNF001.2: Escalabilidade de Dispositivos

**Descrição:** O sistema deve ser arquitetado de forma a permitir futuras expansões para monitorar diferentes tipos de dispositivos (ex: tomadas, ar-condicionado).

**Métrica:** A arquitetura do sistema deve suportar a adição de novos tipos de dispositivos, cada um com seu próprio dashboard de monitoramento separado. (Este é um requisito de arquitetura que impacta a escalabilidade, não uma métrica de "números" no momento, mas sim uma capacidade futura).

**Prioridade:** Desejável

### RNF001.3: Volume de Dados

**Descrição:** O sistema deve ser capaz de gerenciar e persistir um volume de dados que esteja dentro dos limites operacionais e de desempenho do MySQL.

**Métrica:** O sistema deve suportar o volume de dados gerado pela coleta a cada 10 segundos para múltiplos dispositivos, sem degradação significativa de desempenho dentro dos limites do MySQL 8.0+.

**Prioridade:** Essencial

## RNF002: Usabilidade

### RNF002.1: Intuitividade da Interface

**Descrição:** A interface do usuário deve ser fácil de entender e usar para um novo usuário.

**Métrica:** Um novo usuário deve ser capaz de navegar e compreender as funcionalidades básicas do sistema (login, dashboard, visualização de gráficos) em no máximo 5 minutos, sem necessidade de treinamento.

**Prioridade:** Essencial

### RNF002.2: Feedback ao Usuário

**Descrição:** O sistema deve fornecer feedback claro e imediato sobre o status das operações ou erros.

**Métrica:** O feedback deve ser apresentado através de `divs` informativas contendo um ícone e uma mensagem descritiva (ex: "carregando...", "dados atualizados", "erro de conexão").

**Prioridade:** Essencial

## RNF003: Confiabilidade

### RNF003.1: Disponibilidade

**Descrição:** O sistema deve estar disponível para uso continuamente.

**Métrica:** O sistema deve ter 100% de disponibilidade, desde que haja uma conexão ativa com a internet e os servidores estejam operacionais.

**Prioridade:** Essencial

### RNF003.2: Recuperação de Erros de Requisição

**Descrição:** O sistema deve permitir a recuperação de erros de requisição.

**Métrica:** Em caso de falha na requisição de dados, o usuário deve ser capaz de recarregar a página (F5) para tentar restabelecer a exibição das informações. (Considera-se que o "F5" é a solução inicial providenciada para recuperação).

**Prioridade:** Essencial


  
## Tecnologias Utilizadas

### Backend
- **Java 21**: Linguagem principal para o backend.
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
- **MySQL Workbench**: Para gerenciamento do banco de dados.
- **Git**: Controle de versão.

## Pré-requisitos para Rodar o Projeto

### Geral
- **Git**: Para clonar o repositório.
- **Java 21**: Para rodar o backend.
- **Node.js 18+ e npm**: Para rodar o frontend.
- **MySQL 8.0+**: Banco de dados configurado.

### Configuração do Banco de Dados
1. Instale o MySQL e crie um banco chamado `energy_monitoring`:
   ```sql
   CREATE DATABASE energy_monitoring;

# Configuração Backend

## Comandos de Execução
```bash
mvn install
mvn spring-boot:run
```

## Configuração do Banco de Dados (application.properties)
```properties
# Configuração do DataSource MySQL
spring.datasource.url=jdbc:mysql://localhost:seuLocalHost/energy_monitoring
spring.datasource.username= seu userName
spring.datasource.password= sua senha
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuração JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## Observações
- **Banco de Dados**: MySQL rodando na porta padrão 3306
- **Schema**: `energy_monitoring`
- **Hibernate DDL**: Configurado para `update` (atualiza automaticamente o schema)
- **SQL Logging**: Habilitado para debug (`show-sql=true` e `format_sql=true`)

### Configuração FrontEnd
- npm install
- npm run dev
