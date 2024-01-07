import { useState } from 'react'
import './App.css'
import { api } from './lib/axios';
import { AxiosResponse } from 'axios';

type ResponseData = {
  cep: string,
  bairro: string,
  complemento: string,
  ddd: string,
  gia: string,
  ibge: string,
  localidade: string,
  logradouro: string,
  uf: string
}

function App() {

  // Hook
  const [inputValue, setInputValue] = useState('');
  const [dados, setDados] = useState({} as ResponseData);
  const [isLoading, setIsLoading] = useState(false);


  async function handleBuscarCep() {
    
    setIsLoading(true);
    try {
      const response = await api.get<any, AxiosResponse<ResponseData>>('cep/' + inputValue);
      setDados(response.data);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }

  }


  return (
    <>
      <ul>
        {
          Object.values(dados).map((valor, index) => {
            return (
              <li key={index}>{valor}</li>
            )
          })
        }
      </ul>
      <div>
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <button 
        onClick={handleBuscarCep}
        disabled={isLoading}
      >
        Buscar CEP
      </button>

    </>
  )
}

export default App
