import { useState } from 'react';
import Message from './Message';

import styles from './Contact.module.css'
import Input from '../components/form/Input'
import TextArea from '../components/form/TextArea'
import SubmitButton from '../components/form/SubmitButton';

function Contact() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [contact, setContact] = useState({});
    const [message, setMessage] = useState('')

    function submit(e) {
        e.preventDefault();

        fetch(`${baseUrl}/contacts`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(contact)
        }).then(() => {
            setMessage('Contato enviado!')
        })
    }

    function handleChange(e) {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }

    return (
        <div className={styles.contact_container}>
            {message && (
                <Message msg={message} type='success' />
            )
            }
            <h1>Entre em contato</h1>
            <form onSubmit={submit} className={styles.form}>
                <Input type="text" text="Digite o seu nome" name="name" placeholder="Digite o seu nome" handleOnChange={handleChange} value={contact.name ? contact.name : ''} />
                <Input type="email" text="Digite o seu email" name="email" placeholder="Digite o seu email" handleOnChange={handleChange} value={contact.email ? contact.email : ''} />
                <TextArea text="Digite a sua mensagem" name="description" placeholder="Digite a sua mensagem" handleOnChange={handleChange} value={contact.description ? contact.description : ''} />
                <SubmitButton text={'Enviar'} />
            </form>
        </div>
    )
}

export default Contact;