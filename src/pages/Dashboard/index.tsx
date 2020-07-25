/**
 * Imports Node Files
 */
import React, { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
/**
 * Api
 */
import api from '../../services/api';
/*
 * Import Files
 */
import logo from '../../assets/1587379765556-attachment.svg';
/**
 * Import Styles
 */
import { Title, Form, Repositorys, Error } from './styles';
interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}
const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setinputError] = useState('');

    const [repositories, setRepositories] = useState<Repository[]>(() => {

        const storageRepositories = localStorage.getItem('@GitExplorer:repositories')

        if (storageRepositories)
            return JSON.parse(storageRepositories);
        else
            return [];
    });

    useEffect(() => {
        localStorage.setItem('@GitExplorer:repositories', JSON.stringify(repositories))
    }, [repositories]);

    async function handleAddRepository(

        event: FormEvent<HTMLFormElement>): Promise<void> {

        event.preventDefault();
        /**
         * Adição do repositorio no estado
         */
        if (!newRepo) {
            setinputError('Write Author/repository');
            return;
        }
        try {
            const response = await api.get(`repos/${newRepo}`);

            setRepositories([...repositories, response.data]);

            setNewRepo('');
            setinputError('');
        } catch (err) {
            setinputError('Repository not found.')
        }

    }

    return (
        <>
            <img src={logo} alt="GitHub Explorer" />
            <Title>Explore Repositórios no GitHub</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository} >
                <input
                    placeholder="Digite o nome do repositorio"
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            <Repositorys>
                
                {
                    repositories.map(repo => (
                        <Link key={repo.full_name} to={`/repositories/${repo.full_name}`}>
                            <img
                                src={repo.owner.avatar_url}
                                alt={repo.full_name}
                            />
                            <div className="repository">
                                <strong>{repo.full_name}</strong>
                                <p>{repo.description}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link>
                    ))
                }

            </Repositorys>
        </>
    );
};

export default Dashboard;