# Sistema de Gestión de Equipamiento

Sistema integral para la gestión, mantenimiento y control de inventario de equipamiento médico y no médico para instituciones sanitarias.

---

## 🎯 Características Principales

- ✅ **Gestión de dispositivos**: Inventario completo de equipos con información detallada
- ✅ **Gestión de accesorios**: Control de accesorios asociados a equipos
- ✅ **Solicitudes de mantenimiento**: Creación y seguimiento de solicitudes
- ✅ **Órdenes de trabajo**: Gestión completa del ciclo de trabajo de mantenimiento
- ✅ **Solicitudes de compra**: Gestión de solicitudes para nuevo equipamiento y/o accesorios
- ✅ **Control de estados**: Seguimiento histórico de cambios de estado para todos los elementos
- ✅ **Departamentos y áreas**: Organización jerárquica por entidad, departamento y subdepartamento
- ✅ **Control de acceso**: Sistema de autenticación y autorización basado en roles y permisos
- ✅ **Reportes**: Generación de informes técnicos y estadísticos

---

## 🛠️ Tecnologías Utilizadas

- **Backend**: Node.js + Express + TypeScript
- **ORM**: Sequelize
- **Base de datos**: MySQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: Express Validator

---

## 🏗️ Arquitectura

El proyecto sigue una **arquitectura en capas** para garantizar mantenibilidad y escalabilidad:

1. **Capa de Controladores**: Manejo de peticiones HTTP y respuestas
2. **Capa de Servicios**: Lógica de negocio centralizada
3. **Capa de Acceso a Datos (DAOs)**: Interacción con la base de datos
4. **Capa de Modelos**: Definición de entidades y relaciones
5. **Capa de DTOs**: Objetos de transferencia de datos

### Patrones de Diseño Implementados
- **Singleton**: Para servicios y controladores
- **DTO**: Para transferencia segura de datos
- **DAO**: Para abstraer la lógica de acceso a datos
- **Adapter**: Para estandarizar respuestas

---

## 🧪 Testing

El proyecto incluye un sistema de testing comprehensivo con **100% de cobertura** que verifica el funcionamiento correcto de todos los endpoints de la API.

**Cobertura completa:**
- ✅ Gestión de dispositivos médicos
- ✅ Gestión de accesorios e inventario
- ✅ Órdenes de trabajo y solicitudes
- ✅ Entidades, departamentos y usuarios
- ✅ Autenticación, autorización y permisos
- ✅ Validación de datos y casos límite

---

## 📊 Estadísticas del Proyecto

- **65+** Endpoints implementados
- **20+** Modelos de base de datos
- **25** Archivos de test
- **295+** Casos de prueba
- **100%** Cobertura de testing

---

## 📚 Estructura de Directorios

```
src/
├── config/               # Configuración general
├── constants/            # Constantes y enumeraciones
├── controllers/          # Controladores de la API
├── daos/                 # Objetos de acceso a datos
├── data/                 # Datos estáticos para seeds
├── db/                   # Scripts de base de datos
│   ├── init.ts
│   └── seeds/
├── dtos/                 # Objetos de transferencia de datos
├── middlewares/          # Autenticación, validación, etc.
├── models/               # Modelos de base de datos (Sequelize)
├── routes/               # Definición de rutas
├── services/             # Lógica de negocio
├── utils/                # Utilidades y helpers
└── app.ts                # Punto de entrada
```

---

## ✨ Funcionalidades Principales

✅ Autenticación y autorización con JWT  
✅ Gestión completa de dispositivos médicos  
✅ Sistema de órdenes de trabajo  
✅ Solicitudes de mantenimiento y compra  
✅ Inventario de accesorios  
✅ Gestión de entidades y departamentos  
✅ Sistema completo de reportes  
✅ Catálogos de configuración  
✅ Gestión de usuarios con roles  
✅ Suite completa de tests (100% de endpoints)
