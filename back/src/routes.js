const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const ONGController = require('./controllers/ONGController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Session
routes.post('/sessions', SessionController.create); //Faz login

//ONGs
routes.get('/ongs', ONGController.index); //Lista as ONGs

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        zap: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ONGController.create); //Cadastra ONG

//Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), IncidentController.index); //Lista os incidentes

routes.post('/incidents', IncidentController.create); //Cadastra incidente

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete); //Deleta incidente

//ONG Profile
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index) //Lista incidentes da ONG

module.exports = routes;