import { ICategoryResponse } from "./category.interface";

export interface ITyresRequest{
    category: ICategoryResponse,
    imagePath: string,
    path:string,
    brand: string,
    model: string,
    width: string,
    height: string,
    dia: string,
    speed: string,
    weight: string,
    season:string,
    count:number,
    orderCount:number, 
    price:number
}

export interface ITyresResponse{
    id:number
    category: ICategoryResponse,
    imagePath: string,
    path:string,
    brand: string,
    model: string,
    width: string,
    height: string,
    dia: string,
    speed: string,
    weight: string,
    season:string,
    count:number,
    orderCount: number,
    price:number
}


// export interface ITyres{
//     id:number,
//     category: ICategoryResponse,
//     // imagePath: string,
//     path:string,
//     brand: string,
//     model: string,
//     width: string,
//     height: string,
//     dia: string,
//     speed: string,
//     weight: string,
//     season:string,
//     count:number,
//     price:number
// }