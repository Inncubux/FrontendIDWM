import { Product } from "../../interfaces/Product";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { LoginDialog } from "./LoginDialog";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  // const { addToCart } = useCartStore(); // Assuming you have a cart store to handle adding products

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
    <div>
      <div
        className="bg-black shadow-md text-white rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
        onClick={onClick}
      >
        <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center">
          <Image
            src="/Productos.webp"
            alt={product.name}
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-center text-lg">{product.name}</h3>
          <div className="flex justify-between items-center mt-3">
            <p className="text-white font-bold text-xl mt-3">
              ${product.price}
            </p>
            <Button
              className="mt-4 text-right hover:bg-green-700"
              onClick={handleAddToCart}
            >
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </div>

      <LoginDialog open={showDialog} onClose={() => setShowDialog(false)} />
    </div>
  );
};
