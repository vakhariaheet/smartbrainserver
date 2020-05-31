const Register = (req,res, db  ,bcrypt) =>{
        const {email, name, password} = req.body
        const salt = bcrypt.genSaltSync(saltRounds);    
        var hash = bcrypt.hashSync(password,salt);

        if(!email || !password || !name){
            return res.status(400).json('Insufficient information')
        }
        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email:email,
                    name:name,
                    joined : new Date()
                }).then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
        .   catch(trx.rollback)
        }).catch(err => res.status(400).json('unable to register'))
    }


export default Register;