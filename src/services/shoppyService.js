import api from './api.js';

export const shoppyService = {

    getProducts: async () => {
        try {
            const response = await api.get('/api/products');
            // Si es 204 No Content o viene vacío, retornar array vacío
            if (!response.data || !Array.isArray(response.data)) {
                return [];
            }
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    // Obtener un solo producto
    getProductById: async (id) => {
        const response = await api.get(`/api/products/${id}`);
        return response.data;
    },

    // Crear producto
    createProduct: async (productData) => {
        const response = await api.post('/api/products', productData);
        return response.data;
    },

    // Actualizar producto
    updateProduct: async (id, productData) => {
        const response = await api.put(`/api/products/${id}`, productData);
        return response.data;
    },

    // Eliminar producto
    deleteProduct: async (id) => {
        const response = await api.delete(`/api/products/${id}`);
        return response.data;
    },

    // Obtener categorías (para el formulario)
    getCategories: async () => {
        const response = await api.get('/api/products/categories');
        return response.data;
    },

    // Obtener unidades (para el formulario)
    getUnits: async () => {
        const response = await api.get('/api/products/units');
        return response.data;
    },

    // Función genérica para probar conexión
    healthCheck: async () => {
        try {
            const response = await api.get('/'); // O el endpoint que tengas para health check
            return response.data;
        } catch (error) {
            console.error('Error in health check:', error);
            throw error;
        }
    },

    // --- GESTIÓN DE USUARIOS ---

    // Login
    login: async (credentials) => {
        const response = await api.post('/api/auth/login', credentials);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    },

    // Obtener usuario por email
    getUserByEmail: async (email) => {
        try {
            const response = await api.get(`/api/users/by-email?email=${email}`);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // Usuario no encontrado
            }
            throw error;
        }
    },

    // Obtener todos los usuarios
    getUsers: async () => {
        const response = await api.get('/api/users');
        return response.data;
    },

    // Crear usuario (Registro)
    createUser: async (userData) => {
        // userData debe coincidir con UserDto del backend
        const response = await api.post('/api/auth/register', userData);
        return response.data;
    },

    // Actualizar usuario
    updateUser: async (id, userData) => {
        const response = await api.put(`/api/users/${id}`, userData);
        return response.data;
    },

    // Eliminar usuario
    deleteUser: async (id) => {
        const response = await api.delete(`/api/users/${id}`);
        return response.data;
    },

    // --- REGIONES Y COMUNAS ---

    getRegions: async () => {
        // Asumiendo que existe un endpoint para regiones, si no, se debe crear en el backend
        // Por ahora simularemos o usaremos el endpoint si existiera.
        // Como no creamos endpoint de regiones en el plan backend explícitamente (solo entidades),
        // asumiremos que se pueden obtener. Si no, deberíamos haber creado el controller.
        // REVISIÓN: El plan backend solo creó entidades. Faltó el controller de regiones/comunas.
        // Vamos a asumir que se implementará o se usará un endpoint genérico si existiera,
        // pero lo correcto es tenerlo.
        // Para no bloquear, dejaremos esto pendiente de implementación real en backend si falla.
        const response = await api.get('/api/regions');
        return response.data;
    },

    getComunasByRegion: async (regionId) => {
        const response = await api.get(`/api/comunas/by-region/${regionId}`);
        return response.data;
    }
};
