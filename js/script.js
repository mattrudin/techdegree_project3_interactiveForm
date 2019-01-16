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
$('select#design').change(() => {
    const design = $(event.target).val();
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
$('fieldset.activities').change(() => {
    const jsFramework = $("input[name=js-frameworks]");
    const express = $("input[name=express]");
    const jsLibs = $("input[name=js-libs]");
    const node = $("input[name=node]");
    
    const isJSFramework = jsFramework.is(":checked");
    const isExpress = express.is(":checked")
    const isJSLibs = jsLibs.is(":checked");
    const isNode = node.is(":checked");

    isJSFramework ? express.attr('disabled', true) : express.removeAttr('disabled');
    isExpress ? jsFramework.attr('disabled', true) : jsFramework.removeAttr('disabled');
    isJSLibs ? node.attr('disabled', true) : node.removeAttr('disabled');
    isNode ? jsLibs.attr('disabled', true) : jsLibs.removeAttr('disabled');
})