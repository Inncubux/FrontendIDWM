import { Product } from "@/interfaces/Product";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoginDialog } from "./LoginDialog";

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export const ProductDialog = ({
  product,
  open,
  onClose,
}: ProductDialogProps) => {
  if (!product) return null;

  // Estado para la cantidad seleccionada
  const [quantity, setQuantity] = useState(1);

  // Funciones para aumentar/disminuir cantidad
  const increase = () => {
    if (quantity < (product.stock ?? 1)) setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const { user } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setShowDialog(true);
      return;
    }
    //  addToCart(product.id, 1); // Assuming addToCart is a function that takes product ID and quantity
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-transparent border-0 shadow-none">
        <div className="flex flex-col h-full min-h-[400px]">
          {/* Parte superior: imagen sobre fondo blanco */}
          <div className="bg-white flex items-center justify-center h-1/2 p-6">
            <Image
              src={product.urls[0]}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
          {/* Parte inferior: texto sobre fondo negro */}
          <div className="bg-black text-white flex flex-col items-center justify-start h-1/2 p-8 relative">
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Detalle del Producto
            </DialogDescription>
            <p className="text-gray-400 mt-2 text-center">
              {product.description ?? "Sin descripción"}
            </p>
            {/* Stock disponible */}
            <p className="text-gray-400 font-semibold mt-6 w-full text-right">
              Stock disponible: {product.stock ?? 0}
            </p>
            {/* Precio, contador y botón en el borde inferior */}
            <div className="w-full flex justify-between items-center mt-auto pt-6">
              <span className="text-white font-bold text-2xl">
                ${product.price}
              </span>
              {/* Contador de cantidad */}
              <div className="flex items-center gap-2">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-lg"
                  onClick={decrease}
                  disabled={quantity === 1}
                >
                  −
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-lg"
                  onClick={increase}
                  disabled={quantity === (product.stock ?? 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-gray-700 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
                onClick={handleAddToCart}
              >
                Añadir al carrito
              </button>
              <LoginDialog
                open={showDialog}
                onClose={() => setShowDialog(false)}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
