import fs from 'fs/promises';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'http://localhost:8080'; // API Gateway URL

// Helper to read JSON
const readJson = async (filePath) => {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
};

// Helper to read Image as Base64 (byte array for Java)
const readImageAsBase64 = async (imagePath) => {
    try {
        // La ruta en el JSON es relativa a public, ej: /img/products/apples2.jpg
        // Debemos buscar en ./public/img/products/apples2.jpg
        const fullPath = path.join(__dirname, 'public', imagePath);
        const buffer = await fs.readFile(fullPath);
        // Java espera un array de bytes, pero en JSON viaja como Base64 string
        return buffer.toString('base64');
    } catch (error) {
        console.warn(`Warning: Image not found at ${imagePath}, skipping image.`);
        return null;
    }
};

const seed = async () => {
    try {
        console.log('🌱 Starting seeding process...');

        // 1. Load Data
        const categoriesData = await readJson(path.join(__dirname, 'public/data/categorias.json'));
        const productsData = await readJson(path.join(__dirname, 'public/data/productos.json'));

        // 2. Create Categories
        console.log('📦 Seeding Categories...');
        for (const cat of categoriesData) {
            try {
                await axios.post(`${API_URL}/api/products/categories/add`, {
                    name: cat.nombre // Map 'nombre' to 'name'
                });
                console.log(`   ✅ Created category: ${cat.nombre}`);
            } catch (e) {
                if (e.response && e.response.status === 400) {
                    console.log(`   ⚠️ Category already exists: ${cat.nombre}`);
                } else {
                    console.error(`   ❌ Error creating category ${cat.nombre}:`, e.message);
                }
            }
        }

        // 3. Fetch Categories to get IDs
        console.log('🔄 Fetching Categories to map IDs...');
        const categoriesResponse = await axios.get(`${API_URL}/api/products/categories`);
        const categoriesMap = {}; // Name -> ID
        categoriesResponse.data.forEach(c => {
            categoriesMap[c.name] = c.id;
        });

        // 4. Extract and Create Units
        console.log('📦 Seeding Units...');
        const uniqueUnits = [...new Set(productsData.map(p => p.unid))];
        for (const unitName of uniqueUnits) {
            try {
                await axios.post(`${API_URL}/api/products/units/add`, {
                    name: unitName
                });
                console.log(`   ✅ Created unit: ${unitName}`);
            } catch (e) {
                if (e.response && e.response.status === 400) {
                    console.log(`   ⚠️ Unit already exists: ${unitName}`);
                } else {
                    console.error(`   ❌ Error creating unit ${unitName}:`, e.message);
                }
            }
        }

        // 5. Fetch Units to get IDs
        console.log('🔄 Fetching Units to map IDs...');
        const unitsResponse = await axios.get(`${API_URL}/api/products/units`);
        const unitsMap = {}; // Name -> ID
        unitsResponse.data.forEach(u => {
            unitsMap[u.name] = u.id;
        });

        // 6. Create Products
        console.log('🍎 Seeding Products...');
        for (const prod of productsData) {
            // Find Category ID
            // En el JSON 'categoria' es el ID string (ej: "frutas"). 
            // Debemos buscar el nombre correspondiente en categorias.json para luego buscar el ID numérico.
            const catObj = categoriesData.find(c => c.id === prod.categoria);
            const categoryName = catObj ? catObj.nombre : null;
            const categoryId = categoriesMap[categoryName];

            // Find Unit ID
            const unitId = unitsMap[prod.unid];

            if (!categoryId || !unitId) {
                console.error(`   ❌ Skipping ${prod.nombre}: Missing Category ID or Unit ID`);
                continue;
            }

            const imageBase64 = await readImageAsBase64(prod.imagen);

            const productDto = {
                id: prod.id,
                nombre: prod.nombre,
                descripcion: prod.descripcion,
                precio: prod.precio,
                stock: 100, // Requested default stock
                stockMinimo: 5,
                activo: 1,
                categoriaId: categoryId,
                unidadId: unitId,
                imagen: imageBase64 // Enviaremos null si no encuentra la imagen, el backend podría quejarse si no es nullable
            };

            try {
                await axios.post(`${API_URL}/api/products`, productDto);
                console.log(`   ✅ Created product: ${prod.nombre}`);
            } catch (e) {
                if (e.response && e.response.status === 400) {
                    // Si falla, intentamos actualizar (PUT)
                    try {
                        await axios.put(`${API_URL}/api/products/${prod.id}`, productDto);
                        console.log(`   🔄 Updated product: ${prod.nombre}`);
                    } catch (putError) {
                        console.error(`   ❌ Error creating/updating product ${prod.nombre}:`, putError.message);
                        if (putError.response) console.error(putError.response.data);
                    }
                } else {
                    console.error(`   ❌ Error creating product ${prod.nombre}:`, e.message);
                    if (e.response) console.error(e.response.data);
                }
            }
        }

        console.log('✨ Seeding completed!');

    } catch (error) {
        console.error('🔥 Fatal Error:', error);
    }
};

seed();
