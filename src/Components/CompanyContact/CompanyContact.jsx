import { useForm, ValidationError } from '@formspree/react';
const CompanyContact = () => {
    const [state,handleSubmit] = useForm('xoqovygo');

    if (state.succeeded) {
        return <p>Correo electronico enviado, pronto te daremos una respuesta!</p>
    }
    return (
        <>
            <form onSubmit={handleSubmit} action="">
                <label htmlFor="email">Email adress</label>
                <input type="email" name="email" id="email" />
                <ValidationError
                prefix='Email' field='email' errors={state.errors}/>
                <textarea name="message" id="message"></textarea>
                <ValidationError prefix='Message' field='message' errors={state.errors}/>
                <button type='submit' disabled={state.submitting}>Enviar</button>
            </form>
        </>
    )
}

export default CompanyContact;