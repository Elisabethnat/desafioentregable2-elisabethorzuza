import fs from 'fs'; 

class ProductManager{
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    addProduct(product){
        this.readFile();
        const{ title, description, price, thumbnail, code, stock } = product; 

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log( 
                'El producto debe incluir los campos title, description, price, thumbnail, code, stock'
            );
            return;
        }

        this.products.find(element => element.code == product.code)
        ? console.log('El código del producto ya existe')
        : this.products.push(product);

        let writeProducts =JSON.stringify(this.products);
        fs.writeFileSync(this.path, writeProducts);
    }

    getProducts(){
        this.readFiles();
        return this.products;
    }

    getProductsById(id) {
        this.readFile();
        return this.products.find(product => product.id ==id) ?? 
        console.log('Not Found');

        }

        updateProducts(id, update){
            this.readFile();
            let product = this.products.find(prod => prod.id ==id);
            let keys = object.keys(update);
            keys.map(key => key !== 'id' && (product[key] = update[key]));
            let writeProducts = JSON.stringify(this.products);
            fs.writeFileSync(this.path, writeProducts);

        }

        deleteProduct(id){
            this.readFile();
            this.products = this.products.filter(prod => prod.id !== id);
            let writeProducts = JSON.stringify(this.products);
            fs.writeFileSync(this.path, writeProducts);
        }

        readFile(){
            let resultado = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(resultado);
        }
}

class Product{
    constructor({ title, description, price, thumbnail, code, stock }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail; 
        this.code = code;
        this.stock = stock;
        this.id = Product.incrementarID();
    }

    static incrementarID(){
        this.increment ? this.idIncrement++ : (this.idIncrement = 1);
        return this.idIncrement;
    }
}

const manager = new ProductManager('products.txt');

manager.addProduct(
    new Product({
        title: 'Pantalón',
        description: 'Un producto',
        price: 800,
        thumbnail: 'http://',
        code: 154,
        stock: 43, 
    })
);

manager.addProduct(
    new Product({
        title:'Pantalón',
        description: 'Un producto',
        price: 800,
        thumbnail: 'http//',
        code:124,
        stock: 43,

    })
);

manager.addProduct(
    new Product({
        title: 'Pantalón',
        description: 'Un producto',
        price: 800, 
        thumbnail: 'http://',
        code: 453,
        stock: 43, 

    })
);

manager.addProduct(
    new Product({
        title: 'Pantalón',
        description: 'Un producto',
        price: 800, 
        thumbnail: 'http://',
        code: 124,
        stock: 43, 
    })
);

let products = manager.getProducts();
console.log('Todos los productos: ', products);
console.log('Producto id 2: ', manager.getProductsById(2));

manager.deleteProduct(3);
manager.updateProducts(2, {title: 'Remera', stock: 12, id: 3});

products = manager.getProducts();
console.log('Todos los productos: ', products);