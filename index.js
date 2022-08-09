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
}

class Product {
    constructor(name, id, price) {
        this.name = name;
        this.id = id;
        this.price = price;
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

cos = new Cart();
adresa = new Address();
livrare = new Livrare();
factura1 = new Facturare();
factura2 = new Facturare();
plata1 = new Plata();

cos.setAddress(adresa);

cos.addProduct(5, 2);
cos.addProduct(5, 3);
cos.addProduct(2, 1);
cos.deleteProduct(5);

adresa.judet = 'Dolj';
adresa.oras = 'Craiova';
adresa.strada = 'Sfintii Apostoli';

livrare.destinatie = adresa;

factura1.CNP = '12345678';
factura1.adresaFacturare = adresa;

factura2.CUI = '6859662';
factura2.adresaFacturare = adresa;

plata1.tip = 'Card';
plata1.numarCard = '4469 5350 2910 6378';
plata1.lunaExpirare = '08';
plata1.anExpirare = '25';
plata1.numeDetinator = 'Mihai Alexandru'
plata1.cvv = '327';

console.log(cos);

/*console.log(livrare);
console.log(adresa);
console.log(factura1);
console.log(factura2);
console.log(plata1); */
