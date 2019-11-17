var hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
var time;
var date;
var past; // style with css
var present;
var future;

var calendar = $('<div>').attr('id', 'calendar');
var currentDay = $('<h2>').attr('id', 'currentDay').text('Monday');

// to do container
var plusBtn = $('<button>').attr('id','plusBtn').text('+');
var entryForm = $('<form>').attr('id', 'entryForm');
var inputContainer = $('<div>');
var timeContainer = $('<div>');
var dayContainer = $('<div>');
var userInput = $('<input>').attr('type', 'text').attr('id', 'userInput').attr('required', true);
var inputLabel = $('<label>').attr('for', 'userInput').text('To Do');
var timeInput = $('<input>').attr('type', 'number').attr('id', 'timeInput').attr('required', true);
var timeLabel = $('<label>').attr('for', 'timeInput').text('What time?');
var dayInput = $('<input>').attr('type', 'text').attr('id', 'dayInput').attr('required', true);
var dayLabel = $('<label>').attr('for', 'dayInput').text('Which day?');
var inputValue;
var timeValue;
var saveBtn = $('<button>').attr('id', 'saveBtn').attr('class', 'cta').text('Save');
var dayValue = 'm';
// DOM
$('body').prepend(plusBtn);
$('body').prepend(entryForm);
entryForm.append(inputContainer, dayContainer, timeContainer, saveBtn);
inputContainer.append( userInput, inputLabel );
dayContainer.append(dayInput, dayLabel);
timeContainer.append(timeInput, timeLabel );

$('body').prepend(calendar);
calendar.append(currentDay);
hours.forEach(hour=>{
    var a = $('<div>').attr('id', `div${hour}`);
    var b = $('<h3>').text(hour).attr('class', 'hourHeader');
    var c = $('<ul>').attr('data-hour', dayValue + parseInt(hour));
    $(calendar).append(a);
    a.append(b, c);
});
function resetForm() {
    userInput.val('');
    timeInput.val('');
    dayInput.val('');
}


$(plusBtn).on('click', function(event){
    event.preventDefault();
    $('body').toggleClass('modal');
});
$(saveBtn).on('click', function(event){
    event.preventDefault();
    inputValue = $('<li>').text(userInput.val().trim());
    timeValue = timeInput.val();
    ulData = $(`[data-hour="${dayValue}${timeValue}"`);
    ulData.append(inputValue);
    $('body').toggleClass('modal');
    resetForm();
    // save to local storage
});