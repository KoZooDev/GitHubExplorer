import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';

import { Header, RepositoryInfo, Issues } from './styles';

import api from '../../services/api';

import logo from '../../assets/1587379765556-attachment.svg';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface RepositoryParams {
    repository: string;

}
interface Repository {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url: string;
    }
}

interface Issue {
    id: number;
    title: string;
    html_url: string;
    user: {
        login: string;
    }
}
const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[] | null>(null);

    useEffect(() => {
        api.get(`repos/${params.repository}`).then(reponse => {
            setTimeout(() => {
                setRepository(reponse.data);
            }, 1000)
        });

        api.get(`repos/${params.repository}/issues`).then(reponse => {

            setTimeout(() => {
                setIssues(reponse.data);
            }, 1000)
        });

    }, [params.repository]);
    return (
        <>
            <Header>
                <img src={logo} alt="GitHub Explorer" />

                <Link to="/">
                    <FiChevronLeft size={16} />
                voltar
            </Link>
            </Header>
            {repository ? (
                <RepositoryInfo>
                    <header>
                        <img src={repository.owner.avatar_url}/>
                        <div className="info-user">
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Issues</span>
                        </li>

                    </ul>
                </RepositoryInfo>
            ) : (<h1 className="load">Carregando...</h1>)}

            <Issues>
                {issues ?
                    issues.map(issue => (
                        <a key={issue.id} href={issue.html_url} >
                            <div className="repository">
                                <strong>{issue.title}</strong>
                                <p>{issue.user.login}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </a>
                    )) : (null)

                }
            </Issues>
        </>
    );
};

export default Repository;