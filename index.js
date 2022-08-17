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
    getNumberOfItems() {
        return this.productList.size;
    }

    unserialize(content) {
        if (content.hasOwnProperty("livrare")) {
            const livrare = new Livrare();
            const adresa = new Address();

            livrare.detalii = content.livrare.detalii;
            livrare.adresa = adresa;

            adresa.unserialize(content.livrare.adresa);

            this.setLivrare(livrare);
        }

        if(content.hasOwnProperty("facturare")) {
            const facturare = new Facturare();
            const adresa = new Address();

            facturare.cui = content.facturare.cui;
            facturare.adresa = adresa;

            adresa.unserialize(content.facturare.adresa);

            this.setFacturare(facturare);
        }

        if(content.hasOwnProperty("plata")) {
            const plata = new Plata();

            plata.tip = content.plata.tip;
            plata.numarCard = content.plata.numarCard;
            plata.lunaExpirare = content.plata.lunaExpirare;
            plata.anExpirare = content.plata.anExpirare;
            plata.numeDetinator = content.plata.numeDetinator;
            plata.cvv = content.plata.cvv;

            this.setPlata(plata);
        }
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
        if (this.productCatalog.has(product) == false) {
            this.productCatalog
        }
    }
}

class Address {
    constructor() { }

    unserialize(adresa) {
        this.judet = adresa.judet;
        this.oras = adresa.oras;
        this.strada = adresa.strada;
    }
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
//localStorage.clear();
if (localStorage.getItem('cart') == null) {
    cos = new Cart();

    adresaLivrare = new Address();
    adresaFacturare = new Address();
    livrare1 = new Livrare();
    factura1 = new Facturare();
    plata1 = new Plata();
    catalog = new ProductCatalog();

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

    console.log(cos);
    localStorage.setItem('cart', JSON.stringify(cos, replacer));
    console.log(JSON.stringify(cos));
} else {

    cosContent = JSON.parse(localStorage.getItem('cart'), reviver);

    cos = new Cart();
    cos.unserialize(cosContent);
    cos.productList = cosContent.productList;
    console.log(cos);

    document.getElementsByClassName('numberOfItems')[0].innerHTML = cos.getNumberOfItems();
}

function showNumberOfItems() {

}

function addProduct(id) {


    cos.addProduct(id, parseInt(document.getElementById(id + 'Cantitate').value));
    document.getElementsByClassName('numberOfItems')[0].innerHTML = cos.getNumberOfItems();

    localStorage.setItem('cart', JSON.stringify(cos, replacer));

}

function replacer(key, value) {
    if(value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function reviver(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

function loadCart() {

    let totalPrice = 0;
    cos.productList.forEach((cantitate, id) => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');

        let minus = document.createElement('button');
        minus.classList.add("btn");
        minus.classList.add("btn-secondary");
        minus.classList.add("plusMinus");
        minus.innerHTML = '-';

        let plus = document.createElement('button');
        plus.classList.add("btn");
        plus.classList.add("btn-secondary");
        plus.classList.add("plusMinus")
        plus.innerHTML = '+';

        let p = document.createElement('button');
        p.innerHTML = cantitate;
        p.classList.add("bg-white");
        p.classList.add("prodQuant");
        p.classList.add("mx-1");

        td1.innerHTML = id;
        tr.appendChild(td1);

        td2.appendChild(minus);
        td2.appendChild(p);
        td2.appendChild(plus);
        tr.appendChild(td2);

        td3.innerHTML = 'PRET';
        tr.appendChild(td3);

        document.getElementById('cartList').appendChild(tr);

    });
}
