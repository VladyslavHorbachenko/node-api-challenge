const express = require('express');
const bodyParser = require('body-parser');
const actionDB = require('../data/helpers/actionModel')

const routes = express.Router();
routes.use(bodyParser.json())

routes.get('/', (req, res) => {
    actionDB.get()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Error get something" })
        })
})

routes.post('/',  checkDescriptionField,(req, res) => {
    actionDB.insert(req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Error,can not POST" })
        })

})

routes.put('/:id',checkDescriptionField,(req, res) => {

    actionDB.update(req.params.id, req.body)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Error,can not Update" })
        })
})

routes.delete('/:id',(req, res) => {
    actionDB.remove(req.params.id)
        .then(action => {
            res.status(200).send({message: `Success, action has been deleted `})
        })
})
function checkDescriptionField(req, res,next){
    if(req.body.description.length > 128){
        res.status(500).json({errorMessage: "You can add up to 128 characters long"})
    }
    else{
        next()
    }
}



module.exports = routes;