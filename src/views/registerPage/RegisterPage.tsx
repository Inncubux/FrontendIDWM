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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        minWidth: "900px",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      {/* Lado izquierdo: cuadro negro */}
      <div
        style={{
          width: "35%",
          background: "#111",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "2.2rem",
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Regístrate en <br /> E-Commerce
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#ccc", textAlign: "center" }}>
          de black cat
        </p>
      </div>

      {/* Lado derecho: formulario */}
      <div
        style={{
          width: "65%",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ width: 420 }}>
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
            <div
              style={{ marginTop: 16, color: "#dc2626", textAlign: "center" }}
            >
              {errors}
            </div>
          )}
          {success && (
            <div
              style={{ marginTop: 16, color: "#16a34a", textAlign: "center" }}
            >
              ¡Registro exitoso! Ahora puedes iniciar sesión.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
