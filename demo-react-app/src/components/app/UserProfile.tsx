import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import IUser from '../../data_interfaces/IUser';

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        CustomAxios.get<IUser>('/auth/users/me/')
        .then((response) => {
            console.log(response.data);  // Vérifiez ce qui est réellement renvoyé ici
            setUser(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    // La demande a été faite et le serveur a répondu avec un statut hors de la plage 2xx
                    console.error("Erreur dans la réponse de l'API", error.response.status, error.response.data);
                } else if (error.request) {
                    // La demande a été faite mais aucune réponse n'a été reçue
                    console.error("Aucune réponse reçue", error.request);
                } else {
                    // Quelque chose s'est mal passé lors de la configuration de la requête
                    console.error("Erreur dans la configuration de la requête", error.message);
                }
            });

            
    }, []);

    if (!user) {
        return <Typography>Chargement...</Typography>;
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Profil de l'utilisateur</Typography>
                <Typography variant="subtitle1">Prénom: {user.first_name}</Typography>
                <Typography variant="subtitle1">Nom: {user.last_name}</Typography>
                <Typography variant="subtitle1">Courriel: {user.email}</Typography>
            </Box>
        </Container>
    );
};

export default UserProfile;
