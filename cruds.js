let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let totle = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let inputs = document.querySelector(".inputs");
let mood = 'create'
let tmp;
let searshmood = 'title'
// get totle
function getTotle(){
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - discount.value
        totle.innerHTML= result
        totle.style.backgroundColor = '#040';
    }else{
        totle.innerHTML = '';
        totle.style.backgroundColor = '#a00c02fb';
    }
}
// creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse(localStorage.product)
}else{
    datapro = []
}
submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        totle:totle.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 200){
        if (mood == 'create'){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count; i++){
                    datapro.push(newpro);
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[tmp] = newpro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata();
    }
    localStorage.product = JSON.stringify(datapro);
    showdata();
    getTotle();
}
// clear imputs
function cleardata (){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    totle.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showdata(){
    let table = '';
    for (let x = 0; x < datapro.length ; x++){
        table += `
        <tr>
            <td>${x + 1}</td>
            <td>${datapro[x].title}</td>
            <td>${datapro[x].price}</td>
            <td>${datapro[x].taxes}</td>
            <td>${datapro[x].ads}</td>
            <td>${datapro[x].discount}</td>
            <td>${datapro[x].totle}</td>
            <td>${datapro[x].category}</td>
            <td><button onclick = "updatedata(${x})" id="update">update</button></td>
            <td><button onclick = "deletdata(${x})" id="delete">delet</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let delet_all = document.getElementById('deletall');
    // count
    if (datapro.length > 0){
        delet_all.innerHTML = `
            <button onclick= "deletall()">delet all(${datapro.length})</button>
        `
    }else{
        delet_all.innerHTML = ''
    }
}
showdata()
// delet one items
function deletdata(element){
    datapro.splice(element,1)
    localStorage.product =  JSON.stringify(datapro)
    showdata()
}
// delet all items
function deletall(){
    datapro = []
    localStorage.product = null
    showdata()
}
// update
function updatedata(x){
    title.value = datapro[x].title;
    price.value = datapro[x].price;
    taxes.value = datapro[x].taxes;
    ads.value = datapro[x].ads;
    discount.value = datapro[x].discount;
    getTotle()
    count.style.display = 'none'
    category.value = datapro[x].category;
    submit.innerHTML = 'update one'
    mood = 'update'
    tmp = x
    scroll({
        top:0,
        behavior:'smooth'
    })
    // let btnUpdAll = document.createElement('button');
    // btnUpdAll.innerText = 'update all'
    // inputs.appendChild(btnUpdAll);
}
// searsh
function getsearsh(id){
    let searsh = document.getElementById('search');
    if(id == 'btn-title'){
        searshmood = 'title'     
    }else{
        searshmood = "category"
    }
    searsh.placeholder = `searsh by ${searshmood}`;
    searsh.focus();
    searsh.value = ''
    showdata()
}
function searshdata(value){
    let table = ''
    for(let x = 0; x < datapro.length; x++){
        if(searshmood == 'title'){
            if (datapro[x].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${x + 1}</td>
                        <td>${datapro[x].title}</td>
                        <td>${datapro[x].price}</td>
                        <td>${datapro[x].taxes}</td>
                        <td>${datapro[x].ads}</td>
                        <td>${datapro[x].discount}</td>
                        <td>${datapro[x].totle}</td>
                        <td>${datapro[x].category}</td>
                        <td><button onclick = "updatedata(${x})" id="update">update</button></td>
                        <td><button onclick = "deletdata(${x})" id="delete">delet</button></td>
                    </tr>
                    `
            };
            }else{
                if (datapro[x].category.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${x + 1}</td>
                            <td>${datapro[x].title}</td>
                            <td>${datapro[x].price}</td>
                            <td>${datapro[x].taxes}</td>
                            <td>${datapro[x].ads}</td>
                            <td>${datapro[x].discount}</td>
                            <td>${datapro[x].totle}</td>
                            <td>${datapro[x].category}</td>
                            <td><button onclick = "updatedata(${x})" id="update">update</button></td>
                            <td><button onclick = "deletdata(${x})" id="delete">delet</button></td>
                        </tr>
                        `
                };
            }
    }
    document.getElementById('tbody').innerHTML = table;
}