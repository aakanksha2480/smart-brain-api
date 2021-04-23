const Clarifai = require('clarifai');

const app=new Clarifai.App({
    apiKey: '6fc1803477f74db6b41b4e30a2e95a1c'
  });


const handleAPICall =  (req,res,db,bcrypt)=> {
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(response => {
        if(response)
      {
        res.json(response)
      }
      else
      {
        res.status(400).send('Not correct URL');
      }
    }
    )
    .catch(err => {
        res.status(400).send('Unable to detect image');
    }) 
}

const handleImage =  (req,res,db,bcrypt)=> {
    console.log(req.body);
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment({
        entries: 1
    })
    .returning('entries')
    .then(entry => res.json(entry[0]))
    .catch(err => {
        res.status(400).send('Unable to get entries');
    }) 
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
}