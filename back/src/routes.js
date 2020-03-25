const express = require('express');

const ONGController = require('./controllers/ONGController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//Session
routes.post('/sessions', SessionController.create); //Faz login

//ONGs
routes.get('/ongs', ONGController.index); //Lista as ONGs
routes.post('/ongs', ONGController.create); //Cadastra ONG

//Incidents
routes.get('/incidents', IncidentController.index); //Lista os incidentes
routes.post('/incidents', IncidentController.create); //Cadastra incidente
routes.delete('/incidents/:id', IncidentController.delete); //Deleta incidente

//ONG Profile
routes.get('/profile', ProfileController.index) //Lista incidentes da ONG

module.exports = routes;