"use client";

import { ApiBackend } from "@/clients/axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { set, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Ingrese un correo electrónico válido",
    })
    .nonempty({
      message: "El correo electrónico es obligatorio",
    }),

  password: z.string().nonempty({
    message: "La contraseña es obligatoria",
  }),
});

export const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [errors, setErrors] = useState<string | null>(null);
  const [errorBool, setErrorBool] = useState<boolean>(false);
  const { auth, user } = useContext(AuthContext);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores del formulario:", values);
      const { data } = await ApiBackend.post<any>("Auth/login", values);
      if (data.success === false) {
        console.error("Error en la respuesta del servidor:", data.message);
        setErrors("Error en la respuesta del servidor: ");
        setErrorBool(true);
        return;
      }
      setErrors(null);
      setErrorBool(false);
      const data_ = data.data;
      const user_: User = {
        email: data_.email,
        firtsName: data_.firtsName,
        lastName: data_.lastName,
        token: data_.token,
      };
      auth(user_);
      console.log("Usuario autenticado:", user);
      console.log("Respuesta del servidor:", data.data);
    } catch (error: any) {
      let errorMessage = error.response.data.message;
      console.error("Error enviando el formulario:", errorMessage);
      setErrors(errorMessage);
      setErrorBool(true);
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Lado izquierdo: cuadro negro */}
      <div className="md:w-1/2 w-full bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Bienvenido a <br className="hidden md:block" /> E-Commerce
        </h1>
        <p className="text-lg md:text-xl text-center text-gray-300">
          de black cat
        </p>
      </div>

      {/* Lado derecho: formulario */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">
            Iniciar sesión
          </h2>
          <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
            ¡Bienvenido de nuevo!
          </h3>
          <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-blue-600 underline">
              Crea una ahora
            </a>
            , es gratis.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo</FormLabel>
                    <FormControl>
                      <Input placeholder="correo@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Iniciar sesión</Button>
            </form>
          </Form>

          <div className="mt-4 text-sm text-center md:text-left">
            ¿Olvidaste tu contraseña?{" "}
            <a href="#" className="text-blue-600 underline">
              Haz clic aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
