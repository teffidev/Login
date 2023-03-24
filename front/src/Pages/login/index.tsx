import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import { useState } from "react";
import { gql } from 'apollo-server';

//Validaremos los campos de entrada en la función handleSubmit()
//Y enviaremos la consulta GraphQL usando Apollo Client
const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!){
        loginUser(email: $email, password: $password){
            id
            name
            email
            token
        };
    };
`;
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { error }] = useMutation(LOGIN_USER);
    const router = useRouter();
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const { data } = await loginUser({
                variables: {
                    email,
                    password
                },
            });
            localStorage.setItem('token', data.loginUser.token);
            router.push('/profile');
        } catch (error) {
            console.log('Error al iniciar sesión:', error);
        };
    };
    
    //Creamos un formulario de inicio de sesión.
    return (
        <form onSubmit={handleSubmit}>
            <label>
                email
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </label>
            <label>
                password
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </label>
            {error && (
                <p style={{ color: 'red' }}>Error al iniciar sesión: { error.message}</p>
            )}
            <button type="submit">LOGIN</button>
        </form>
    );
};

export default Login;