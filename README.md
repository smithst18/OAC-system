# SGAP - Sistema de Gestión de Ayudas Sociales

SGAP (Sistema de Gestión de Ayuda Social) es una plataforma robusta diseñada para gestionar de manera eficiente los casos de ayuda social de una empresa que presta este tipo de servicios. El sistema cuenta con un módulo completo de gestión de usuarios, incluyendo CRUD con soft delete y permisos diferenciados para administradores y auditores.

## Características principales

- **Gestión de usuarios**: CRUD con soporte de soft delete y roles diferenciados (administrador, auditor).
- **Gestión de casos de ayuda social**: Registro y seguimiento de casos de ayuda social mediante tablas interactivas.
- **Estadísticas detalladas**: Generación de estadísticas generales y específicas basadas en tiempo y características particulares.
- **Arquitectura modular**: Uso de componentes reutilizables en Vue 3 para garantizar la escalabilidad y mantenibilidad del sistema.
- **Flujo de datos eficiente**: Gestión de estado global mediante Pinia.
- **Validaciones robustas**: Validaciones estrictas en los datos y permisos de usuario tanto en frontend como en backend.

## Tecnologías utilizadas

- **Frontend**: Vue 3, Pinia, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Base de datos**: MongoDB, Mongoose
- **Estilos**: Tailwind CSS
- **Validaciones**: Validación de datos y permisos mediante TypeScript y Mongoose, ademas de la imprementacion de veevalidate para formularios y expressvalidator

## Instalación

Para ejecutar el proyecto localmente, sigue los siguientes pasos:

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/sgap.git
cd sgap
```
### 2. Instala las dependencias necesarias con:
```bash
npm install
```
### 3. Compilar y ejecutar en modo desarrollo:
```bash
npm run dev
```
### 4. Compilar y minificar para producción:
```bash
npm run build
```
### 5. Verificación de tipos:
```bash
npm run type-check
```
### 6. Linting con ESLint:
```bash
npm run lint
```
