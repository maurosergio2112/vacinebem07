import React, { useState } from 'react';

const vacinas = [
  { id: 1, texto: 'Já tomou a vacina contra gripe (Influenza)?' },
  { id: 2, texto: 'Já tomou a vacina pneumocócica conjugada (VPC13)?' },
  { id: 3, texto: 'Já tomou a vacina contra hepatite B?' },
  { id: 4, texto: 'Já tomou a vacina contra febre amarela?' },
  { id: 5, texto: 'Já tomou a vacina HPV4 contra o Papilomavírus humano?' },
  { id: 6, texto: 'Já tomou a vacina VSR contra o Vírus Sincicial Respiratório?' },
  { id: 7, texto: 'Já tomou a Vacina dupla bacteriana do tipo adulto dT?' },
  { id: 8, texto: 'Já tomou a vacina contra hepatite B?' },
];

const FormularioVacinas = () => {
  const [respostas, setRespostas] = useState({});

  const handleResposta = (id, resposta) => {
    setRespostas(prevState => ({
      ...prevState,
      [id]: resposta
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Respostas:', respostas);
    // Aqui você pode adicionar a lógica para enviar as respostas para um backend, etc.
  };

  return (
    <form onSubmit={handleSubmit}>
      {vacinas.map(vacina => (
        <div key={vacina.id}>
          <p>{vacina.texto}</p>
          <label>
            Sim
            <input
              type="radio"
              name={vacina.id}
              value="sim"
              checked={respostas[vacina.id] === 'sim'}
              onChange={() => handleResposta(vacina.id, 'sim')}
            />
          </label>
          <label>
            Não
            <input
              type="radio"
              name={vacina.id}
              value="nao"
              checked={respostas[vacina.id] === 'nao'}
              onChange={() => handleResposta(vacina.id, 'nao')}
            />
          </label>
        </div>
      ))}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormularioVacinas;
