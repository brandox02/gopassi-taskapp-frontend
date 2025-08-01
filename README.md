## TaskApp - Aplicación de Gestión de Tareas en Tiempo Real

### Descripción

TaskApp es una aplicación móvil desarrollada con Expo que permite a los usuarios
gestionar sus tareas con funcionalidades en tiempo real. La aplicación incluye:

### Funcionalidades principales

- **Autenticación Segura**:
  - JWT con almacenamiento seguro
  - Protección de rutas
  - Persistencia de sesión

- **Tiempo Real**:
  - Actualización instantánea de tareas entre dispositivos
  - Notificaciones de cambios vía WebSockets

- **Experiencia de Usuario**:
  - Interfaz adaptable a tema claro/oscuro
  - Validación de formularios en cliente
  - Feedback visual para operaciones
  - Animaciones y transiciones

- **Gestión de Estado**:
  - Zustand para estado global
  - Separación clara entre lógica y UI
  - Optimizaciones de rendimiento

### Tecnologías utilizadas

- **Frontend**: Expo (React Native), TypeScript
- **Estado**: Zustand
- **API Client**: Axios
- **WebSockets**: Socket.IO
- **Formularios**: React Hook Form + Yup
- **Navegación**: Expo Router
- **Persistencia**: Async Storage
- **Estilos**: StyleSheet con adaptación a tema claro/oscuro

### Estructura del Proyecto

```bash
brandox02-gopassi-taskapp-frontend/
├── app/                  # Rutas de la aplicación
│   ├── (protected)/      # Rutas protegidas (requieren autenticación)
│   └── (public)/         # Rutas públicas (login/registro)
├── components/           # Componentes reutilizables
├── constants/            # Constantes como colores
├── context/              # Contextos (actualmente vacío)
├── features/             # Lógica de features (auth, tasks)
├── utils/                # Utilidades (api client, storage)
└── package.json              # Dependencias y scripts
```

### Requisitos previos

- Node.js (v18 o superior)
- npm (node package manager)
- Expo CLI instalado globalmente (npm install -g expo-cli)
- Dispositivo móvil con la app Expo Go o emulador configurado
- Tener corriendo el backend
  [`gopassi-taskapp-backend`](https://github.com/brandox02/gopassi-taskapp-backend)
  corriendo en el puerto 3000 de tu computador.

### Configuración y Ejecución

#### 1. Clonar el repositorio:

```bash
git clone https://github.com/brandox02/gopassi-taskapp-frontend
cd gopassi-taskapp-frontend
```

#### 2. Obtener la dirección IP de tu red local:

Ejecuta uno de los siguientes comandos en tu terminal según tu sistema
operativo:

```bash
# Windows:
ipconfig | findstr "IPv4"

# Linux/Mac:
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Busca la dirección IP asociada a tu adaptador de red (no la 127.0.0.1). Debería
ser algo como `192.168.x.x` o `172.x.x.x`

#### 3. Configurar la variable de entorno

Crea un archivo `.env` en la raíz del proyecto basado en el `.env.example`:

```bash
EXPO_PUBLIC_API_URL=http://<tu-ip>:3000
```

Reemplaza `<tu-ip>` con la dirección IP que obtuviste en el paso anterior.

#### 4. Instalar dependencias

```bash
npm install
```

#### 4. Iniciar la aplicación

```bash
npm start
```

Esto iniciará el servidor de desarrollo de Expo. Puedes:

- Escanear el código QR con la app Expo Go en tu dispositivo móvil
- Presionar `i` para abrir en un emulador iOS(en caso de que estes en macbook y
  tengas xCode instalado)
- Presionar `a` para abrir en un emulador Android (en caso de que tengas android
  studio instalado con emuladores)

#### 5. Nota sobre el backend

Este proyecto asume que tienes el backend
[`gopassi-taskapp-backend`](https://github.com/brandox02/gopassi-taskapp-backend)
corriendo en el puerto 3000 de tu computador.

### Posibles Mejoras

- Implementar pruebas unitarias y E2E más completas
- Añadir internacionalización (i18n)
- Implementar notificaciones push
- Añadir categorías/etiquetas para tareas
- Implementar búsqueda y filtrado de tareas

### Solución de Problemas

Si tienes problemas de conexión:

1. Verifica que tu backend esté corriendo
2. Confirma que la IP en .env es correcta
3. Asegúrate que ambos dispositivos (servidor y cliente) están en la misma red
4. Verifica que el puerto 3000 esté accesible en tu red local
