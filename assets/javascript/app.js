function randInt(min, max)
{
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function arrayShuffle(array) 
{
	for(let i = array.length; i > 0; i--)
	{
		let r = randInt(0, i);
		let temp = array[i];
		array[i] = array[r];
		array[r] = temp;
	}

	return array;
}

class question{
	constructor(question_text, answer, answers_array, answer_pic)
	{
		this.question_text = question_text;
		this.answer = answer;
		this.answers_array = answers_array;
		this.answer_pic = answer_pic;

		this.element = $("<div>");
		this.element.addClass("col-lg-8 col-lg-offset-2");

		let question = $("<h2>");
		question.addClass("text-box");
		question.text(this.question_text);

		this.element.append(question);
		this.answersE = [];

		let answerE = $("<div>");
		answerE.addClass("row");
		answerE.append($("<div>").addClass("col-lg-12"));
		answerE.children().append($("<button>").text(this.answer));
		answerE.children().children().addClass("question-box btn btn-info center-block");
		answerE.on("click", this.click);
		this.answersE.push(answerE);

		for (let i = 0; i < this.answers_array.length; i++) 
		{
		    answerE = $("<div>");
		    answerE.addClass("row");
		    answerE.append($("<div>").addClass("col-lg-12"));
		    answerE.children().append($("<button>").text(this.answers_array[i]));
		    answerE.children().children().addClass("question-box btn btn-info center-block");
		    answerE.on("click", this.click);
		    this.answersE.push(answerE);
		}
	}

	click()
	{
		game.isAnswer($(this).text());
	}

	show(parent)
	{
		let temp = this.element;
		this.answersE = arrayShuffle(this.answersE);
		for(let i = 0; i < this.answersE.length; i++)
		{
			temp.append(this.answersE[i]);
		}

		parent.append(temp);
	}

	showAnswer(parent)
	{
		parent.contents().detach();
		let temp = $("<div>");
		temp.addClass("col-lg-12");
		temp.append($("<h4>").text("Correct Answer: " + this.answer).addClass("text-center"));
		temp.append($("<img>").attr("src", this.answer_pic).addClass("answer-image img-responsive center-block"));

		parent.append(temp);
	}
}

const game = {
    questions: [],
    current_question: -1,
    score: 0,
    time_remaining: 30,
    timer: null,
    start_button: null,

    newGame: function()
    {
        game.start_button.hide();
        game.score = 0;
        game.current_question = -1;
        for (let i = game.questions.length - 1; i > 0; i--)
        {
            let r = randInt(0, i);
            let temp = game.questions[i];
            game.questions[i] = game.questions[r];
            game.questions[r] = temp;
        }
        game.nextQuestion();
    },

    nextQuestion: function()
    {
        $("#question").contents().detach();
        game.current_question++;
		clearInterval(game.timer);
        if(game.current_question === game.questions.length)
        {
        	game.start_button.show();
        	$("#question").append("<h4 class=\"text-center\"> Game Over! </h4>");
        	return;
        }
        
        game.questions[game.current_question].show($("#question"));
        game.timer = setInterval(game.tick, 1000);
        game.time_remaining = 30;
    },

    isAnswer(answer_text)
    {
        if (answer_text === game.questions[game.current_question].answer)
        {
        	game.score++;
        	$("#score").text("Score: " + game.score);
            game.questions[game.current_question].showAnswer($("#question"));
            game.time_remaining = 5;
        }
        else
        {
        	game.questions[game.current_question].showAnswer($("#question"));
            game.time_remaining = 5;
        }
    },

    tick()
    {
        game.time_remaining--;
        $("#timer").text("Time Remaing: " + game.time_remaining + " seconds");
        if (game.time_remaining === 0)
        {
            game.nextQuestion();
        }
    }
};

window.onload = function(){
	game.start_button = $("#start_button");
	game.start_button.on("click", game.newGame);

	game.questions.push(new question("What year did America land on the Moon?", "1969", ["1970", "Fake News!", "1962"], "assets/images/on_the_moon.jpg"));
	game.questions.push(new question("What is the first car in space?", "Elon Musk's personal Tesla Roadster", ["Bill Gate's personal Toyota Camry", "Fake News!", "Arnold Schwarzenegger's personal Hummer"], "assets/images/space_man.webp"));
	game.questions.push(new question("What is the first artificial satellite?", "Sputnik 1", ["The Hubble Telescope", "Fake News!", "Elon Musk's personal Tesla Roadster"], "assets/images/Sputnik_1.jpg"));
	game.questions.push(new question("Who was the first person to walk on the moon?", "Neil Armstrong", ["Edwin \"Buzz\" Aldrin", "Fake News!", "Al Gore"], "assets/images/neil_armtstrong.jpg"));

}