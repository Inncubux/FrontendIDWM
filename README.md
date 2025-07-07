# E-Commerce Frontend

Proyecto de e-commerce con autenticación (login y registro) en React + Next.js.
Alumno: Axel Mondaca Sanhueza 21.043.447-k
Email: axel.mondaca@alumnos.ucn.cl

## Requisitos

- **Node.js** v20.x o superior (recomendado v20.11.0)
- **npm** v9.x o superior
- Acceso a la API backend en `http://localhost:5000/api`

## Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/inncubux/frontendIDWM.git
   cd e-commerce
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   npm install @radix-ui/react-dialog
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` en la raíz del proyecto si tu frontend necesita variables (por ejemplo, para la URL base de la API).
   - Ejemplo:

     ```
     NEXT_PUBLIC_API_URL=http://localhost:puerto/api
     DOMAIN= "LOCALHOST:3000"


     ```

4. **Ejecuta el proyecto en desarrollo:**

   ```bash
   npm run dev
   ```

5. **Accede a la aplicación:**
   - Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Dependencias principales

- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Zod](https://zod.dev/) (validación de formularios)
- [React Hook Form](https://react-hook-form.com/)
- [Axios](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/) (si aplica)
- [@hookform/resolvers](https://react-hook-form.com/get-started#SchemaValidation)

## Notas

- El backend debe estar corriendo y accesible en la URL configurada.
- Si usas rutas diferentes o necesitas cambiar la URL base de la API, edita la configuración correspondiente en el cliente Axios o en las variables de entorno.
- Para producción, asegúrate de configurar correctamente las variables de entorno y los orígenes permitidos en el backend.

---

**Versión mínima recomendada de Node.js:**  
`v22.11.0`

Puedes verificar tu versión con:

```bash
node -v
```
