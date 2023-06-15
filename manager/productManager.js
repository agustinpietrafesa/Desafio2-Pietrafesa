/*******Importando FileSystem ******/

import fs from 'fs';


/******Creando la clase ProductManager ********/

export default class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path;
    }

/********Creacion del archivo en formato JSON *********/

    async writeInProductFiles(products) {

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"), "utf-8");

    };

/*******Metodo addProduct para agregar archivos a 'products' ********/

    async addProduct(product) {

        const products = await this.getProducts();

        /****Haciendo que las claves de los productos sean requeridas *******/
        const productRequired = [product.title, product.description, product.price, product.thumbnail, product.code, product.stock];
        const allRequired = productRequired.every(items => items);

        if (!allRequired) {
            console.log("Todos los campos son obligatorios, por favor completar correctamente");
            return;
        }

        /****Chequeando si el producto ya existe en la lista **********/
        const productExist = await this.products.some(p => p.code === product.code);

        if (productExist) {
            console.log(`El código: ${product.code} del producto agregado ya existe`);
            return;
        }


        /*****Dando el ID de los productos *********/


        (products === 0)
        ?
        product.id = 1
        :
        product.id = products.length + 1;
        
        const newProduct = {...product, id: product.id};

        this.products.push(newProduct);

        try {
            await this.writeInProductFiles(this.products);
          } 
        catch(error) {
            console.error(error);
          }
      
          return newProduct;
    };

/*********Metodo getProducts para traer los productos del archivo ********/

    async getProducts() {
        let productsFromFile = [];

        try {
            const readProducts = await fs.promises.readFile(this.path, "utf-8");
               
            productsFromFile = JSON.parse(readProducts);
        }
        catch(error) {
            console.error(error);
            return [];
        }

        return productsFromFile;
    };

/****getProductById busca un producto por su id ********/

    getProductById = (idProduct) => {
        const productIndex = this.products.findIndex(product => product.id === idProduct);

        if (productIndex === -1) {
            console.log("Not found");
            return;
        }

        const productAdd = () => this.products.includes(idProduct);

        if(productAdd) {
            console.log(`Producto agregado correctamente con el ID: ${idProduct}`);
            return;
        }
    };

/*******Metodo para modificar un producto ********/

    async updateProduct(updateProduct) {
        const productUpdate = await this.getProducts();
        const productIndex = productUpdate.findIndex(product => product.id === updateProduct.id);

        if (productIndex === -1) {
            console.log(`El producto con código: ${updateProduct.id} que desea actualizar no se ha encontrado`);
            return;
        }

        productUpdate[productIndex] = updateProduct;

        try {
            await this.writeInProductFiles(productUpdate);
        }
        catch(error) {
            console.error(error);
        }

        return updateProduct;
    };
    
/******Metodo para eliminar un producto segun su ID */

    async deleteProduct(id) {
        const productDelete = await this.getProducts();
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.log(`El producto con código: ${id} que desea eliminar no se ha encontrado`);
            return;
        }

        productDelete.splice(productIndex, 1);

        await this.writeInProductFiles(productDelete);

        return this.products;
    };

};


