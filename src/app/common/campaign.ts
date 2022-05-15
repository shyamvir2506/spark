import { Product } from "./product";

export interface Campaign{
    name:string,
    logo:string,
    path:string,
    products:Array<Product>
}