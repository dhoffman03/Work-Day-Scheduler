// Display current day
let today = moment().format('dddd, MMMM Do');
$('#currentDay').html(today)

// Set up variables
let time = moment();
let hour = moment().hours();
let saveBtn = $('.btn');

function workdayTracker() {

    $('.time-block').each(function () {
        // Grab id
        let id = $(this).attr('id');
        let schedule = localStorage.getItem(id);

        if (schedule !== 'null') {
            $(this).children('.description').val(schedule);
        };
    });
};

// Use jQuery to dectect the document's state of readiness 
$(document).ready(function () {

    // Run function
    workdayTracker();

    // Add to local storage
    saveBtn.on('click', function () {
        let time = $(this).parent().attr('id');
        let schedule = $(this).siblings('.description').val();

        console.log(time);
        console.log(schedule);

        localStorage.setItem(time, schedule);
    });

    // timebBock row data changed by id/hour data for a color coded display
    function colorBlock() {
        hour = time.hours();
        $('.time-block').each(function () {
            let currentHour = parseInt($(this).attr('id'));
            hour = parseInt(hour);

            if (currentHour < hour) {
                $(this).removeClass("future");
                $(this).removeClass("present");
                $(this).addClass("past");
            }
            else if (currentHour === hour) {
                $(this).removeClass("past");
                $(this).removeClass("future");
                $(this).addClass("present");
            }
            else {
                $(this).removeClass("present");
                $(this).removeClass("past");
                $(this).addClass("future");

            };
        });

        // Clear local storage
        $('.clearBtn').on('click', function () {
            localStorage.clear();
            location.reload();
        })
    };

    // Run function
    colorBlock();
});