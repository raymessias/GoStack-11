import React, { useState, FormEvent } from 'react'
import { FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

import LogoImg from '../../assets/github-logo.svg'

import { Title, Form, Repositories } from './styles'

interface Repository {
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('')
  const [repositories, setRepositories] = useState<Repository[]>([])

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()

    const response = await api.get<Repository>(`repos/${newRepo}`)

    const repository = response.data

    setRepositories([...repositories, repository])
  }

  return (
    <>
      <img src={LogoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories.map((repository) => (
          <a key={repository.full_name} href="teste">
            <img
              src="https://avatars1.githubusercontent.com/u/59324178?s=460&u=46b74c3fd80171032633db1beca2e3ace2990992&v=4"
              alt="Raynon Messias"
            />
            <div>
              <strong>raymessias/gostack11</strong>
              <p>Easy peasy highly scalable ReactJs & react Native forms!</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  )
}

export default Dashboard
