'use client';

import { useRouter } from "next/navigation";

export const AdminPage = () => {
    const router = useRouter();

    return (
        <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mt-8 text-center">
                Bienvenido al panel de administración
            </h1>
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition w-full"
                    onClick={() => router.push("/admin/products")}
                >
                    Gestión de productos
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition w-full"
                    onClick={() => router.push("/admin/users")}
                >
                    Gestión de usuarios
                </button>
                <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition w-full"
                    onClick={() => router.push("/admin/orders")}
                >
                    Historial de órdenes
                </button>
            </div>
        </div>
    );
}