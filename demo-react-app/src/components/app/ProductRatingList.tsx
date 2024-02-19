import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import { ProductRatingsListProps } from '../../data_interfaces/IRatingWithCommentProps'; // Assurez-vous d'importer la bonne interface

const ProductRatingsList: React.FC<ProductRatingsListProps> = ({ productId }) => {
    const [ratings, setRatings] = useState<any[]>([]);

    useEffect(() => {
        CustomAxios.get(`/productreviews/?product=${productId}`)
            .then(response => {
                setRatings(response.data);
            })
            .catch(error => {
                console.error("Erreur lors de la récupération des évaluations", error);
            });
    }, [productId]);

    if (!ratings.length) {
        return <Typography>Aucune évaluation pour ce produit.</Typography>;
    }

    return (
        <List>
            {ratings.map((rating) => (
                <ListItem key={rating.id}>
                    <ListItemText
                        primary={<Rating value={rating.rating} readOnly />}
                        secondary={rating.comment}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default ProductRatingsList;
