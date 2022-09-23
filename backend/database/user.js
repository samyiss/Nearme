const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);



exports.registerUser = async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password);

    createUser([name, email, password], (err) => {
       if (err) {
           console.log(err);
           return res.status(500).send("Server error!!!!");
           
       }
        findUserByEmail(email, (err, user) => {
            if (err) return res.status(500).send('Server error');
            res.status(200).send({
                "user": user
            });
        });
    });

}

const createUser = (user, cb) => {
    return database.run('INSERT INTO users (name, email, password) VALUES (?,?,?)', user, (err) => {
        cb(err)
    });
}

const findUserByEmail = (email, cb) => {
    return database.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        cb(err, row)
    });
}