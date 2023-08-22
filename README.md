# AWS-App

## Descrição
A aplicação se trata de uma simples aplicação web para venda de livros, o usuário pode inserir informações como nome, descrição, valor, categoria e data de publicação do livro que deseja armazenar/vender. A aplicação atual possui apenas a opção de inserir livros, ou seja, apenas é visalizado uma listagem e a aplicação possui apenas operações GET e POST presentes ao se fazer uma requisição, mas futuramente será inserido operações como DELETE para deletar e PUT para atualizar os livros atribuidos.

## Serviços usados
### RDS
Serviço para administrar banco de dados, foi usado o banco de dados MySQL e posteriormente, para criação de tabelas, foi conectado ao MYSQL workbench para ser testado primeiramente de forma local e depois na nuvem.

### IP Elástico
É um endereço estático para garantir conectividade, o IP elástico foi atribuido para melhorar o acesso e facilitar a disponibilidade da aplicação, principalmente ao envolver o RDS, visto que muitos acessos também foram feitos via terminal e sem o IP elástico havia problemas de conectividade com os serviços em nuvem.

### VPC
É o ambiente virtual isolado, com a VPC é possível ter controle da própria rede e criar sub-redes, é possível adicionar vários serviços/recursos dentro da VPC. A VPC também oferece uma ótima segurança, pois é específico quais protocolos e portas podem ser acessadas, limitando o tráfego não autorizado, além da filtragem de tráfego alta.

### EC2
O EC2 é a máquina virtual, é onde a minha aplicação estará alocada e acessível, pois será o servidor virtual. Com o EC2 é possível fazer com que uma aplicaçãoq ue antes era somente acessada localmente(máquina local), seja disponibilizada em nuvem(sendo possível acessar recursos, serviços e dados de qualquer lugar, a qualquer momento, desde que tenha conexão à Internet)

## Código
Para desenvolver a aplicação, foi usado linguagem de marcação HTML e CSS para o front-end, já para criar o back-end foi usado a linguagem JavaScript e o framework Express

## Organização
-> Node Modules<br>
-> venv (ambiente virtual)<br>
-> app.js (back-end)<br>
-> index.html (front-end em html)<br>
-> index.js (métodos get e post no front-end)<br>
-> package-lock.json<br>
-> package.json<br>
-> requirements.txt<br>
-> style.css (estilização do front-end html)

## Demo
link do vídeo de apresentação da aplicação: https://youtu.be/7A7WUKpHiMk
