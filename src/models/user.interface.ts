import {CourseInCart} from '@model/course.interface';

export interface User extends UserLoginRequestBody{
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    registerDate: string;
    email: string;
    phoneNumber: string;
    socialMedia: SocialMedia;
    cart: CourseInCart[];
}

export interface UserLoginForm extends UserLoginRequestBody {
    rememberMe: boolean;
}

export interface UserLoginRequestBody {
    username: string;
    password: string;
}

export interface SocialMedia {
    facebook: string;
    twister: string;
    instagram: string;
    linkedin: string;
    youtube: string;
}
