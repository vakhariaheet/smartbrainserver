const Profile = (req,res ,db) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length){
            res.json(user[0])
        }else{
            res.json('User Not found').status(400);
        }
    }).catch(err => res.status(400).json('err getting user'))
}

export default Profile;