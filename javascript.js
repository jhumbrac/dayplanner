var hours = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm'];
var workDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
var dayValue = ['su', 'm', 't', 'w', 'r', 'f', 'sa'];
var time;
var date;
var past; // style with css
var present;
var future;

var calendar = $('<div>').attr('id', 'calendar');
var calendarDay = $('<div>').attr('class', 'calendarDay')

// to do container
var plusBtn = $('<button>').attr('id','plusBtn');
var plusSpan = $('<span>').text('+');
plusBtn.append(plusSpan);
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
var interval;
var timerUlData;
var ulData;

var clockDisplay = $('<h2>').attr('id', 'clockDisplay');

function timer() {
    interval = setInterval(function(){
        clockDisplay.text( moment().format('dddd, h:mm:ss a') );
        var timerDay = moment().format('dddd').toLowerCase();
        var timerDayValue;
        var timerHour = moment().format('h');
         
        switch (timerDay) {
            case 'monday':
                timerDayValue = 'm';
                break;
            case 'tuesday':
                timerDayValue = 't';
                break;
            case 'wednesday':
                timerDayValue = 'w';
                break;
            case 'thursday':
                timerDayValue = 'r';
                break;
            case 'friday':
                timerDayValue = 'f';
                break;
            case 'sunday':
                timerDayValue = 'su';
                break;
            case 'saturday':
                timerDayValue = 'sa';
                break;
            default:
                alert('Please select a work day');
        }
        timerUlData = timerDayValue + timerHour;
        $('[data-hour]').attr('class', '');
        $(`[data-hour=${timerUlData}]`).attr('class', 'currentTime');
        // if (timerUlData === ulData) {
        //     console.log( 'true');
        // } else {
        //     console.log( ' false ');
        //     console.log( timerUlData, ulData);
        // }
    }, 1000)
}
timer();

// DOM
$('body').prepend(clockDisplay).text(timer);
$('body').prepend(plusBtn);
$('body').prepend(entryForm);
entryForm.append(inputContainer, dayContainer, timeContainer, saveBtn);
inputContainer.append( userInput, inputLabel );
dayContainer.append(dayInput, dayLabel);
timeContainer.append(timeInput, timeLabel );

$('body').prepend(calendar);

for ( var i = 0; i < workDays.length; i++ ){
    var currentDay = $('<h2>').text(workDays[i]);

    calendarDay.append(currentDay);
    hours.forEach(hour=>{
        var a = $('<div>').attr('id', `${workDays[i]}div${hour}`).attr('data-hour', dayValue[i] + parseInt(hour));
        var b = $('<h3>').text(hour).attr('class', 'hourHeader');
        var c = $('<ul>');;
        $(calendarDay).append(a);
        a.append(b, c);
    });
}
calendar.append(calendarDay);


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
    var dayChoice = dayInput.val().trim().toLowerCase();
    switch (dayChoice) {
        case 'sunday':
            dayValue = 'su';
            break;
        case 'monday':
            dayValue = 'm';
            break;
        case 'tuesday':
            dayValue = 't';
            break;
        case 'wednesday':
            dayValue = 'w';
            break;
        case 'thursday':
            dayValue = 'r';
            break;
        case 'friday':
            dayValue = 'f';
            break;
        case 'saturday':
            dayValue = 'sa';
            break;
        default:
            alert('Please select a work day');
    }
    ulData = $(`[data-hour="${dayValue}${timeValue}"`);
    $(ulData).children('ul').append(inputValue);
    $('body').toggleClass('modal');
    resetForm();
    // save to local storage
});