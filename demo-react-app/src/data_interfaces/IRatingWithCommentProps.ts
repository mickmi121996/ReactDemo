export interface RatingData {
    productId: number;
    rating: number | null;
    comment: string;
}

export interface RatingWithCommentProps {
    productId: number;
    onSubmit: (ratingData: RatingData) => void;
}

export interface ProductRatingsListProps {
    productId: number;
}

export interface Rating {
    id: number;
    rating: number;
    comment: string;
}