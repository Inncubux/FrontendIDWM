"use client";

import { ApiBackend } from "@/clients/axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z
  .object({
    firtsName: z.string().nonempty({ message: "El nombre es obligatorio" }),
    lastName: z.string().nonempty({ message: "El apellido es obligatorio" }),
    email: z
      .string()
      .email({ message: "Ingrese un correo electrónico válido" }),
    thelephone: z.string().nonempty({ message: "El teléfono es obligatorio" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string().min(8, { message: "Confirme su contraseña" }),
    street: z.string().nonempty({ message: "La calle es obligatoria" }),
    number: z.string().nonempty({ message: "El número es obligatorio" }),
    commune: z.string().nonempty({ message: "La comuna es obligatoria" }),
    region: z.string().nonempty({ message: "La región es obligatoria" }),
    postalCode: z
      .string()
      .nonempty({ message: "El código postal es obligatorio" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const RegisterPage = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firtsName: "",
      lastName: "",
      email: "",
      thelephone: "",
      password: "",
      confirmPassword: "",
      street: "",
      number: "",
      commune: "",
      region: "",
      postalCode: "",
    },
  });

  const [errors, setErrors] = useState<string | null>(null);
  const [errorsBools, setErrorsBool] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Valores del formulario:", values);
      const { data } = await ApiBackend.post<any>("Auth/register", values);
      if (data.success == false) {
        console.error("Error en la respuesta del servidor:", data.message);
        setErrors("Error en la respuesta del servidor: ");
        setErrorsBool(true);
        setSuccess(false);
        return;
      }
      setErrors(null);
      setErrorsBool(false);
      setSuccess(true);
      console.log("Respuesta del servidor:", data.data);
    } catch (error: any) {
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
    <div className="flex flex-col md:flex-row h-scren-auto">
      {/* Lado izquierdo: cuadro negro */}
      <div className="md:w-1/2 w-full bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Regístrate en <br className="hidden md:block" /> E-Commerce
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
      <div className="md:w-1/2 w-full bg-white flex flex-col justify-center items-center p-10">
        <h2
          style={{
            fontSize: "1.7rem",
            fontWeight: "bold",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Crear cuenta
        </h2>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          ¡Únete a nuestra comunidad!
        </h3>
        <p
          style={{
            marginBottom: 16,
            fontSize: "0.95rem",
            color: "#555",
            textAlign: "center",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            style={{ color: "#2563eb", textDecoration: "underline" }}
          >
            Inicia sesión aquí
          </a>
          .
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <FormField
                control={form.control}
                name="firtsName"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input placeholder="Apellido" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="correo@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="thelephone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="+569..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
                    <FormLabel>Confirmar contraseña</FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calle</FormLabel>
                  <FormControl>
                    <Input placeholder="Calle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div style={{ display: "flex", gap: 8 }}>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem style={{ flex: 1 }}>
                    <FormLabel>Código postal</FormLabel>
                    <FormControl>
                      <Input placeholder="1234567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="commune"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comuna</FormLabel>
                  <FormControl>
                    <Input placeholder="Comuna" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Región</FormLabel>
                  <FormControl>
                    <Input placeholder="Región" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" style={{ width: "100%" }}>
              Registrarse
            </Button>
          </form>
        </Form>

        {errors && (
          <div style={{ marginTop: 16, color: "#dc2626", textAlign: "center" }}>
            {errors}
          </div>
        )}
        {success && (
          <div style={{ marginTop: 16, color: "#16a34a", textAlign: "center" }}>
            ¡Registro exitoso! Ahora puedes iniciar sesión.
          </div>
        )}
      </div>
    </div>
  );
};
