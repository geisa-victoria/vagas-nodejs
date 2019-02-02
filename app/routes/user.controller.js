//express-validator
const userModel = require('../../models/user');

let collectionUsers = [];

module.exports = routes => {

    routes.put('/users/:userId', (req, res) => {
        collectionUsers.forEach(user => {
            if(user.id == req.params.userId) {
                try {
                    user.name = req.body.name,
                    user.email = req.body.email,
                    user.password = req.body.password
                } catch(error) {
                    return res.status(500).send('Parâmetros inválidos!');
                }
            }
        })
    })
    routes.get('/users/:userId', (req, res) => {
        try {
            let user = collectionUsers.find(user => user.id == req.params.userId);
    
            if(user) {
                res.send(user);
            } else {
                res.status(204).send("User not found");
            }
        } catch(error) {
            res.status(404).send(error);
        }
    })

    routes.delete('/users/:userId', (req, res) => {

        let userExist = false;

        collectionUsers.forEach((user, index) => {
            if(user.id == req.params.userId) {
                userExist = true;
                collectionUsers.splice(index, 1);

                res.send('Usuário excluído');
            }
        })

        if(!userExist) {
            res.status(404).send("Id não encontrado!");
        }
    })
    
    routes.get('/users', (req, res) => {
        res.send(collectionUsers);
    });
    
    routes.post('/users', (req, res) => {
        try {
            let user = new userModel.User(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password,
            )
                
            collectionUsers.push(user);
            res.send(user);
        } catch(error) {
            res.status(500).send(error);
        }
    });
}

