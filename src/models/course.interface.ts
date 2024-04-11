export interface Course extends CourseInCart{
    image: string;
    author: string;
    label: string;
    discount: number;
    level: string[];
    rating: number;
    numOfSold: number;
    oldPrice: number;
    lastUpdate: string;
    totalHours: number;
    description: string;
    objectives: string[];
    liked: boolean;
    quantity: number;
}

export interface CourseInCart {
    id: number;
    title: string;
    price: number,
    promoPrice: number;
    avatar: string;
}
