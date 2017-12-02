function randInt(min, max)
{
	min = Math.ceil(min);
  	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function arrayShuffle(array) 
{
	for(var i = array.length; i > 0; i--)
	{
		var r = randInt(0, i);
		var temp = array[i];
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

		var question = $("<h2>");
		question.addClass("text-box");
		question.text(this.question_text);

		this.element.append(question);
		this.answersE = [];

		var answerE = $("<div>");
		answerE.addClass("row");
		answerE.append($("<div>").addClass("col-lg-12"));
		answerE.children().append($("<p>").text(this.answer));
		answerE.children().children().addClass("question-box");
		answerE.on("click", this.click);
		this.answersE.push(answerE);

		for (var i = 0; i < this.answers_array.length; i++) 
		{
		    answerE = $("<div>");
		    answerE.addClass("row");
		    answerE.append($("<div>").addClass("col-lg-12"));
		    answerE.children().append($("<p>").text(this.answers_array[i]));
		    answerE.children().children().addClass("question-box");
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
		var temp = this.element;
		this.answersE = arrayShuffle(this.answersE);
		for(var i = 0; i < this.answersE.length; i++)
		{
			temp.append(this.answersE[i]);
		}

		parent.append(temp);
	}
}

var game = {
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
		game.questions = arrayShuffle(game.questions);
		game.nextQuestion();
	},

	nextQuestion: function()
	{
		$("#question").empty();
		game.current_question++;
		game.questions[game.current_question].show($("#question"));
		game.timer = setInterval(game.tick, 1000);
		game.time_remaining = 30;
	},

	isAnswer(answer_text)
	{
		if(answer_text === game.questions[game.current_question].answer)
		{
			console.log("CORRECT!");
		}
	},

	tick()
	{
		game.time_remaining--;
		if(game.time_remaining === 0)
		{
			game.nextQuestion();
		}

		$("#timer").text("Time Remaing: " + game.time_remaining + " seconds");
	}
};

const path = "assets/images/";

window.onload = function(){
	game.start_button = $("#start_button");
	game.start_button.on("click", game.newGame);

	game.questions.push(new question("sample question", "correct", ["incorrect0", "incorrect1", "incorrect2"], null));
	game.questions.push(new question("sample question2", "correct", ["incorrect0", "incorrect1", "incorrect2"], null));
	game.questions.push(new question("sample question3", "correct", ["incorrect0", "incorrect1", "incorrect2"], null));
}