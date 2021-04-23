

const handleSignIn = (req,res,db,bcrypt)=> {
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).json('Please enter correct values');
    }
    db.select('email','hash')
    .from('login')
    .where('email','=',req.body.email)
    .then(data => {
        const isvalid=bcrypt.compareSync(req.body.password,data[0].hash);
        if(isvalid) {
           return db.select('*')
                    .from('users')
                    .where('email','=',req.body.email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => {
                        res.status(400).json('Wrong email or password');
                    })
        }
        else {
            res.status(400).json('Wrong email or password');
        }
    })
    .catch(err => {
        res.status(400).json('Wrong email or password');
    })
}

module.exports = {
    handleSignIn: handleSignIn
}