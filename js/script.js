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
// The following function hides all t-shirts, because no design is selected 
const initialTshirt = () => {
    $('select#color').val(null);
    $('option[value=tomato]').hide();
    $('option[value=steelblue]').hide();
    $('option[value=dimgrey').hide();
    $('option[value=cornflowerblue]').hide();
    $('option[value=darkslategrey]').hide();
    $('option[value=gold]').hide();
}

initialTshirt();

// Eventhandler for the t-shirt design
// Hides also the "select theme" option
$('select#design').change((event) => {
    const design = event.target.value;
    $('option:contains("Select Theme")').hide();
    design === 'js puns' ? hideHeartJS() : hideJSPuns();
})

// Utility functions for the above event handler
const hideHeartJS = () => {
    $('select#color').val('cornflowerblue');
    $('option[value=tomato]').hide();
    $('option[value=steelblue]').hide();
    $('option[value=dimgrey').hide();
    $('option[value=cornflowerblue]').show();
    $('option[value=darkslategrey]').show();
    $('option[value=gold]').show();
}

const hideJSPuns = () => {
    $('select#color').val('tomato');
    $('option[value=tomato]').show();
    $('option[value=steelblue]').show();
    $('option[value=dimgrey').show();
    $('option[value=cornflowerblue]').hide();
    $('option[value=darkslategrey]').hide();
    $('option[value=gold]').hide();
}

/************************************************************************************
Register for activities section
************************************************************************************/
// Checkbox checker function
const checkBoxChecker = ({ jsFramework, express, jsLibs, node, isJSFramework, isExpress, isJSLibs, isNode }) => {
    isJSFramework ? express.attr('disabled', true) : express.removeAttr('disabled');
    isExpress ? jsFramework.attr('disabled', true) : jsFramework.removeAttr('disabled');
    isJSLibs ? node.attr('disabled', true) : node.removeAttr('disabled');
    isNode ? jsLibs.attr('disabled', true) : jsLibs.removeAttr('disabled');
}

// Running total implementation
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

// Eventhandler on fieldset
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
const initialPayment = () => {
    $('select#payment').val('credit card');
    $('option[value=select_method]').hide();
    $('div#paypal').hide();
    $('div#bitcoin').hide();
}

initialPayment();

// Eventhandler for payment options
$('select#payment').change(() => {
    const paymentMethod = event.target.value;
    paymentMethod === 'credit card' ? paymentCredit() : paymentMethod === 'paypal' ? paymentPaypal() : paymentBitcoin();
})

const paymentCredit = () => {
    $('div#credit-card').show();
    $('div#paypal').hide();
    $('div#bitcoin').hide();
}

const paymentPaypal = () => {
    $('div#credit-card').hide();
    $('div#paypal').show();
    $('div#bitcoin').hide();
}

const paymentBitcoin = () => {
    $('div#credit-card').hide();
    $('div#paypal').hide();
    $('div#bitcoin').show();
}

/************************************************************************************
Form validation
************************************************************************************/
$('button[type=submit]').on('click', (event) => {
    const name = $('input#name').val();
    const email = $('input#mail').val();
    if (!isNameValid(name) || !isEmailValid(email) || !isActivitiesValid() /*|| !isPaymentValid() */) event.preventDefault();
})

const isNameValid = name => /^[A-Za-z]+$/.test(name);

const isEmailValid = email => /^[^@]+@[^@]+\.[a-z]+$/ig.test(email);

const isActivitiesValid = () => {
    let isValid = false;
    $('input[type=checkbox]').each(function () {
        if (this.checked) isValid = true;
    });
    return isValid;
}

const isPaymentValid = () => {

}