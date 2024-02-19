import React, { useEffect, useState } from 'react';
import {  Card, CardContent, List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import { ProductRatingsListProps } from '../../data_interfaces/IRatingWithCommentProps';

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
                <ListItem key={rating.id} component="div" disablePadding>
                    <Card variant="outlined" sx={{ width: '100%', mb: 1 }}>
                        <CardContent>
                            <Rating value={rating.rating} precision={0.5} readOnly />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {rating.comment}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                - {rating.username}
                            </Typography>
                        </CardContent>
                    </Card>
                </ListItem>
            ))}
        </List>
    );
};

export default ProductRatingsList;
