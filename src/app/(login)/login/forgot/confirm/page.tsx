"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false); //verificar se esta fazendo login
    const [passwordFiel, setPasswordField] = useState('');
    const [passwordFiel2, setPasswordField2] = useState('');

    //prevençao(parar) do evento padrão que atualizar a pagina(event: FormEvent<HTMLFormElement>)
    //dizendo que o elemento é proprio do form
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // !(se não timer emai ou senha)
        if(!passwordFiel || !passwordFiel2) {
            setError('Preencha a senha.');
            return;//parar a aplicação
        }

        if(passwordFiel !== passwordFiel2) {
            setError('As senhas não batem.');
            return;
        }

        setError(''); //limpa os erros de tentativas anteriores
        setInfo('');
        setLoading(true);
        //fazer a consulta na API
        const result = await api.redefinePassword(passwordFiel, '123');
        setLoading(false);
        if(result.error) {
          setError(result.error);
        } else {
            setInfo('Senha redefinida, agora você pode fazer o login.');
            setPasswordField(''); //limpar o campo senha
            setPasswordField2('');
        }
    }

    return(
       <>
            <Typography component="p" sx={{ textAlign: 'center', mt: 2, color: '#555'}}>Olá **Usuário**, defina sua nova senha abaixo.</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField 
                    label="Digite sua nova senha" 
                    name="password"
                    type="password"
                    fullWidth
                    autoFocus
                    sx={{ mb : 2 }}
                    onChange={e => setPasswordField(e.target.value)}
                    value={passwordFiel}
                    disabled={loading} //quando tiver carregando desabilita o campo
                />
                <TextField 
                    label="Confirme sua nova senha" 
                    name="password2"
                    type="password"
                    fullWidth
                    autoFocus
                    sx={{ mb : 2 }}
                    onChange={e => setPasswordField2(e.target.value)}
                    value={passwordFiel2}
                    disabled={loading} //quando tiver carregando desabilita o campo
                />
    
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >{loading ? 'Carregado...' : 'Definir nova senha'}</Button>

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