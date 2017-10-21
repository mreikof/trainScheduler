// javaScript Trivia Game//
var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  clickSound: new Audio("http://www.moviewavs.com/0053148414/MP3S/Movies/Star_Wars/imperial.mp3"),
  gameHTML: "",
  questionsArray: [
                  "Who is Luke Skywalker's father?","Which is the only film of the original six in which Tatooine doesn't appear?", "Who kills Jabba The Hut?", "Which film has the most deaths?", "What was Luke Skywalker's original surname?", "Where does Yoda live?"],
  answerArray: [
                ["Obi Wan Kenobi", "Emperor Palpatine", "Uncle Owen", "Anakin Skywalker"], ["The Phantom Menace", "The Force Awakens", "Return of the Jedi", "The Empire Strikes Back"], ["Princess Leia", "Han Solo", "Darth Vader", "Luke Skywalker"], ["The Force Awakens", "Attack of the Clones", "A New Hope", "Revenge of the Sith"], ["Stardancer", "Starwalker", "Starkiller", "Stargazer"],["Alderaan", "Dagobah", "Tatooine", "Naboo"],],
  correctAnswers: [
                  "D. Anakin Skywalker", "D. The Empire Strikes Back", "A. Princess Leia", "C. A New Hope", "C. Starkiller", "B. Dagobah"],
  imageArray: [
              "<img class='center-block img-right' src='assets/images/dv.png'>", "<img class='center-block img-right' src='assets/images/Tusken Riders.png'>", "<img class='center-block img-right' src='assets/images/leiauutf.png'>", "<img class='center-block img-right' src='assets/images/LS_01.png'>", "<img class='center-block img-right' src='assets/images/ls_jedi.png'>", "<img class='center-block img-right' src='assets/images/Yoda.png'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 10,
};


//FUNCTIONS
//===========================================
function startScreen(){
  //Create the start button
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>START!</a></p>";
  //Add Start button to main-area
  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);

    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};
//number of questions
function wait(){
  if(trivia.questionCounter < 5) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 10;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 4000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


//MAIN PROCESS
//===========================================
startScreen();

//start-button click
$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	trivia.clickSound.play();
	generateHTML();

	timer();
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	trivia.clickSound.play();
  //If correct answer
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

		clearInterval(trivia.clock);
		win();
	}
  //If incorrect ansewr
	else {

		clearInterval(trivia.clock);
		loss();
	}
}); // Close .answer click

//reset-button click
$("body").on("click", ".reset-button", function(event){
	trivia.clickSound.play();
	resetGame();
}); // Closes reset-button click
