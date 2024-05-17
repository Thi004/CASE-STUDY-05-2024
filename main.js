let myStore = new Store('Tiệm bánh nhà An');
showHome();

function showHome() {
    document.getElementById('main').innerHTML = `
<table border="1" style="width:100%; height: fit-content;border: 1px solid black; border-collapse: collapse;">
<tr style="background-color: black;color: white;font-size: large;padding-bottom: 20px; height: 50px">
<th>STT</th>
<th>Tên sản phẩm</th>
<th>Giá (VNĐ)</th>
<th>Số lượng (cái)</th>
<th>Hình ảnh</th>
<th colspan="2">Thao tác</th>
</tr>
<tbody id="listProduct"></tbody>
</table>
`
    let list = myStore.listProduct;
    let html = ``;
    for (let i = 0; i < list.length; i++) {
        html += ` 
    <tr style="font-size: large">
<td style="text-align: center">${list[i].id}</td>
<td style="padding: 15px;text-align: left">${list[i].name}</td>
<td style="padding: 15px;text-align: right">${list[i].price}</td>
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
    document.getElementById('main').innerHTML = `
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
    showHome();
}

function showRemove(index) {
    let isConfirm = confirm('Bạn chắc chắn xóa chứ?');
    if (isConfirm) {
        myStore.remove(index);
        showHome();
    }
}
function showEdit(index){
    let list = myStore.listProduct;
    let oldProduct = list[index];
    document.getElementById('main').innerHTML = `
    <input value="${oldProduct.id}" type="text" placeholder="STT" id="id">
    <input value="${oldProduct.name}" type="text" placeholder="Tên sản phẩm" id="name">
    <input value="${oldProduct.price}" type="text" placeholder="Giá" id="price">
    <input value="${oldProduct.quantity}" type="text" placeholder="Số lượng" id="quantity">
    <input value="${oldProduct.image}" type="text" placeholder="Hình sản phẩm" id="image">
    <button onclick="save(${index})">Lưu thay đổi</button> ` ;
}
function save(index){
    let id = document.getElementById('id').value;
    let name = document.getElementById('name').value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;
    let image = document.getElementById('image').value;
    let newProduct = new Product(id, name, price, quantity, image);
    myStore.save(index,newProduct);
    showHome();
}
function showFind(){
    document.getElementById('main').innerHTML = ` <br>
    <input type="search" placeholder="Nhập tên sản phẩm" id="name">   
    <button onclick="find()">Tìm</button> ` ;
}
function find(){
    let name = document.getElementById('name').value;
    listProduct.includes("name")
}