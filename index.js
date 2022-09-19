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

            facturare.identityNumber = content.facturare.identityNumber;
            facturare.numeCumparator = content.facturare.numeCumparator;
            facturare.email = content.facturare.email;
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
            plata.cvv = content.plata.cvv;
            plata.numeDetinator = content.plata.numeDetinator;

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
        this.codPostal = adresa.codPostal;
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

function loadSumar() {
    let i = 0;
    let pretTotal = 0;
    cos.productList.forEach((cantitate, id) => {
        i++;
        let tr = document.createElement('tr');
        let tdNumarProdus = document.createElement('td');
        let tdNumeProdus = document.createElement('td');

        let tdCantitate = document.createElement('td');
        tdCantitate.classList.add("text-center");

        let tdPretUnitar = document.createElement('td');
        tdPretUnitar.classList.add("text-center");

        let tdPretTotal = document.createElement('td');
        tdPretTotal.classList.add("text-center", "fw-bold");

        tdNumarProdus.innerHTML = i + ". ";
        tr.appendChild(tdNumarProdus);

        tdNumeProdus.innerHTML = catalog.productCatalog.get(id).name;
        tr.appendChild(tdNumeProdus);

        tdCantitate.innerHTML = cantitate;
        tr.appendChild(tdCantitate);

        tdPretUnitar.innerHTML = catalog.productCatalog.get(id).price + ".00 Lei";
        tr.appendChild(tdPretUnitar);

        pretTotal += catalog.productCatalog.get(id).price * cantitate;
        tdPretTotal.innerHTML = catalog.productCatalog.get(id).price * cantitate + ".00 Lei";
        tr.appendChild(tdPretTotal);

        document.getElementById('sumarComanda').appendChild(tr);

    });
    let tr = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);

    tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3);


    let numeContact = document.createElement('p');
    numeContact.classList.add('text-black', 'dateLivrare');
    numeContact.innerHTML = cos.facturare.numeCumparator;
    document.getElementById('numeContact').appendChild(numeContact);

    let adresaLivrare = document.createElement('p');
    adresaLivrare.classList.add('text-black', 'dateLivrare');
    adresaLivrare.innerHTML = cos.livrare.adresa.strada + ",  " +
                              cos.livrare.adresa.oras + ", jud.  " +
                              cos.livrare.adresa.judet;
    document.getElementById('adresaLivrare').appendChild(adresaLivrare);

    let adresaEmail = document.createElement('p');
    adresaEmail.classList.add('text-black', 'dateLivrare');
    adresaEmail.innerHTML = cos.facturare.email;
    document.getElementById('adresaEmail').appendChild(adresaEmail);
}

function storeDelivery() {
    adresaLivrare = new Address();
    livrare = new Livrare();

    adresaLivrare.strada = document.getElementById('addressInput').value;
    adresaLivrare.oras = document.getElementById('cityInput').value;
    adresaLivrare.judet = document.getElementById('countyInput').value;
    adresaLivrare.codPostal = document.getElementById('zipCodeInput').value;

    livrare.detalii = document.getElementById('detailsInput').value;
    livrare.adresa = adresaLivrare;

    cosContent = JSON.parse(localStorage.getItem('cart'), reviver);
    cos.unserialize(cosContent);
    cos.setLivrare(livrare);

    localStorage.setItem('cart', JSON.stringify(cos, replacer));

}

function storeBilling() {
    facturare = new Facturare();
    adresaFacturare = new Address();

    adresaFacturare.strada = document.getElementById('billingAddressInput').value;

    facturare.adresa = adresaFacturare;
    facturare.identityNumber = document.getElementById('identityNumberInput').value;
    facturare.email = document.getElementById('emailInput').value;
    facturare.numeCumparator = document.getElementById('nameInput').value;

    cosContent = JSON.parse(localStorage.getItem('cart'), reviver);

    cos.unserialize(cosContent);
    cos.setFacturare(facturare);
    console.log(facturare);
    localStorage.setItem('cart', JSON.stringify(cos, replacer));
}

function storePayment() {
    plata = new Plata();

    plata.numarCard = document.getElementById('cardNumberInput').value;
    plata.lunaExpirare = document.getElementById('expMonthInput').value;
    plata.anExpirare = document.getElementById('expYearInput').value;
    plata.cvv = document.getElementById('cvvInput').value;
    plata.numeDetinator = document.getElementById('holderNameInput').value;

    cosContent = JSON.parse(localStorage.getItem('cart'), reviver);

    cos.unserialize(cosContent);
    cos.setPlata(plata);

    localStorage.setItem('cart', JSON.stringify(cos, replacer));
}