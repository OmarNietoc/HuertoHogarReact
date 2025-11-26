import api from './api';

export const shoppyService = {
    // Ejemplo de función para obtener productos
    // Ajusta el endpoint '/products' según la ruta real de tu API Gateway
    getProducts: async () => {
        try {
            const response = await api.get('/api/products');
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
    }
};
