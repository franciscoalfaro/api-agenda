# 📘 API Agenda

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen?logo=mongodb)
![AWS](https://img.shields.io/badge/Deployed-AWS-orange?logo=amazon-aws)
![License](https://img.shields.io/badge/License-MIT-blue)

**API Agenda** es una aplicación backend para la gestión de usuarios y agendas, construida con **Node.js**, **Express** y **MongoDB (Mongoose)**.  
Está desplegada en **AWS** y soporta autenticación, operaciones CRUD de usuarios y agendas, y subida de archivos de avatar.  

---

## 🧰 Tecnologías

- **Node.js** + **Express**
- **MongoDB** con **Mongoose**
- **dotenv** para variables de entorno
- **AWS** (EC2 / Elastic Beanstalk / otro)
- Middlewares: autenticación (`checkAuth`), subida de archivos (`multer`)
- Estructura modular (controllers, services, routes, middlewares, models)

---

## 🚀 Funcionalidades

- Registro y login de usuarios  
- Perfil de usuario con actualización y subida de avatar  
- CRUD de agendas  
- Autenticación JWT (`checkAuth`)  
- Variables de entorno para configuración  
- Despliegue en AWS  

---

## 🛠️ Instalación y ejecución local

1. Clona el repositorio:
```bash
git clone https://github.com/franciscoalfaro/api-agenda.git
cd api-agenda
```

2. Instala dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto usando como base el archivo `.env.example`.

4. Inicia el servidor en modo desarrollo:
```bash
npm run dev
```

Producción:
```bash
npm start
```

---

## 📂 Estructura de carpetas

```text
api-agenda/
├── controllers/        # Controladores de usuarios y agendas
├── routes/             # Definición de rutas
├── services/           # Lógica de negocio
├── models/             # Modelos de Mongoose
├── middlewares/        # checkAuth, subida de archivos, etc.
├── helpers/            # Funciones auxiliares
├── .env                # Variables de entorno
├── .env.example        # Variables de entorno de ejemplo
├── agenda.js           # Punto de entrada
└── package.json
```

---

## 🔍 Endpoints

### Usuario (`/api/user`)

| Método | Ruta                 | Descripción                           | Body / Parámetros |
|--------|--------------------|---------------------------------------|------------------|
| POST   | `/register`          | Registrar un nuevo usuario            | `{name, email, password}` |
| POST   | `/login`             | Login de usuario                      | `{email, password}` |
| GET    | `/profile/:id`       | Obtener perfil de usuario             | `id` en params (JWT requerido) |
| PUT    | `/update`            | Actualizar perfil de usuario          | `{name?, email?, password?}` (JWT requerido) |
| POST   | `/upload`            | Subir avatar                          | Form-data: `file0` (JWT requerido) |
| GET    | `/avatar/:file`      | Obtener archivo de avatar             | `file` en params |

### Agenda (`/api/agenda`)

| Método | Ruta                 | Descripción                          | Body / Parámetros |
|--------|--------------------|--------------------------------------|-----------------|
| POST   | `/create`            | Crear nueva agenda                   | `{title, description?, date}` (JWT requerido) |
| DELETE | `/delete/:id`        | Borrar agenda por ID                  | `id` en params (JWT requerido) |
| PUT    | `/update/:id`        | Actualizar agenda                     | `{title?, description?, date?}` (JWT requerido) |
| GET    | `/list`              | Listar todas las agendas del usuario | — (JWT requerido) |

---

## 🌐 Despliegue en AWS

La API está desplegada en AWS.  
👉 URL de producción: **[https://franalfaro.ddns.net/api-agenda](https://franalfaro.ddns.net/api-agenda/)**  

---

## ⏭️ Roadmap / Futuras mejoras

- Autenticación con roles y permisos  
- Validación avanzada de inputs  
- Documentación con Swagger / OpenAPI  
- Paginación y filtros en agendas  
- Tests unitarios con Jest / Supertest  

---

## 🧑‍💻 Autor

- **Francisco Alfaro**  
- GitHub: [franciscoalfaro](https://github.com/franciscoalfaro)  
- Email: contacto@franciscoalfaro.cl  

---

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

---

## 📂 .env.example

```env
# Servidor
PORT=3000

# Base de datos MongoDB
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/agenda

# Seguridad
JWT_SECRET=tu_secreto_jwt

# (Opcional) Configuración AWS / Logs
AWS_REGION=us-east-1
```