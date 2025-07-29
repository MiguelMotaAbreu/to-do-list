//Exportando a conexão com o banco de dados que foi criada em database.js 
const connection = require("./config/database.js");
const bcrypt = require("bcrypt");


//Função para registrar um novo usuário na tabela users, ou seja, uma função de post
const registerUser = async (req, res) => {
   const { username, email, password } = req.body;
   if (!username || !email || !password) {
    return res.status(400).json({message: "Todas as informações, nome, email e a senha, são necessárias para o registro de um usuário."})
   }
   try {
    const passwordHash = await bcrypt.hash(password, 10)
    const sqlQuery = `INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)`;
    connection.query(sqlQuery, [username, email, passwordHash], (err, results) => {
        if(err) {
            //No caso, desejo que a verificação de duplicidade de dados, seja relacionada somente a linha referente a email, e como colocado no db, um dos parâmetros da linha é UNIQUE.
            //Ou seja, não é possível cadastrar um outro usuário com o mesmo email, porque cada email no db é e tem de ser único.
            if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'Este email já está cadastrado.'});
            return res.status(500).json({error: err.message})
        }
        //Não vejo necessidade de inserir como devolutiva a senha, pois no final das contas ela vai retornar um hash
        return res.status(201).json({ id: results.insertId, username, email, passwordHash});
    })} catch (error){
        return res.status(500).json({error: err.message})
   };
}