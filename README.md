# Instalação 
Para acessar aplicação é possível fazer download do arquivo ou clonar o repositório para uma pasta local. <br>
Ao baixar arquivo acessar pasta e rodar o comando <b>npm install</b> para baixar as dependências necessárias do npm. 

# Possível Erro de Instalação
Se ao rodar o comando <b>npm start</b> o terminal acusar o erro <b>Module not found: Can't resolve 'styled-component'<b> basta digitar o comando o <b>npm i styled-components</b>

# Rodar Aplicação 
Para inicializar a aplicação basta rodar o comando <b>npm start</b>. <br>
Em caso de erro confirme a instalação da pasta <b>node_modules</b> caso não exista rodar o comando <b>npm install</b>.

# Dados de Acesso 
O acesso a plataforma na tela de login não possui estrutura para novos cadastros, mas configurando a [API School](https://github.com/douglasanschau/apiSchool/tree/main) é possível fazer login de duas formas. <br>

1º User Master: Usuário já cadastrado na estrutura de banco disponível para download na [API School](https://github.com/douglasanschau/apiSchool/tree/main). <br>
Login: 'dumbledore@hogwarts.com' <br>
Password: 'wizard' <br> <br>

2º Cadastrar User no Banco: Ao configurar o database da  [API School](https://github.com/douglasanschau/apiSchool/tree/main) pode registrar um usuário na table <b>users</b> seu login será o e-mail e a senha deve ser cadastrada usando o hash md5.

# Configurações de Desenvolvimento
Versão do Node.js : v21.1.0 <br>
Versão do NPM: 10.2.0

# API School
Esta aplicação é dependente de uma API para rodar, a API School. <br>
Para fazer download e instalação dessa API é necessário acessar o link ao lado: [API School](https://github.com/douglasanschau/apiSchool/tree/main)




