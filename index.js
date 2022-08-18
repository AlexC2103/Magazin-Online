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
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class ProductCatalog {
    constructor() {
        this.productCatalog = new Map();
    }

    addProduct(id, product) {
        if (this.productCatalog.has(id) == false) {
            this.productCatalog.set(id, product);
        }
    }
}

if (localStorage.getItem('catalog') == null) {
    catalog = new ProductCatalog();

    Parasolar = new Product('Parasolar auto 197 x 99 cm', 35);
    catalog.addProduct('parasolar', Parasolar);

    Covorase = new Product('Set Covorașe Auto Universale', 85);
    catalog.addProduct('covorase', Covorase);

    Modulator = new Product('Modulator FM Bluetooth', 120);
    catalog.addProduct('modulator', Modulator);

    CameraBord = new Product('Camera de bord auto DVR Full HD', 250);
    catalog.addProduct('cameraBord', CameraBord);

    OdorizantAuto = new Product('Odorizant Auto Baseus', 70);
    catalog.addProduct('odorizantAuto', OdorizantAuto);

    localStorage.setItem('catalog', JSON.stringify(catalog, replacer));
} else {
    catalog = new ProductCatalog();
    catalog = JSON.parse(localStorage.getItem('catalog'), reviver);
   //console.log(catalog);
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

        let p = document.createElement('p');
        p.classList.add("mx-3");
        p.classList.add("my-auto");
        p.innerHTML = cantitate;

        td1.innerHTML = catalog.productCatalog.get(id).name;
        tr.appendChild(td1);

        td2.appendChild(minus);
        td2.appendChild(p);
        td2.appendChild(plus);
        td2.classList.add("d-flex");

        tr.appendChild(td2);

        td3.innerHTML = catalog.productCatalog.get(id).price * cantitate + ' Lei';
        totalPrice += catalog.productCatalog.get(id).price * cantitate
        tr.appendChild(td3);

        document.getElementById('pretProduse').innerHTML = totalPrice + ' Lei';
        document.getElementById('totalComanda').innerHTML = totalPrice   + 25 + ' Lei';
        document.getElementById('cartList').appendChild(tr);

    });
}

