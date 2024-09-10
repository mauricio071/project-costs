import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css'

function NewProject() {
    const navigate = useNavigate();
    const baseUrl = process.env.REACT_APP_BASE_URL;

    function createPost(project) {
        //inicializar os valores
        project.cost = 0;
        project.services = [];

        fetch(`${baseUrl}/projects`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                //redirect
                navigate('/projects', { state: { message: 'Projeto criado com sucesso!' } })
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText='Criar Projeto' />
        </div>
    )
}

export default NewProject;