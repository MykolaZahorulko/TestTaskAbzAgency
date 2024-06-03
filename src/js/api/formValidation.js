import {fetchData, postData} from "./request.js";

export function formValidation(formElement, emailSpanElement) {
    const postBody = document.querySelector('.post__body')
    formElement.addEventListener('submit', formSend)

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(formElement);

        if (error === 0) {
            try {
                let formData = new FormData(formElement);

                formElement.classList.add('_sending');
                const tokenData = await fetchData('https://frontend-test-assignment-api.abz.agency/api/v1/token');
                const token = tokenData.token;
                const response = await postData('https://frontend-test-assignment-api.abz.agency/api/v1/users', formData, token);

                if (response) {
                    formElement.reset();
                    emailSpanElement.classList.remove('error');
                    formElement.classList.remove('_sending');
                    postBody.classList.add('_sended');
                } else {
                    alert('Something went wrong, try again');
                    formElement.classList.remove('_sending');
                }
            } catch (err) {
                alert('Something went wrong, try again');
                formElement.classList.remove('_sending');
            }
        }
    }

    function formValidate(formElement) {
        let error = 0
        let formRequiredFields = formElement.querySelectorAll('._req')

        formRequiredFields.forEach(input => {
            removeError(input)

            if(input.classList.contains('_email')) {
                if (!emailTest(input)) {
                    addError(input)
                    error++
                }
            } else if (input.classList.contains('_phone')) {
                if (!phoneTest(input)) {
                    addError(input)
                    error++
                }
            } else if (input.classList.contains('_photo')) {
                if (!uploadFile(input.files[0])) {
                    addError(input)
                    error++
                }
            }
            else {
                if (input.value.length < 2 || input.value.length > 60) {
                    addError(input)
                    error++
                }
            }
        })

        return error
    }

    function addError(input) {
        input.classList.add('error')
        input.parentElement.classList.add('error')
    }

    function removeError(input) {
        input.classList.remove('error')
        input.parentElement.classList.remove('error')
    }

    function emailTest(input) {
        return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(input.value)
    }

    function phoneTest(input) {
        return /^[\+]{0,1}380([0-9]{9})$/.test(input.value)
    }

    // Image upload input
    const imageInput = document.querySelector('.file__input')
    // Image input upload image span text element
    const imageInputSpan = document.querySelector('.upload-your-photo')
    // Event listener on the input
    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0]
        uploadFile(file)
        imageInputSpan.innerHTML = file.name
        imageInputSpan.style.color = 'black'
    })

    // Function valid image file and size check
    function uploadFile(file) {
        removeError(imageInput)
        imageInputSpan.innerHTML = file.name
        if (!['image/jpeg', 'image/jpg', 'image/png', 'image/tiff', 'image/gif'].includes(file.type)) {
            addError(imageInput)
            imageInput.value = ''
            return false
        }
        if (file.size > 5 * 70 * 70) {
            addError(imageInput)
            return false
        }
        return true
    }
}
