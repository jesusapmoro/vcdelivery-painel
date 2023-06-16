"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false); //verificar se esta fazendo login
    const [emailField, setEmailField] = useState('');

    //prevençao(parar) do evento padrão que atualizar a pagina(event: FormEvent<HTMLFormElement>)
    //dizendo que o elemento é proprio do form
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // !(se não timer emai ou senha)
        if(!emailField) {
            setError('Preencha o seu e-mail.');
            return;//parar a aplicação
        }

        setError(''); //limpa os erros de tentativas anteriores
        setInfo('');
        setLoading(true);
        //fazer a consulta na API
        const result = await api.forgotPassword(emailField);
        setLoading(false);
        if(result.error) {
          setError(result.error);
        } else {
            setInfo('Enviamos um e-mail para recuperação da sua senha.');
        }
    }

    return(
       <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555'}}>Deseja recuperar sua senha?</Typography>

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
    
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >{loading ? 'Carregado...' : 'Recuperar a senha'}</Button>

                {error &&
                    <Alert variant="filled" severity="error" sx={{ mt: 3 }}>{error}</Alert>
                }

                {info &&
                    <Alert variant="filled" severity="success" sx={{ mt: 3 }}>{info}</Alert>
                }
            </Box>
       </>
    );
}

export default Page;