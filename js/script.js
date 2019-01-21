/************************************************************************************
Focus on page load
************************************************************************************/
// Sets the focus on input at page load
$('input#name').focus();

/************************************************************************************
Job role section
************************************************************************************/
// If JavaScript is active, the other-title input will be hidden
// If JavaScript is not active, the input will be shown -> obtrusive javscript principle
const inputOtherTitle = $('input#other-title');
inputOtherTitle.hide();

// Eventhandlet for the job role selection:
// If other is selected, the user shall see the hidden "other title" field
$('select#title').on('change', (event) => {
    const jobRoleInput = $(event.target).val();
    jobRoleInput === 'other' ? inputOtherTitle.show() : inputOtherTitle.hide();
});

/************************************************************************************
T-Shirt info section
************************************************************************************/
// Utility functions for show and hide options
const hideOptions = (...args) => {
    for(let i = 0; i < args.length; i++) {
        $(`option[value=${args[i]}]`).hide();
    }
}

const showOptions = (...args) => {
    for(let i = 0; i < args.length; i++) {
        $(`option[value=${args[i]}]`).show();
    }
}

// Utility functions for the below event handler
// Hides and shows selected options
const hideHeartJS = () => {
    $('select#color').val('cornflowerblue');
    hideOptions('tomato','steelblue','dimgrey');
    showOptions('cornflowerblue','darkslategrey','gold');
}

const hideJSPuns = () => {
    $('select#color').val('tomato');
    showOptions('tomato','steelblue','dimgrey');
    hideOptions('cornflowerblue','darkslategrey','gold');
}

// The following function will be invoked at page initialization and hides all t-shirts, because no design is selected 
const initialTshirt = () => {
    $('select#color').val(null);
    hideOptions('tomato','steelblue','dimgrey','cornflowerblue','darkslategrey','gold');
}

initialTshirt();

// Eventhandler for the t-shirt design
// Hides also the "select theme" option
$('select#design').change((event) => {
    const design = event.target.value;
    $('option:contains("Select Theme")').hide();
    design === 'js puns' ? hideHeartJS() : hideJSPuns();
})

/************************************************************************************
Register for activities section
************************************************************************************/
// Checkbox checker function
// Disables and enables checkboxes according day and time
const checkBoxChecker = ({ jsFramework, express, jsLibs, node, isJSFramework, isExpress, isJSLibs, isNode }) => {
    isJSFramework ? express.attr('disabled', true) : express.removeAttr('disabled');
    isExpress ? jsFramework.attr('disabled', true) : jsFramework.removeAttr('disabled');
    isJSLibs ? node.attr('disabled', true) : node.removeAttr('disabled');
    isNode ? jsLibs.attr('disabled', true) : jsLibs.removeAttr('disabled');
}

// Running total implementation at the end of the activities section (no obtrusive javascript support)
const totalAmount = ({ isMainConf, isJSFramework, isExpress, isJSLibs, isNode, isBuildTools, isNpm }) => {
    const totalParagraph = $('p#total');
    const activities = $('fieldset.activities');
    const workshopAmount =  (isJSFramework + isExpress + isJSLibs + isNode + isBuildTools + isNpm) * 100;
    const amount = isMainConf ? 200 + workshopAmount : workshopAmount;
    if (isMainConf | isJSFramework | isExpress | isJSLibs | isNode | isBuildTools | isNpm) {
        totalParagraph.length === 1 ? totalParagraph.text(`Total: ${amount}$`) : activities.append($(`<p id='total' >Total: ${amount}$</p>`));
    } else {
        totalParagraph.remove();
    }
}

// Eventhandler on fieldset for checking the checkboxes and total amount
$('fieldset.activities').change(() => {
    const elements = {
        mainCon: $("input[name=all]"),
        jsFramework: $("input[name=js-frameworks]"),
        express: $("input[name=express]"),
        jsLibs: $("input[name=js-libs]"),
        node: $("input[name=node]"),
        buildTools: $("input[name=build-tools]"),
        npm: $("input[name=npm]"),
    }

    const booleans = {
        isMainConf: elements.mainCon.is(":checked"),
        isJSFramework: elements.jsFramework.is(":checked"),
        isExpress: elements.express.is(":checked"),
        isJSLibs: elements.jsLibs.is(":checked"),
        isNode: elements.node.is(":checked"),
        isBuildTools: elements.buildTools.is(":checked"),
        isNpm: elements.npm.is(":checked"),
    }

    checkBoxChecker({ ...elements, ...booleans });
    totalAmount({...booleans});
})


/************************************************************************************
Payment info section
************************************************************************************/
// Hides all payment information at page initialization
const initialPayment = () => {
    $('div#credit-card').hide();
    $('div#paypal').hide();
    $('div#bitcoin').hide();
}

initialPayment();

// Eventhandler for payment options
$('select#payment').change(() => {
    $('option[value=select_method]').hide();
    const paymentMethod = event.target.value;
    paymentMethod === 'credit card' ? paymentCredit() : paymentMethod === 'paypal' ? paymentPaypal() : paymentBitcoin();
})

// Utility functions for the eventhandler
// Shows only the credit card info
const paymentCredit = () => {
    $('div#credit-card').show();
    $('div#paypal').hide();
    $('div#bitcoin').hide();
}

// Shows only the paypal info and clears credit card input
const paymentPaypal = () => {
    $('div#credit-card').hide();
    clearCreditCard();
    $('div#paypal').show();
    $('div#bitcoin').hide();
}

// Shows only the bitcoin info and clears credit card input
const paymentBitcoin = () => {
    $('div#credit-card').hide();
    clearCreditCard();
    $('div#paypal').hide();
    $('div#bitcoin').show();
}

// Clear function for credit card input
const clearCreditCard = () => {
   $('input#cc-num').val('');
   $('input#zip').val('');
   $('input#cvv').val('');
}

/************************************************************************************
Form validation
************************************************************************************/
// Eventhandler for the submit button
// Will not submit if any of the given inputs is empty / false
$('button[type=submit]').on('click', (event) => {
    const name = $('input#name').val();
    const email = $('input#mail').val();
    const creditNumber = $('input#cc-num').val();
    const zipCode = $('input#zip').val();
    const creditCvv = $('input#cvv').val();
    const payment = $('select#payment').val();
    if (!isNameValid(name) || !isEmailValid(email) || !isActivitiesValid() || !isPaymentValid(creditNumber, zipCode, creditCvv)) {
        event.preventDefault();
    } else {
        alert(`Thank you ${name} for your participation! We will send an email with all details to ${email}.${payment === 'paypal' || payment === 'bitcoin' ? `You will be redirected to ${payment}` : ""}`)
    }
})

// Validation functions for the user input
const isNameValid = name => /^[A-Za-z]+$/.test(name);

const isEmailValid = email => /^[^@]+@[^@]+\.[a-z]+$/ig.test(email);

const isActivitiesValid = () => {
    let isValid = false;
    $('input[type=checkbox]').each(function () {
        if (this.checked) isValid = true;
    });
    return isValid;
}

const isPaymentValid = (creditNumber, zipCode, creditCvv) => {
    const payment = $('select#payment').val();
    return payment === 'credit card' && isCreditCardValid(creditNumber, zipCode, creditCvv) || payment === 'paypal' || payment === 'bitcoin' ? true : false;
}

const isCreditCardActive = () => $('div#credit-card').is(":visible");

const isCreditCardNumberValid = creditNumber => /^[\d]{13,16}$/g.test(creditNumber);

const isCreditZipCodeValid = zipCode => /^[\d]{5}$/g.test(zipCode);

const isCreditCvvValid = creditCvv => /^[\d]{3}$/g.test(creditCvv);

const isCreditCardValid = (creditNumber, zipCode, creditCvv) => 
    isCreditCardActive() && 
    isCreditCardNumberValid(creditNumber) && 
    isCreditZipCodeValid(zipCode) && 
    isCreditCvvValid(creditCvv) ? 
    true : false;

/************************************************************************************
Form validation messages
************************************************************************************/
// Eventlistener for name input, will change the border to red if the input is not valid
$('input#name').on('keyup', (event) => {
    const nameInput = $('input#name');
    if (isNameValid(event.target.value)) {
        nameInput.removeClass('not-valid');
    } else {
        nameInput.addClass('not-valid');
    }
})

// Eventlistener for email input, will change the border to red if the input is not valid
$('input#mail').on('keyup', (event) => {
    const emailInput = $('input#mail');
    if (isEmailValid(event.target.value)) {
        emailInput.removeClass('not-valid');
    } else {
        emailInput.addClass('not-valid');
    }
})

// Eventlistener for activities checkboxes, will change the text to red if the input is not valid
$('fieldset.activities').change(() => {
    const labels = $('fieldset.activities label');
    if (isActivitiesValid()) {
        labels.removeClass('not-valid-text');
    } else {
        labels.addClass('not-valid-text');
    }
})

// Eventlistener for credit card number, will change the border to red if the input is not valid
$('input#cc-num').on('keyup', (event) => {
    const creditCardInput = $('input#cc-num');
    if (isCreditCardNumberValid(event.target.value)) {
        creditCardInput.removeClass('not-valid');
    } else {
        creditCardInput.addClass('not-valid');
    }
})

// Eventlistener for zip code, will change the border to red if the input is not valid
$('input#zip').on('keyup', (event) => {
    const zipCodeInput = $('input#zip');
    if (isCreditZipCodeValid(event.target.value)) {
        zipCodeInput.removeClass('not-valid');
    } else {
        zipCodeInput.addClass('not-valid');
    }
})

// Eventlistener for CVV number, will change the border to red if the input is not valid
$('input#cvv').on('keyup', (event) => {
    const cvvInput = $('input#cvv');
    if (isCreditCvvValid(event.target.value)) {
        cvvInput.removeClass('not-valid');
    } else {
        cvvInput.addClass('not-valid');
    }
})