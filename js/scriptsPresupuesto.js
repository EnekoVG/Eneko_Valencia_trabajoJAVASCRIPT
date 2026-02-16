 const myForm = document.getElementById('myForm');

// FORMULARIO CONTACTO
const nameIn = document.getElementById('firstName');
const surnameIn = document.getElementById('surname');
const telephoneIn = document.getElementById('telephone');
const emailIn = document.getElementById('email');

function validateName() {
    const namePattern = /^[a-zA-Z][a-z A-Z]*$/;
    if (nameIn.value.length >= 3 && nameIn.value.length <= 15 && namePattern.test(nameIn.value)) {
        nameIn.classList.add('valido');
        nameIn.classList.remove('invalido');
        document.getElementById('errorName').textContent = "";
    } else {
        nameIn.classList.add('invalido');
        nameIn.classList.remove('valido');
        document.getElementById('errorName').textContent = "El nombre debe contener un mínimo de 3 caractéres y debe empezar por una letra";
    }
}

function validateSurname() {
    const surnamePattern = /^[a-zA-Z][a-z A-Z]*$/;
    if (surnameIn.value.length >= 4 && surnameIn.value.length <= 40 && surnamePattern.test(surnameIn.value)) {
        surnameIn.classList.add('valido');
        surnameIn.classList.remove('invalido');
        document.getElementById('errorSurname').textContent = "";
    } else {
        surnameIn.classList.add('invalido');
        surnameIn.classList.remove('valido');
        document.getElementById('errorSurname').textContent = "Los apellidos deben contener un mínimo de 4 caractéres y deben empezar por una letra";
    }
}

function validateTelephone() {
    const telephonePattern = /^\d{9}$/;
    if (telephonePattern.test(telephoneIn.value)) {
        telephoneIn.classList.add('valido');
        telephoneIn.classList.remove('invalido');
        document.getElementById('errorTelephone').textContent = "";
    } else {
        telephoneIn.classList.add('invalido');
        telephoneIn.classList.remove('valido');
        document.getElementById('errorTelephone').textContent = "Escriba los 9 números de su teléfono movil";
    }
}

function validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailIn.value)) {
        emailIn.classList.add('valido');
        emailIn.classList.remove('invalido');
        document.getElementById('errorEmail').textContent = "";
    } else {
        emailIn.classList.add('invalido');
        emailIn.classList.remove('valido');
        document.getElementById('errorEmail').textContent = "Escriba un correo electrónico válido";
    }
}

nameIn.addEventListener('input', validateName);
surnameIn.addEventListener('input', validateSurname);
telephoneIn.addEventListener('input', validateTelephone);
emailIn.addEventListener('input', validateEmail);

// FORMULARIO PRESUPUESTO
const products = document.getElementById('products');
const deliveryTime = document.getElementById('time');


function calculateBudget(){
    const selectedProduct = products.options[products.selectedIndex];
    const selectedValue = selectedProduct.value;
    let budget = 0;
    let discount = 0;
    // El presupuesto es el valor del producto seleccionado
    if(selectedValue){
        budget = selectedValue;
    } 
    // Se le aplica el descuento segun los meses que elija
    if(deliveryTime.value <= 3){
        discount = 0;
        budget = budget - discount;
    }else if(deliveryTime.value <= 6){
        discount = budget * 0.1;
        budget = budget - discount;
    }else if(deliveryTime.value <= 9){
        discount = budget * 0.15;
        budget = budget - discount;
    }else if(deliveryTime.value <= 12){
        discount = budget * 0.2;
        budget = budget - discount;
    }else{
        alert("Selecciona un mes entre 1 y 12");
    }
    
    // Se le suman los extras que inserte
    const extras = document.querySelectorAll(".checkBoxExtra:checked");
    extras.forEach((chekbox) =>{
        const extraPrice = chekbox.value;
        budget += parseInt(extraPrice);
    })
    document.getElementById('budget').textContent = budget + "€";    
}
products.addEventListener('change', calculateBudget);
deliveryTime.addEventListener('input', calculateBudget);

const extras = document.querySelectorAll(".checkBoxExtra");
extras.forEach((chekbox => {
    chekbox.addEventListener('change', calculateBudget);
}))

// TERMINOS - CONDICIONES
const checkIn = document.getElementById('checkTerms');

function validateCheckBox() {
    if(!checkIn.checked){
        alert("Debes aceptar los terminos y condiciones");
        checkIn.classList.add("invalido");
        checkIn.classList.remove("valido");
    } else {
        checkIn.classList.add("valido");
        checkIn.classList.remove("invalido"); 
    }
}

myForm.addEventListener("submit", function(event){
    event.preventDefault();
    validateName();
    validateSurname();
    validateTelephone();
    validateEmail();
    validateCheckBox();

    if(nameIn.classList.contains("valido") && 
    surnameIn.classList.contains("valido") && 
    telephoneIn.classList.contains("valido") && 
    emailIn.classList.contains("valido") && 
    checkIn.classList.contains("valido") &&
    budget!==0
    ){
        alert("Formulario enviado correctamente")
        event.myForm.submit();
    } else {
        alert("Por favor, corrija los error en el formulario")
    }
})

myForm.addEventListener("reset", function(event){
    nameIn.classList.remove('invalido');
    nameIn.classList.remove('valido');
    document.getElementById('errorName').textContent = "";

    surnameIn.classList.remove('invalido');
    surnameIn.classList.remove('valido');
    document.getElementById('errorSurname').textContent = "";

    telephoneIn.classList.remove('invalido');
    telephoneIn.classList.remove('valido');
    document.getElementById('errorTelephone').textContent = "";

    emailIn.classList.remove('invalido');
    emailIn.classList.remove('valido');
    document.getElementById('errorEmail').textContent = "";

    document.getElementById('budget').textContent = "";

    checkIn.classList.remove('invalido');
    checkIn.classList.remove('valido');
    event.myForm.reset();
})