TP Frontend - Task List

Descripción:
Frontend desarrollado en React (Vite) para un gestor de tareas.
Se conecta a una API Express + MySQL.
Incluye autenticación JWT, verificación por email y CRUD completo.

Tecnologías utilizadas:
- React
- Vite
- React Router
- Axios

Instalación:

1. Clonar repositorio
2. Ejecutar:
   npm install

Ejecución:

npm run dev

El frontend corre en:
http://localhost:5173

Configuración API:

El frontend consume la API en:
http://localhost:3000

Funcionalidades:

- Registro de usuario
- Verificación de cuenta por email (Mailtrap)
- Login con JWT
- Dashboard protegido
- CRUD de tareas
- Detalle de tarea (/tasks/:id)
- Menú Usuario con nombre, email y logout
- UI responsiva

Flujo de uso:

1. Registrarse
2. Revisar email en Mailtrap
3. Verificar cuenta
4. Iniciar sesión
5. Gestionar tareas