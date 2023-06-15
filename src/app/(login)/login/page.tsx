"use client";


import { Box, Button, TextField, Typography, Link as MuiLink, Alert } from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //verificar se esta fazendo login
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    //prevençao(parar) do evento padrão que atualizar a pagina(event: FormEvent<HTMLFormElement>)
    //dizendo que o elemento é proprio do form
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // !(se não timer emai ou senha)
        if(!emailField || !passwordField) {
            setError('Preencha e-mail e senha.');
            return;//parar a aplicação
        }

        setError(''); //limpa os erros de tentativas anteriores
        setLoading(true);
        //fazer a consulta na API
    }

    return(
       <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555'}}>Digite seus dados para entrar no paunel administrativo do estabelecimento e gerenciar produtos/pedidos.</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField 
                    label="Digite seu e-mail" 
                    name="email"
                    fullWidth
                    autoFocus
                    sx={{ mb : 2 }}
                    onChange={e => setEmailField(e.target.value)}
                    value={emailField}
                    disabled={loading} //quando tiver carregando desabilita o campo
                />
                <TextField 
                    label="Digite sua senha"
                    name="password"
                    type="password"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordField}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >{loading ? 'Carregado...' : 'Entrar'}</Button>

                {error &&
                <Alert variant="filled" severity="error" sx={{ mt: 3 }}>{error}</Alert>
                }

                <Box sx={{ mt: 3 }}>
                    <MuiLink href="/login/forgot" variant="body2" component={Link}>Esqueceu sua senha?</MuiLink>
                </Box>
            </Box>
       </>
    )
}

export default Page;