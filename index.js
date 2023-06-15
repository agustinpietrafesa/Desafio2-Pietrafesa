import ProductManager from "./manager/productManager.js";

const manager = new ProductManager ("./files/Usuarios.json");

const send = async() =>{

    const product = {
        title: "Iphone 14 Pro",
        description: "256GB",
        price: 1900,
        thumbnail: 'Sin imagen',
        code: "AIPH14PRO",
        stock: 10,
    };

    const prod = await manager.addProduct(product);

    await manager.addProduct(product);
    console.log("Producto agregado correctamente", JSON.stringify(await manager.getProducts()));

    await manager.updateProduct({...prod, price: 1850});
    console.log("El precio fue modificado correctamente", JSON.stringify(await manager.getProducts()));

    await manager.deleteProduct(prod.id); 
    console.log("Producto eliminado correctamente", JSON.stringify(await manager.getProducts()));

    const productResult = await manager.getProducts();
    console.log(productResult);

};

send();

    

    