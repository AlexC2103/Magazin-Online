class Cart {
    constructor() {
        this.productList = new Map();
    }

    addProduct(id, quantity) {
       // this.productList.push()
        if (this.productList.has(id))
            this.productList.set(id, this.productList.get(id) + quantity);
        else
            this.productList.set(id, quantity);
    }

    deleteProduct(id) {
        this.productList.delete(id);
    }
}

class Product {
    constructor(name, id, price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
}

class Address {
    constructor (adresa) {
        this.adresa = adresa;
    }
}

class Livrare {
    constructor (adresa) {
        this.livrare = adresa;
    }
}

class Facturare {
    constructor ()
}

cos = new Cart();
cos.addProduct(5, 2);
cos.addProduct(5, 3);
cos.addProduct(2, 1);
cos.deleteProduct(5);
console.log(cos);
