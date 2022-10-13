// Display current day
const today = moment().format('dddd, MMMM Do');
$('#currentDay').html(today)

// Set up variables
let hour = moment().hours();
const saveBtn = $('.btn');
const timeBlock = $('.time-block')
const clearBtn = $('.clearBtn')

// Keeps textarea saved on reload
function workdayTask() {

    timeBlock.each(function () {
        // Grab id
        const id = $(this).attr('id');
        let schedule = localStorage.getItem(id);

        if (schedule !== null) {
            $(this).children('.description').val(schedule);
        };
    });
};

// Use jQuery to dectect the document's state of readiness 
$(document).ready(function () {

    // Run function
    workdayTask();

    // Add to local storage
    saveBtn.on('click', function () {
        const time = $(this).parent().attr('id');
        let schedule = $(this).siblings('.description').val();

        console.log(time);
        console.log(schedule);

        localStorage.setItem(time, schedule);
    });

    // timeblocks data changed by id/hour data for a color coded display of past, present, and future
    function colorCoded() {
        hour;
        timeBlock.each(function () {
            const currentHour = parseInt($(this).attr('id'));
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
        clearBtn.on('click', function () {
            localStorage.clear();
            location.reload();
        })
    };

    // Run function to color code timeblocks
    colorCoded();
});