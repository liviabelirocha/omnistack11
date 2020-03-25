import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongID = localStorage.getItem('ongID');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: { Authorization: ongID, }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongID]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: { Authorization: ongID, }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch {
            alert("Erro ao deletar caso! Tente novamente.")
        }
    } 

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="be the hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul> 
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                        <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Profile;