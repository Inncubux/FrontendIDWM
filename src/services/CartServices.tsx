import { ApiBackend } from "@/clients/axios"
import { ResponseAPI } from "@/interfaces/ResponseAPI"
import { create } from "domain";


export const CartServices = {
    fetchCart: async () => {
        try{
            const response = await ApiBackend.get<ResponseAPI>("Cart");
            console.log("Carrito obtenido:", response.data);
            return response.data?.data;
        }catch (error) {
            console.error("Error al obtener el carrito:", error);
            throw new Error("No se pudo obtener el carrito");
        }

    },

    addToCart: async (productId: number, quantity: number) => {
        try{
            const resp = await ApiBackend.post<ResponseAPI>(`basket?productId=${productId}&quanity=${quantity}`,
                {},
            );
        }
        catch(error){
            console.error("Error al agregar producto al carrito:", error);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    },

    removeFromCart: async (productId: number, quantity: number) => {
        try{
            const resp = await ApiBackend.delete<ResponseAPI>(`basket?productId=${productId}&quanity=${quantity}`,
                {},
            );
            console.log("Producto eliminado del carrito:", resp.data);
        } catch(error){
            console.error("Error al eliminar producto del carrito:", error);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    },

    createOrder: async () => {
        try {
            const resp = await ApiBackend.post<ResponseAPI>('order');
            console.log("Orden creada:", resp.data);
            return resp.data?.data;
        } catch (error) {
            console.error("Error al crear la orden:", error);
            throw new Error("No se pudo crear la orden");
        }
    }

    
}