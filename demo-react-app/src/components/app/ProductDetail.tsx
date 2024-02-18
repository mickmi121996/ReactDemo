
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomAxios from '../../data_services/CustomAxios';
import IProduct from '../../data_interfaces/IProduct';

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

    if (!product) {
        return <div>Chargement...</div>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Code: {product.code}</p>
            <p>Description: {product.description}</p>
        </div>
    );
};

export default ProductDetail;
