export interface NewRatingData {
    productId: number;
    rating: number;
    comment: string;
}

export interface RatingData extends NewRatingData {
    id: number;
    created_at: string;
    username: string;
}

export interface RatingWithCommentProps {
    productId: number;
    onSubmit: (ratingData: NewRatingData) => void;
}

export interface ProductRatingsListProps {
    productId: number;
}

export interface Rating {
    id: number;
    rating: number;
    comment: string;
}