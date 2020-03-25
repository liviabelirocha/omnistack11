import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logo from '../../assets/logo.svg';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [zap, setZap] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, email, zap, city, uf,
        };

        try {
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert("Erro no cadastro, tente novamente.");
        }

    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logo} alt="be the hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para logon
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        name={name}
                        onChange={e=>setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        name={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        name={zap}
                        onChange={e=>setZap(e.target.value)} 
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            name={city}
                            onChange={e=>setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            name={uf}
                            onChange={e=>setUf(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Register;