import { Product } from "@/interfaces/Product";
import { ProductFilters } from "@/services/ProductServices";
import { create } from "zustand";
import { ProductServices } from "@/services/ProductServices";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  fetchProducts: () => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filters: { pageNumber: 1, pageSize: 10 },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { filters } = get();
      const data = await ProductServices.fetchProducts(filters);
      console.log("Productos obtenidos:", data);
      set({ products: data, loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Error al obtener los productos",
      });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
}));
