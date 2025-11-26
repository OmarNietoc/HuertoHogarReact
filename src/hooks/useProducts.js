
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shoppyService } from '../services/shoppyService';

// Hook para obtener todos los productos
export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: shoppyService.getProducts,
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};

// Hook para obtener un solo producto
export const useProduct = (id) => {
    return useQuery({
        queryKey: ['products', id],
        queryFn: () => shoppyService.getProductById(id),
        enabled: !!id, // Solo ejecuta si hay ID
    });
};

// Hook para crear producto
export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: shoppyService.createProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']); // Recargar lista
        },
    });
};

// Hook para actualizar producto
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }) => shoppyService.updateProduct(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(['products']);
            queryClient.invalidateQueries(['products', variables.id]); // Recargar detalle
        },
    });
};

// Hook para eliminar producto
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: shoppyService.deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

// Hook para categorías
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: shoppyService.getCategories,
        staleTime: Infinity, // Rara vez cambian
    });
};

// Hook para unidades
export const useUnits = () => {
    return useQuery({
        queryKey: ['units'],
        queryFn: shoppyService.getUnits,
        staleTime: Infinity,
    });
}
