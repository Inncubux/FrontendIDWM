'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiBackend } from "@/clients/axios";
import { useAuth } from "@/hooks/useAuth";


const productSchema = z.object({
  name: z.string().nonempty({ message: "El nombre es obligatorio" }),
  description: z.string().nonempty({ message: "La descripción es obligatoria" }),
  price: z
    .number({ invalid_type_error: "El precio debe ser un número" })
    .positive({ message: "El precio debe ser mayor a 0" }),
  category: z.string().nonempty({ message: "La categoría es obligatoria" }),
  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int({ message: "El stock debe ser un número entero" })
    .min(0, { message: "El stock no puede ser negativo" }),
  brand: z.string().nonempty({ message: "La marca es obligatoria" }),
});

export const CreateProductPage = () => {
  const router = useRouter();
  const { user } = useAuth(); // Aquí obtienes el token
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      category: "",
      stock: undefined,
      brand: "",
    },
  });

    const [errors, setErrors] = useState<string | null>(null);
    const [errorsBools, setErrorsBool] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    try {
        console.log("Valores del formulario:", values);
        if (!user) {
          setErrors("Usuario no autenticado.");
          setErrorsBool(true);
          setSuccess(false);
          return;
        }
        const {data} = await ApiBackend.post<any>("product/create", values, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (data.success === false) {
            console.error("Error en la respuesta del servidor:", data.message);
            setErrors("Error en la respuesta del servidor: " + data.message);
            setErrorsBool(true);
            setSuccess(false);
            return;
        }
            setSuccess(true);
            setErrors(null);
            setErrorsBool(false);
            router.push("/admin/products");
            console.log("Respuesta del servidor:", data.data);
        }
    catch (error: any) {
    // Si hay errores de validación, los extraemos y los mostramos juntos
      const errorsObj = error?.response?.data?.errors;
      let backendMsg =
        error?.response?.data?.message || error?.message || "Error desconocido";
      if (errorsObj) {
        // Unimos todos los mensajes de error en un solo string
        backendMsg = Object.values(errorsObj).flat().join(" ");
      }
      setErrors(backendMsg);
      setErrorsBool(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    {/* Lado izquierdo: cuadro negro */}
    <div className="md:w-1/2 w-full bg-black text-white flex flex-col justify-center items-center p-10 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        <br className="hidden md:block" /> E-Commerce
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-300">
        de BLACKCAT
      </p>
      <Button
        variant="outline"
        className="mt-4 text-black"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon />
        Volver
      </Button>
    </div>
    {/* Lado derecho: formulario */}
    <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-10 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        Crear producto
      </h1>
      <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-4"
            >
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                        <Input placeholder="Nombre del producto" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                        <Input placeholder="Descripción" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
  control={form.control}
  name="price"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Precio</FormLabel>
      <FormControl>
        <Input
          type="number"
          step="0.01"
          placeholder="119990"
          {...field}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                        <Input placeholder="Categoría" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                        <Input placeholder="Marca" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full mt-4">
                Crear producto
                </Button>
            </form>
            </Form>
        </div>
        </div>
  );
};