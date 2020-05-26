import Clarifai from 'clarifai';
const app = new Clarifai.App({
    apiKey: '0f16cabbe2444bbdacbc0c8ba96fd5ed'
  });


const APIHandler = (req,res)=>{
    const {input} = req.body;
    app.models
    .predict(
    'a403429f2ddf4b49b307e318f00e528b',
      // URL
   input).then(data => res.json(data))
   .catch(err => res.status(400).json(err))
   console.log(input + '=====')

}

const Image = (req ,res ,db ) => {
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then((entries) => {
        res.json(entries[0]);
    }).catch(err => res.status(400).json('unable to send entries'));
}

export {Image , APIHandler} ;