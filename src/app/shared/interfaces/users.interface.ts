import { IOrderResponse } from "./order.interface";

export interface IUserRequest{
    email:string,
    password: any,
    firtsName: string,
    lastName: string,
    phone: string,
    orders: Array<IOrderResponse>
    role: string
}

export interface IUserResponse{
    email:string,
    password: any,
    firtsName: string,
    lastName: string,
    phone: string,
    orders: Array<IOrderResponse>
    role:string,
    id:number
}