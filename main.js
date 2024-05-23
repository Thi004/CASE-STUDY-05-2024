let myStore = new Store('Tiệm bánh nhà An');
showHome();

function showHome() {
    document.getElementById('main').innerHTML = `
<table border="1" style="width:100%; height: fit-content;border: 1px solid black; border-collapse: collapse;">
<tr style="background-color: black;color: white;font-size: large;padding-bottom: 10px; height: 50px">
<th>Mã số</th>
<th>Tên sản phẩm</th>
<th>Giá (VNĐ)</th>
<th>Số lượng (cái)</th>
<th>Hình ảnh</th>
<th colspan="2">Thao tác</th>
</tr>
<tbody id="listProduct"></tbody>
</table>
`
    let list = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
    let html = ``;
    for (let i = 0; i < list.length; i++) {
        html += ` 
    <tr style="font-size: large">
<td style="text-align: center">${list[i].id}</td>
<td style="padding: 15px;text-align: left">${list[i].name}</td>
<td style="padding: 15px;text-align: right">${convert(list[i].price)}</td>
<td style="text-align: center">${list[i].quantity}</td>
<td style="text-align: center"><img class="my-img" src="${list[i].image}" alt=""></td>
<td style="text-align: center"><button style="background: gray;color: white" onclick="showRemove(${i})">Delete</button></td>
<td style="text-align: center"><button style="color: white;background: gray" onclick="showEdit(${i})">Edit</button></td>
    </tr>
    `
    }
    document.getElementById("listProduct").innerHTML = html;

}

function showAdd() {
    document.getElementById('main').innerHTML = `<br>
    <input type="text" placeholder="STT" id="id">
    <input type="text" placeholder="Tên sản phẩm" id="name">
    <input type="text" placeholder="Giá" id="price">
    <input type="text" placeholder="Số lượng" id="quantity">
    <input type="text" placeholder="Hình sản phẩm" id="image">
    <button onclick="add()">Thêm vào</button> `
}

function add() {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let image = document.getElementById('image').value;
    let newProduct = new Product(id, name, price, quantity, image);
    myStore.add(newProduct);
    saveLocalStorage();
    showHome();
}

function showRemove(index) {
    let isConfirm = confirm('Bạn chắc chắn xóa chứ?');
    if (isConfirm) {
        myStore.remove(index);
        saveLocalStorage();
        showHome();
    }
}

function showEdit(index) {
    let list = localStorage.getItem('data') == null ? [] : JSON.parse(localStorage.getItem('data'));
    let oldProduct = list[index];
    document.getElementById('main').innerHTML = `
    <input value="${oldProduct.id}" type="text" placeholder="STT" id="id">
    <input value="${oldProduct.name}" type="text" placeholder="Tên sản phẩm" id="name">
    <input value="${oldProduct.price}" type="text" placeholder="Giá" id="price">
    <input value="${oldProduct.quantity}" type="text" placeholder="Số lượng" id="quantity">
    <input value="${oldProduct.image}" type="text" placeholder="Hình sản phẩm" id="image">
    <button onclick="save(${index})">Lưu thay đổi</button> `;

}

function save(index) {
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let image = document.getElementById('image').value;
    let newProduct = new Product(id, name, price, quantity, image);
    myStore.save(index, newProduct);
    saveLocalStorage()
    showHome();
}

function showSearch() {
    document.getElementById('main').innerHTML = ` <br>
    <input style="
  background-position: 10px 12px;
  font-size: 16px;
  padding: 12px 20px 12px 40px;
  border: 1px solid #ddd;
  margin-bottom: 12px " type="text" placeholder="Search for names.." id="nameSearch" onchange="search()">   
     `;
}

function search() {
    let nameSearch = document.getElementById("nameSearch").value; // lấy dữ liêu từ ô input
    let listSearch = myStore.searchByName(nameSearch);
    if (listSearch.length > 0) {
        let str = ``
        document.getElementById('main').innerHTML = `
        <h3 style="color: green">Kết Quả Tìm Kiếm</h3><br>
   <table border="1" style="width:100%; height: fit-content;border: 1px solid black; border-collapse: collapse">
<tr style="background-color: black;color: white;font-size: large;padding-bottom: 20px; height: 50px">
<th>Mã số</th>
<th>Tên sản phẩm</th>
<th>Giá (VNĐ)</th>
<th>Số lượng (cái)</th>
<th>Hình ảnh</th>
<th colspan="2">Thao tác</th>
</tr>
<tbody id="listSearch"></tbody>
</table>
    `
        for (let i = 0; i < listSearch.length; i++) {
            str += `
            <tr style="font-size: large">
<td style="text-align: center">${listSearch[i].id}</td>
<td style="padding: 15px;text-align: left">${listSearch[i].name}</td>
<td style="padding: 15px;text-align: right">${listSearch[i].price}</td>
<td style="text-align: center">${listSearch[i].quantity}</td>
<td style="text-align: center"><img class="my-img" src="${listSearch[i].image}" alt=""></td>
<td style="text-align: center"><button style="background: gray;color: white" onclick="showRemove(${i})">Delete</button></td>
<td style="text-align: center"><button style="color: white;background: gray" onclick="showEdit(${i})">Edit</button></td>
           </tr>`
        }
        document.getElementById("listSearch").innerHTML = str;
    } else {
        alert("Không tìm thấy " + nameSearch);
    }

}

//Local Storage
function saveLocalStorage() {
    list = myStore.listProduct;
    localStorage.setItem('data', JSON.stringify(list));
}

function restoreLocalStorage() {
    if (localStorage.getItem('data')) {
        list = JSON.parse(localStorage.getItem('data'));
        showHome();
    }
}

window.onload = function () {
    restoreLocalStorage()
}
showHome();

// định dạng phần nghìn
// function convert(x) {
//    x = new Intl.NumberFormat("de-DE").format(x);
//    return x;
// }
// gọi hàm tại cột trong listProduct
//<td style="padding: 15px;text-align: right">${convert(list[i].price)}</td>
function convert (price) {
    price = new Intl.NumberFormat("de-DE").format(price);
        return price;
}




