var question_info = {
    question_1: {
        question: "When did Grand Theft Auto San Andreas published ?",
        answers: ["2002", "2004" , "2007"],
         right_answer: "B"
    },
    question_2: {
        question: "What is the name of true love of Geralt of Rivia ?",
        answers: ["Yennefer", "Triss", "Shani"],
        right_answer: "A"
    },
    question_3: {
        question: "What is the game type of Assassin's Creed ?",
        answers: ["Action/RPG", "FPS/Action" , "Adventure/Platform"],
        right_answer: "A"
    },
    question_4: {
        question: "Who did write witcher series book ?",
        answers: ["Tom Clancy", "J.K Rowling", "Andrej Sapkowksi"],
        right_answer: "C"
    },
    question_5: {
        question: "Who is first Robin of Batman ?",
        answers: ["Jason Todd" , "Tim Drake", "Dick Grayson"],
        right_answer: "C"
    }
   
}

var start_btn = $('#start_btn');
var menu = $('.menu');
var game = $('.game');
var display_question = $('#display_question')
var variant_A = $('#variant_A')
var variant_B = $('#variant_B')
var variant_C = $('#variant_C')
var progress_bar = $('.progress-bar')
var total_progress = $('#total_progress')

var question_array, progress, progressbar_length, number_of_question
var init = function() {
    question_array = Object.entries(question_info);
    progress = 100 / question_array.length;
    progressbar_length = 0;
    progress_bar.css('width', '0%')
    number_of_question = -1;
    total_progress.text('Total point : 0%')
}
init()

start_btn.on('click', function(){
    init();
    menu.removeClass('d-block')
    menu.addClass('d-none')
    game.removeClass('d-none')
    game.addClass('d-block')
    change_question()
})

let result = function() {
    menu.addClass('d-block')
    menu.removeClass('d-none')
    game.addClass('d-none')
    game.removeClass('d-block')
    total_progress.text(`Total point : ${progressbar_length}%`)

}

function change_question() {
    number_of_question++
    if(number_of_question < question_array.length) {
        display_question.text(question_array[number_of_question][1].question)
        variant_A.text(question_array[number_of_question][1].answers[0])
        variant_B.text(question_array[number_of_question][1].answers[1])
        variant_C.text(question_array[number_of_question][1].answers[2])
        correct_answer = (question_array[number_of_question][1].right_answer)

    }
}

// Playtime

document.addEventListener('keypress', function (event) {

    let user_choice = event.key.toUpperCase()
    let letter

    if ('ABC'.indexOf(user_choice) === -1) {
        alert ("Please enter A/B/C ")
        return
    }

    if(number_of_question <= question_array.length - 1) {
        if(user_choice === 'A') {
            letter = 'A'
        }
        else if(user_choice === 'B') {
            letter = 'B'
        }
        else if(user_choice === 'C') {
            letter = 'C'
        }



        if (user_choice === correct_answer) {
            let success_card = $(`.list${letter}`)
            success_card.removeClass('bg-dark')
            success_card.addClass('bg-success')
            progressbar_length += progress;
            console.log(progressbar_length)
            progress_bar.css(`width`, `${progressbar_length}%`);


            setTimeout(() => {
                change_question()
                success_card.removeClass('bg-success')
                success_card.addClass('bg-dark')
            }, 1000)
            
        }
        else {
            let choice_wrong = $(`.list${letter}`)
            choice_wrong.removeClass('bg-dark')
            choice_wrong.addClass('bg-danger')
            

            setTimeout(() => {
                change_question()
                choice_wrong.removeClass('bg-danger')
                choice_wrong.addClass('bg-dark')
            }, 1000)
        }

        if (number_of_question === question_array.length - 1) {
            result()
        }
    }
})