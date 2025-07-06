
'use client';
import { ProductCard } from "@/components/products/ProductCard";
import { ProductDialog } from "@/components/products/ProductDialog";
import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/stores/ProductStore"
import { useEffect, useState } from "react";
import { Navbar } from '../../components/Navbar';


export default function ViewProductsPage() {
    const {products, loading, fetchProducts, filters} = useProductStore();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    if (loading) {
        return <div className="text-center py-20 text-lg font-semibold">Cargando Productos</div>
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <Navbar/>

            <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => setSelectedProduct(product)}
                    />
                ))}
            </div>

            {/* ProductDialog con Producto Seleccionado */}
            <ProductDialog
                product ={selectedProduct}
                open={!!selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />

        </div>
    )
}