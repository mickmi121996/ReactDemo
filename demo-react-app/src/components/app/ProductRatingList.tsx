import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, List, ListItem, Rating, TextField, Typography } from '@mui/material';
import CustomAxios from '../../data_services/CustomAxios';
import { ProductRatingsListProps } from '../../data_interfaces/IRatingWithCommentProps';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const ProductRatingsList: React.FC<ProductRatingsListProps> = ({ productId, currentUsername }) => {
    const [ratings, setRatings] = useState<any[]>([]);
    const [editingRatingId, setEditingRatingId] = useState<number | null>(null);
    const [editingRating, setEditingRating] = useState<number | null>(null);
    const [editingComment, setEditingComment] = useState<string>('');

    useEffect(() => {
        CustomAxios.get(`/productreviews/?product=${productId}`)
            .then(response => {
                setRatings(response.data);
                console.log('Evaluations reçues:', response.data);
            })
            .catch(error => {
                console.error("Error fetching ratings", error);
            });
    }, [productId]);

    const handleSaveEdit = (id: number, productId: number) => {
        if (editingRating === null) {
            console.error("La note ne peut pas être vide");
            return;
        }
    
        const url = `/productreviews/${id}/`;
        const payload = {
            product: productId,
            rating: editingRating,
            comment: editingComment,
        };
    
        CustomAxios.put(url, payload)
            .then(response => {
                console.log('Évaluation mise à jour', response.data);
    
                const updatedRatings = ratings.map(rating =>
                    rating.id === id ? { ...rating, ...response.data } : rating
                );
                setRatings(updatedRatings);
    
                setEditingRatingId(null);
                setEditingRating(null);
                setEditingComment('');
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l’évaluation', error);
                console.log(error.response.data);
            });
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?')) {
            const url = `/productreviews/${id}/`;
            CustomAxios.delete(url)
                .then(() => {
                    const updatedRatings = ratings.filter(rating => rating.id !== id);
                    setRatings(updatedRatings);
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression de l’évaluation', error);
                });
        }
    };
    


    if (!ratings.length) {
        return <Typography>No ratings for this product.</Typography>;
    }

    return (
        <List>
            {ratings.map((rating) => (
                <ListItem key={rating.id} component="div" disablePadding>
                    <Card variant="outlined" sx={{ width: '100%', mb: 1 }}>
                        <CardContent>
                            <Rating
                                value={editingRatingId === rating.id ? editingRating || rating.rating : rating.rating}
                                precision={0.5}
                                readOnly={editingRatingId !== rating.id}
                            />
                            {editingRatingId === rating.id ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    value={editingComment}
                                    onChange={(e) => setEditingComment(e.target.value)}
                                />
                            ) : (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {rating.comment}
                                </Typography>
                            )}
                            {rating.username === currentUsername && (
                                <>
                                    {editingRatingId === rating.id ? (
                                        <Button onClick={() => handleSaveEdit(rating.id, productId)}>Save</Button>
                                    ) : (
                                        <Button onClick={() => {
                                            setEditingRatingId(rating.id);
                                            setEditingRating(rating.rating);
                                            setEditingComment(rating.comment);
                                        }}>Edit</Button>
                                    )}
                                    <IconButton onClick={() => handleDelete(rating.id)} sx={{ position: 'absolute', right: 0, top: 0 }}>
                                        <CloseIcon />
                                    </IconButton>
                                </>
                            )}
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
