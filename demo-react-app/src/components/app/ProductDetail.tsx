import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, Rating } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import IProduct from '../../data_interfaces/IProduct';
import RatingWithComment from './RatingWithComment';
import ProductRatingsList from './ProductRatingList';
import { NewRatingData, RatingData } from '../../data_interfaces/IRatingWithCommentProps';


const ProductDetail = () => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const { id } = useParams<{ id: string }>();
    const [hasUserRated, setHasUserRated] = useState(false);
    const [currentUserUsername, setCurrentUserUsername] = useState<string | null>(null);

    useEffect(() => {
        if (id) { // Assurez-vous que id n'est pas undefined
            CustomAxios.get<IProduct>(`/product/${id}/`)
                .then((response) => {
                    setProduct(response.data);

                    // Après avoir récupéré les détails du produit, vérifiez si l'utilisateur a déjà évalué le produit
                    CustomAxios.get(`/productreviews/has_user_rated/${id}/`, {
                        headers: {
                            // Assurez-vous d'inclure le jeton d'authentification si nécessaire
                        }
                    })
                        .then(ratingResponse => {
                            setHasUserRated(ratingResponse.data.hasRated);
                            setCurrentUserUsername(ratingResponse.data.username);
                        })
                        .catch(error => {
                            console.error("Erreur lors de la vérification de l'évaluation par l'utilisateur", error);
                        });
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des détails du produit", error);
                });
        }
    }, [id]);

    const handleRatingSubmit = (ratingData: NewRatingData) => {
        const url = `/productreviews/`;
        const payload = {
            product: ratingData.productId,
            rating: ratingData.rating,
            comment: ratingData.comment,
        };

        CustomAxios.post(url, payload)
            .then(response => {
                console.log('Évaluation enregistrée', response.data);

            })
            .catch(error => {
                console.error('Erreur lors de l’enregistrement de l’évaluation', error);
            });
    };
    const getColorForRating = (rating: number): string => {
        if (rating >= 4) return "green";
        if (rating >= 3) return "blue";
        if (rating >= 2) return "yellow";
        if (rating >= 1) return "orange";
        return "red";
    };





    if (!product) {
        return <div>Chargement...</div>;
    }

    if (typeof id === 'undefined') {
        return <div>Produit introuvable</div>;
    }

    const ratingColor = getColorForRating(product.average_rating || 0);
    
    return (

        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <Card raised>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Code: {product.code}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description: {product.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" component="div">
                            Note Moyenne :
                            {product.average_rating && (
                                <Rating
                                    name="read-only"
                                    value={product.average_rating}
                                    readOnly
                                    precision={0.5}
                                    sx={{ color: ratingColor }}
                                />
                            )}
                        </Typography>
                    </CardContent>
                </Card>
                {!hasUserRated && <RatingWithComment productId={parseInt(id, 10)} onSubmit={handleRatingSubmit} />}
            </Grid>
            <Grid item xs={12} md={4}>
                <ProductRatingsList productId={parseInt(id, 10)} currentUsername={currentUserUsername ?? ""} />
            </Grid>
        </Grid>
    );

};

export default ProductDetail;
