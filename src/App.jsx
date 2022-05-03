import React, {useState, useEffect} from 'react'

function App() {
  const [repositories, setRepositories] = useState([])
  const [filter, setFilter] = useState([])

    useEffect(async() =>{
      const response = await fetch('https://api.github.com/users/B-Lucas365/repos')
      const data = await response.json()

      setRepositories(data)
    },[])

    useEffect(() => {
      const filtered = repositories.filter(repo => repo.favorite)
      setFilter(filtered)

    },[repositories])

    const handleFavorite = (id) =>{
      const newRepositories = repositories.map(repo => {
        return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
      })

      setRepositories(newRepositories)
    }

  return(
      <ul>
        <h1>{`Você tem ${filter.length} repositórios favoritos`}</h1>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
  )
}

export default App
