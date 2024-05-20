class Store {
    listProduct;
    name;

    constructor(name) {
        this.name = name;
        let listProduct = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
        if (listProduct) {
            this.listProduct = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
        } else {
            let sp1 = new Product(1, 'Bánh táo', 80000, 50, "banhtao.jpg");
            let sp2 = new Product(2, 'Bánh donut', 30000, 110, "donut.jpg");
            let sp3 = new Product(3, 'Bánh macaron', 15000, 90, "macaron.jpg");
            let sp4 = new Product(4, 'Bánh mochi', 10000, 90, "mochi.jpg");
            let sp5 = new Product(5, 'Bánh Tiramisu', 60000, 30, "Tiramisu.jpg");
            this.listProduct.push(sp1);
            this.listProduct.push(sp2);
            this.listProduct.push(sp3);
            this.listProduct.push(sp4);
            this.listProduct.push(sp5);
        }
    }

    add(newProduct) {
        this.listProduct.push(newProduct);
    }

    remove(index) {
        this.listProduct.splice(index, 1);
    }

    save(index, newProduct) {
        this.listProduct[index] = newProduct;
    }

    searchByName(name) {
        return this.listProduct.filter(value => value.name.toUpperCase().includes(name.toUpperCase()))
    }
}
