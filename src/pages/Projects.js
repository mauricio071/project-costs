import { useState, useEffect } from 'react';
import Message from './Message';
import { useLocation } from 'react-router-dom';
import Container from '../layout/Container';
import LinkButton from '../components/LinkButton';
import styles from './Projects.module.css';
import ProjectCard from '../project/ProjectCard';
import Loading from '../layout/Loading';

function Projects() {
    const baseUrl = process.env.REACT_APP_BASE_URL;

    const [projects, setProjects] = useState([]);

    const [removeLoading, setRemoveLoading] = useState(false);

    const [projectMessage, setProjectMessage] = useState('');

    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    useEffect(() => {
        setTimeout(() => {
            fetch(`${baseUrl}/projects`, {
                methods: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(data => {
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch(err => console.log(err));
        }, 300)
    }, []);

    function removeProject(id) {
        fetch(`${baseUrl}/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(() => { })
            .then(() => {
                setProjects(projects.filter((project) => project.id !== id));
                setProjectMessage('Projeto removido com sucesso!');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>

            {message && (
                <Message msg={message} type='success' />
            )
            }
            {projectMessage && (
                <Message msg={projectMessage} type='success' />
            )
            }
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) =>
                        <ProjectCard
                            id={project.id}
                            name={project.name}
                            budget={project.budget}
                            category={project.category.name}
                            key={project.id}
                            handleRemove={removeProject}
                        />)
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projeto</p>
                )}
            </Container>

        </div>
    )
}

export default Projects;