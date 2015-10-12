var Choice = function (choice, number) {
  this.choice = choice;
  this.number = number;
}

Choice.prototype.formatChoice = function () {
  return '<li><input type="radio" name="question' + this.number + '" value="' + this.choice.split(' ')[0].toLowerCase() + '">' + this.choice + '</li>';
}

var Question = function (questionData, number) {
  this.question = questionData.question;
  this.choices = questionData.choices;
  this.correctAnswer = questionData.answer.toLowerCase();
  this.givenAnswer;
  this.number = number;
}

Question.prototype.formattedChoices = function () {
  var choice;
  choiceList = $('<ul>');
  for (var i = 0; i < this.choices.length; i++) {
    choice = new Choice(this.choices[i], this.number);
    choiceList.append(choice.formatChoice());
  }
  return choiceList;
}

Question.prototype.formattedQuestion = function () {
  var parentDiv = $("<div>").attr({class: "question", id: this.number});
  $("<div>").text(this.question).appendTo(parentDiv);
  parentDiv.append(this.formattedChoices());
  parentDiv.append('<p class="hidden no-answer">Please select an option.</p>');
  return parentDiv;
}

Question.prototype.setAnswer = function (answer) {
  this.givenAnswer = answer;
}

var Quiz = function () {
  this.questions = {};
}

Quiz.prototype.endQuiz = function (correct, num_questions) {
  var ratio = correct / num_questions;
  var percentage = ratio * 100;
  if (ratio >= 0.5) {
    $('<h2>').text('Pass').attr('class', 'pass').appendTo('.result');
  } else {
    $('<h2>').text('Fail').attr('class', 'fail').appendTo('.result');
  }
  $('<p>').text('You got ' + correct + ' out of ' + num_questions + ' questions correct. That\'s ' + percentage.toFixed(1) + '% percent.').appendTo('.result');
  $('.result').append('<input type="submit" value="Retake" id="retake">')
  $('.result').removeClass('hidden');
  $('form').remove();
}

Quiz.prototype.makeQuiz = function (data) {
  var question;
  var questions = {};
  for (var i = 0; i < data.length; i++) {
    question = new Question(data[i], i);
    questions['question' + i] = question;
    $("form").append(question.formattedQuestion());
  }
  $("form").append('<input type="submit" value="Submit" id="submit">');
  this.questions = questions;
  this.formSubmit();
}

Quiz.prototype.getJSON = function () {
  var quiz = this;
  $.ajax({
    url: "questions.json",
    dataType: "json"
  })
    .done(function (data) {
      quiz.makeQuiz(data);
    });
}

Quiz.prototype.setAnswers = function (answers) {
  var question;
  var answer;
  var questions = this.questions;
  for (var i = 0; i < answers.length; i++) {
    answer = answers[i];
    question = questions[answer.name];
    question.setAnswer(answer.value);
  }
}

Quiz.prototype.formSubmit = function () {
  var quiz = this;
  var questions = quiz.questions;
  var num_questions = Object.keys(questions).length;
  var correct = 0;
  var question;
  var answer;
  var end = $("form").submit(function () {
    var answers = $( this ).serializeArray();
    quiz.setAnswers(answers);
    for (var key in questions) {
      question = questions[key];
      if (question.givenAnswer == question.correctAnswer) {
        correct++;
      } 
      if (question.givenAnswer) {
        $('#' + question.number + ' .no-answer').addClass('hidden');
      } else {
        $('#' + question.number + ' .no-answer').removeClass('hidden');
      }
    }
    if (answers.length < num_questions) {
      return false;
    }
    quiz.endQuiz(correct, num_questions);
    return false;
  });
}
