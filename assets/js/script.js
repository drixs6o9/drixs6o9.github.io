const contactLink = document.getElementById('contact-me');
const cardContainer = document.getElementById('card-container');
const closeContactLink = document.getElementById('close-contact-me');

// Turn contact card ON.
contactLink.onclick = function () {
    cardContainer.classList.add('hover');
};

// Turn contact card OFF.
closeContactLink.onclick = function () {
    cardContainer.classList.remove('hover');
};

// Toggle focus on material inputs.
const materialInput = document.getElementsByClassName('mdl-textfield__input');
const toggleMaterialInputFocusIn = function () {
    this.parentElement.classList.add('is-focused');
};
const toggleMaterialInputFocusOut = function () {
    if (this.value.length > 0) {
        this.parentElement.classList.add('is-dirty');
    } else {
        this.parentElement.classList.remove('is-dirty');
    }
    this.parentElement.classList.remove('is-focused');
};
for (let i = 0; i < materialInput.length; i++) {
    materialInput[i].addEventListener('focusin', toggleMaterialInputFocusIn, false);
    materialInput[i].addEventListener('focusout', toggleMaterialInputFocusOut, false);
    materialInput[i].addEventListener('input', toggleMaterialInputFocusOut, false);
}

// Send emails with form.
const xmlHttp = new XMLHttpRequest();
xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === XMLHttpRequest.DONE) {
        if (xmlHttp.status === 201) {
            alert('Votre e-mail a bien été envoyé. Je vous répondrai dans les plus brefs délais.');
            form.reset();
            for (let item of materialInput) {
                item.dispatchEvent(new Event('focusout'));
            }
            cardContainer.classList.remove('hover');
        } else {
            alert('Une erreur est survenue, merci de ré-essayer plus tard.');
        }
    }
}
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submitButton');
form.onsubmit = function (e) {
    e.preventDefault();
    submitButton.setAttribute('disabled', 'disabled');
    grecaptcha.ready(function() {
        grecaptcha.execute('6LfKAsQZAAAAAEUP5rWdL-QTIORoIhg7YgOw1leV', {action: 'submit'}).then(function(token) {
            let formData = new FormData(form);
            formData.append('g-recaptcha-response', token);
            xmlHttp.open("POST", form.getAttribute('action'), true);
            xmlHttp.send(formData);
            //console.log(formData.getAll());
        });
    });
    submitButton.removeAttribute('disabled');
};
