import { ITyresResponse } from "./tyres.interface";

export interface IOrderRequest {
    basket: Array<ITyresResponse>,
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    delivery: string,
    city: string,
    street: string,
    payment: string,
    status: string
}

export interface IOrderResponse {
    id: number,
    basket: Array<ITyresResponse>,
    firstName: string,
    lastName: string,
    email: string,
    number: string,
    delivery: string,
    city: string,
    street: string,
    payment: string,
    date: Date,
    status:string
}