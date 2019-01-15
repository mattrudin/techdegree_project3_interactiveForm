// Sets the focus on input at page load
$('input#name').focus();

// If JavaScript is active, the other-title input will be hidden
// If JavaScript is not active, the input will be shown -> obtrusive javscript principle
const inputOtherTitle = $('input#other-title');
inputOtherTitle.hide();

// Eventhandlet for the job role selection:
// If other is selected, the user shall see the hidden "other title" field
$('select#title').on('change', (event) => {
    let jobRoleInput = $(event.target).val();
    jobRoleInput === 'other' ? inputOtherTitle.show() : inputOtherTitle.hide();
});