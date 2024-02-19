import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import IProduct from '../../data_interfaces/IProduct';
import RatingWithComment from './RatingWithComment';
import ProductRatingsList from './ProductRatingList';
import { RatingData } from '../../data_interfaces/IRatingWithCommentProps';


const ProductDetail = () => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        CustomAxios.get<IProduct>(`/product/${id}/`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des détails du produit", error);
            });
    }, [id]);

    const handleRatingSubmit = (ratingData: RatingData) => {
        if (ratingData.rating !== null) {
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
                    console.error('Erreur', error);
                });
        }
    };


    if (!product) {
        return <div>Chargement...</div>;
    }

    if (typeof id === 'undefined') {
        return <div>Produit introuvable</div>;
    }

    return (

        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <h1>{product.name}</h1>
                <p>Code: {product.code}</p>
                <p>Description: {product.description}</p>
                <RatingWithComment productId={parseInt(id, 10)} onSubmit={handleRatingSubmit} />
            </Grid>
            <Grid item xs={12} md={4}>
                <ProductRatingsList productId={parseInt(id, 10)} />
            </Grid>
        </Grid>
    );

};

export default ProductDetail;
