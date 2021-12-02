const nameInput = document.querySelector("#name")
const docInput = document.querySelector("#document")
const genderInput = document.querySelector("#gender")
const btnSend = document.querySelector("#send")
const alertMsg = document.querySelector("#alert")
let arrayDocs = document.querySelectorAll(".document")
const tableUser = document.querySelector("#table-user")

document.addEventListener('DOMContentLoaded', ()=>{
    addDeleteEvent() 
})

btnSend.addEventListener('click', ()=>{
    if (!validInputsEmpty() || !validDuplicateDoc() || !validLenthDoc(docInput)) {
        return false
    }else{
        addUser(nameInput, docInput, genderInput)
        addDeleteEvent();
    }
})

function addDeleteEvent() {
    const btnDelete = document.querySelectorAll(".btn-delete")
    btnDelete.forEach(element => {
        element.addEventListener('click', deleteEvent(element))
    });
}

function deleteEvent(element) {
    element.addEventListener('click', (e)=>{
        e.target.parentNode.parentNode.remove()
    })
}

function validInputsEmpty() {
    if (nameInput.value == '' || docInput.value == '') {
        showMsg("error", "Preencha todos os campos.");
        return false
    }else{
        return true
    }
}

function showMsg(type, message) {
    if (type == 'error') {
        alertMsg.classList.add("alert-danger")
        alertMsg.textContent = message
        alertMsg.style.display = ''
        setTimeout(() => {
            alertMsg.style.display = 'none'
        }, 2300);

    } else if (type == 'success'){
        alertMsg.classList.remove("alert-danger")
        alertMsg.classList.add("alert-success")
        alertMsg.textContent = message
        alertMsg.style.display = ''
        setTimeout(() => {
            alertMsg.style.display = 'none'
        }, 2300);
    }
}

function validDuplicateDoc(){
    arrayDocs = document.querySelectorAll(".document")
    let docs = []
    let currentDoc =  docInput.value.replaceAll('.', '').replaceAll('-', '')
    arrayDocs.forEach(element => {
        docs.push(element.textContent.replaceAll('.', '').replaceAll('-', ''))
    });

    if(docs.includes(currentDoc)){
        showMsg('error', 'CPF já cadastrado.')
        return false
    }else{
        return true
    }
    
}

function validLenthDoc(doc) {
    let currentDoc =  doc.value.replaceAll('.', '').replaceAll('-', '')
    if(currentDoc.length < 11 || currentDoc.length > 11){
        showMsg('error', 'CPF Inválido!')
        return false
    }else{
        return true
    }
}

function addUser(name, doc, sex) {

    if (sex.value == '1') {
        sex = 'Masculino'
    }else{
        sex = 'Feminino'
    }

    new_doc = `${doc.value.slice(0,3)}.${doc.value.slice(3,6)}.${doc.value.slice(6,9)}-${doc.value.slice(9,11)}`

    let template = `
    <th scope="row">3</th>
    <td>${name.value}</td>
    <td class="document">${new_doc}</td>
    <td>${sex}</td>
    <td>
        <button type="button" class="btn btn-danger btn-delete">Excluir</button>
    </td>
    `
    tr = document.createElement('tr')
    tr.innerHTML = template
    tableUser.appendChild(tr)
    showMsg('success', 'Cadastrado com sucesso.')
}