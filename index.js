class Cart {
    constructor() {
        this.productList = new Map();
    }

    addProduct(id, quantity) {
        if (this.productList.has(id))
            this.productList.set(id, this.productList.get(id) + quantity);
        else
            this.productList.set(id, quantity);
    }

    deleteProduct(id) {
        this.productList.delete(id);
    }

    setAddress(address) {
        this.address = address;
    }

    setLivrare(livrare) {
        this.livrare = livrare;
    }

    setFacturare(facturare) {
        this.facturare = facturare;
    }

    setPlata(plata) {
        this.plata = plata;
    }

    getAddress() {
        return this.address;
    }

    getLivrare() {
        return this.livrare;
    }

    getFacturare() {
        return this.facturare;
    }

    getPlata() {
        return this.plata;
    }

    getProductList() {
        return this.productList;
    }
}

class Product {
    constructor(name, id, price) {
        this.name = name;
        this.id = id;
        this.price = price;
    }
}


class ProductCatalog {
    constructor() {
        this.productCatalog = new Map();
    }

    addProduct(product) {
        if(this.productCatalog.has(product))
            this.productCatalog.set(product);
    }
}

class Address {
    constructor() { }
}

class Livrare {
    constructor() { }
}

class Facturare {
    constructor() { }
}

class Plata {
    constructor() { }
}

function addProduct(id) {
    cos.addProduct(id, parseInt(document.getElementById(id + 'Cantitate').value));
    console.log(cos);
    console.log(catalog);
}





cos = new Cart();
adresaLivrare = new Address();
adresaFacturare = new Address();
livrare1 = new Livrare();
factura1 = new Facturare();
plata1 = new Plata();
catalog = new ProductCatalog();

product1 = new Product('Parasolar Auto', 'parasolar', 50);
catalog.addProduct(product1);

adresaLivrare.judet = 'Dolj';
adresaLivrare.oras = 'Craiova';
adresaLivrare.strada = 'Sfintii Apostoli';

livrare1.adresa = adresaLivrare;
livrare1.detalii = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

adresaFacturare.judet = 'Bucuresti';

factura1.cui = '6859662';
factura1.adresa = adresaFacturare;

plata1.tip = 'card';
plata1.numarCard = '4469 5350 2910 6378';
plata1.lunaExpirare = '08';
plata1.anExpirare = '25';
plata1.numeDetinator = 'Mihai Alexandru'
plata1.cvv = '327';

cos.setLivrare(livrare1);
cos.setFacturare(factura1);
cos.setPlata(plata1);

cos.addProduct('mere', 2);
cos.addProduct('capsuni', 2);
cos.addProduct('mere', 1);
cos.addProduct('nuci', 10);
cos.deleteProduct('nuci');

//console.log(cos);
//console.log(catalog);
