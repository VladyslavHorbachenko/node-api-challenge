const express = require('express');
const bodyParser = require('body-parser');
const projectDB = require('../data/helpers/projectModel')
const routes = express.Router();
routes.use(bodyParser.json())

routes.get('/', (req, res) => {
    projectDB.get()
        .then(project => {
            res.status(200).send(project);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Error with getting the projects!" })
        })
})

routes.post('/', (req, res) => {
    projectDB.insert(req.body)
        .then(project => {
            res.status(201).send(project);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Cannot create new project" })
        })
})

routes.put('/:id', (req, res) => {
    let projectUpdate;
    if (req.body) {
        projectUpdate = {
            name: req.body.name,
            description: req.body.description,
        }
    }

    projectDB.update(req.params.id, projectUpdate)
        .then(project => {
            res.status(200).send(project);
        })
        .catch(err => {
            res.status(500).json({errorMessage: "Cannot update the project" })
        })
})

routes.delete('/:id', (req, res) => {
    projectDB.remove(req.params.id)
        .then(() => res.status(200).json({message: `The project with the ID ${req.params.id} has been deleted`}))
        .catch(err => {
            res.status(500).json({errorMessage: "Cannot delete this project!" })
        })
})


module.exports = routes;