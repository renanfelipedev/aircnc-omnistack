import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await api.post('/sessions', { email });
    console.log(response);
    const { _id } = response.data;
    localStorage.setItem('user', _id);
    setEmail('');
    history.push('/dashboard');
  }
  return (
    <>
      <p>
        Ofereça <strong>Spots</strong> para programadores e encontre talentos
        para sua empresa.
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">E-mail *</label>
        <input
          id="email"
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn">Cadastrar</button>
      </form>
    </>
  );
}
