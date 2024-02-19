import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Card } from '@mui/material';
import Rating from '@mui/material/Rating';
import { RatingData, RatingWithCommentProps, NewRatingData } from '../../data_interfaces/IRatingWithCommentProps';


const RatingWithComment: React.FC<RatingWithCommentProps> = ({ productId, onSubmit }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (rating !== null) {
            const ratingData: NewRatingData = { productId, rating, comment };
            onSubmit(ratingData);
            setRating(0);
            setComment('');
        }
    };
    
    

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
            <Card variant="outlined" sx={{ p: 2 }}>
                <Typography component="legend">Laissez votre évaluation</Typography>
                <Rating name="product-rating" value={rating} precision={0.5} onChange={(event, newValue) => { setRating(newValue ?? 0); }} />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="comment"
                    label="Commentaire"
                    name="comment"
                    autoComplete="off"
                    multiline
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    variant="outlined"
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Envoyer
                </Button>
            </Card>
        </Box>

    );
};

export default RatingWithComment;
