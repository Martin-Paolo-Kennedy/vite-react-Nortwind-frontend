import { Categoria } from "./categoria";
import { Proveedor } from "./proveedor";

export interface Producto{
    productID: number;
    productName: string;
    unit: string;
    price: number;
    supplier: Proveedor;
    category: Categoria;
}