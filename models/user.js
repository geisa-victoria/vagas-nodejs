class User {
    constructor(id, name, email, password) {
        // the THIS means "the attribute NAME of this class is going to be name"
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

module.exports = { User }