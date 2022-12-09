export interface IReview {
    text: string;
    userId: number;
    filmId: number;
}

export interface IFullReviewInfo extends IReview {
    id: number;
    fullName: string;
    date: string;
    createdAt: string;
}