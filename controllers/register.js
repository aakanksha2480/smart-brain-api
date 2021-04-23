

const handleregister=(req,res,db,bcrypt)=> {
    const {name,email,password} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json('Please enter correct values');
    }
    const hash=bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            console.log(loginEmail);
            return trx('users')
            .returning('*') 
            .insert({
                name: name,
                email: loginEmail[0],
                joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => {
        res.status(400).json('User already Exists or unable to register');
    })

}

module.exports = {
    handleregister: handleregister
}
