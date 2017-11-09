
(function(){//module pattern
    $(document).ready(function(){
        var token = 'x';
        const grid = ['E','E','E','E','E','E','E','E','E'];//main grid that the program uses to find the current status of the game
        var computerToken = 'o';
        $('#finish').hide();//hiding finish and board screen on program start
        $('#board').hide();
        
    function isGameOver(){//function that checks if the game is in a winning condition for either player and returns the name of the player that won 
        if ($(".start-button-human").hasClass('checked')){//fixes a bug that conflicted with the human vs human and human vs computer game modes
            var counter = 0;
        }
        else if (!$(".start-button-human").hasClass('checked')){//fixes a bug that conflicted with the human vs human and human vs computer game modes
            var counter = -1;
        }
        for (var i = 0 ; i <= 6; i = i + 3){//checks the rows
            if (grid[i] !== 'E' && grid[i] === grid[i + 1] && grid[i + 1] ===grid[i + 2]){
                
                return grid[i]+'won';
            }
        }
        
        for (var i = 0 ; i <= 2; i++){//checks the columns
            if (grid[i] !== 'E' && grid[i] === grid[i + 3] && grid[i + 3] === grid[i + 6]){
                
                return grid[i]+'won';
            }
        }
        for (var i = 0, j = 4; i <= 2; j-= 2, i+=2){//checks the diagonal squares
            if (grid[i] !== 'E' && grid[i] === grid[i + j] && grid[i + j] === grid[i + 2*j]){
                
                return grid[i]+'won';
            }
        }
        
        for (var i = 0 ; i < 9; i++){
            if($('#'+i).hasClass('occupied')){//mark every occupied square with the class occupied and increases flag variable by 1
                counter++;    
            }
        }
        if (counter == 8){//if the game is a draw return draw status 
            return 'draw';
        }
        return false;
    }
    function moveAI(){//function that moves the ai after human player has taken his turn
        
        for (var i =0 ; i < 9; i++){
            if (!$("#"+i).hasClass('occupied')){
                return $('#'+i);
            }
        }
    }
    function changeScreen(whoWon){//function that changes the screen from board screen to the appropriate winning screen depending on which player won 
        
        if (whoWon == 'xwon'){//checks for win
            $('#board').hide();
            $('#finish').addClass('screen-win-two').removeClass('screen-win-tie screen-win-one');
            $('header h1').text($(".col-2").text().replace(/['"]+/g, ''))
            $('#finish').show();
            
        }
        if (whoWon == 'owon'){//checks for win
            $('#board').hide();
            $('header h1').text($(".col-1").text().replace(/['"]+/g, ''))//'<p>'+$(".col-1").text().replace(/['"]+/g, '')+'</p>')
            //$('#finish').css('background-image','url(mockups/tictactoe-03-winner1.png)');
            $('#finish').removeClass('screen-win-tie');
            $('#finish').addClass('screen-win-one').removeClass('screen-win-two screen-win-tie');
            $('#finish').show();
        }
        if (whoWon == 'draw'){//shows the draw screen
            $('#board').hide();
            $('#finish').css('background-image','url(mockups/draw.png)');
            $('#finish').addClass('screen-win-tie').removeClass('screen-win-two screen-win-one');
            $('.message').hide();
            $('#finish').show();
        }
    }
    function advance(){//function that checks to advance to the next ai move or call changeScreen() if game is in a winning condition
        if(isGameOver() == 'draw'){
            changeScreen('draw');
        }
        if (isGameOver() == 'xwon'){
            changeScreen('xwon');
        }
        if (isGameOver() == false){
            const move = moveAI();
            grid[move[0].id] = computerToken;
            $('#'+move[0].id).text('o');
            $('#'+move[0].id).css('color','orange');
            $('#'+move[0].id).addClass('occupied box-filled-1');
            if (isGameOver() == 'owon'){
                changeScreen('owon');
            }
        }
    }
    var turnObject = {//object used for the human vs human part of the game
        turn: 'x',
        color:'#3688C3',
        background: 'orange'
    }
    $('.start-button-computer').click(function(){//the start button click handler, computer vs human game code
        $("#player2").css('background-color', '#3688C3');
        var name = prompt("What is your name?");//prompt that collects the human player name
        while(name == ''){
            var name = prompt("What is your name?");//brings up a prompt again if the field empty
        }
        $("#player1").after('<div class="row" ><div class="col-1"><h3 id="comp_name" style="">Computer</h3></div></div>');
        $(".row").append('<div class="col-2"><h3 id="human_name"style="">'+ name +'<h3></div>');
        $("#start").hide();
        $("#board").show();
        $("#finish").hide();
    });
    $('.start-button-human').click(function(){//human vs human game code
        
        $("#start").hide();
        $("#board").show();
        $("#finish").hide();
        $('.start-button-human').addClass("checked");
    });
    $('.box').click(function(event){
        if ($("#"+event.target.id).hasClass('occupied') == false && !$(".start-button-human").hasClass('checked')){//human vs computer, differitiating the computer vs human board and human vs human board
            $(this).text(token).css('color','#3688C3');
            $("#"+event.target.id).addClass('occupied box-filled-2');
            grid[event.target.id] = 'x';
            advance();
        }
        if ($(".start-button-human").hasClass('checked') && !$('#'+event.target.id).hasClass('occupied')){//human vs human,differitiating the computer vs human board and human vs human board
            
            $("#"+event.target.id).html(turnObject.turn).css('color', turnObject.color);//changes the square color to match the player 
            
            grid[event.target.id] = turnObject.turn;//switchs the turn from player 1 to player 2 
            if (isGameOver() == 'draw'){//checking if game is a draw 
                changeScreen('draw');
            }
            else if (isGameOver() == 'owon'){//checking if game is a win
                changeScreen('owon');
            }
            else if (isGameOver() == 'xwon'){//checking if game is a win
                changeScreen('xwon');
            }
            else{
                if (turnObject.turn == 'x'){//switchs turns
                    $("#player1").css('background-color',turnObject.background);
                    $("#player2").css('background-color','white');
                    turnObject.turn = 'o';
                    turnObject.color = 'orange';
                    turnObject.background = '#3688C3'
                }
                
                else if (turnObject.turn == 'o'){//switchs turns
                    $("#player2").css('background-color',turnObject.background);
                    $("#player1").css('background-color','white');
                    turnObject.turn = 'x';
                    turnObject.color = '#3688C3';
                    turnObject.background = 'orange';
            }
                
            }
            var filledNum = turnObject.turn === 'x' ? 'o' : 'x';
            console.log(filledNum);
            if (filledNum == 'x'){//puts colors to occupied squares
                filledNum = 'box-filled-' + '2';
            }
            else{
                filledNum = 'box-filled-' + '1';
            }
            $('#'+event.target.id).addClass(filledNum);
            $("#"+event.target.id).addClass('occupied');
            }
            
            
        });
    
    
    $('.newgame').click(function(){//refresh the page when new game button is clicked 
        location.reload();
    });
    $('.boxes').on('mouseover', (event) => {//if the mouse is over the game squares the current player symbol is highlighted
		if(!event.target.className.includes('box-filled')) {
			event.target.style.backgroundImage = 'url("img/' + (turnObject.turn).toLowerCase() + '.svg")';
		}
	});
	
	// Makes the letter disappear when the player mouses out, if the box is not filled
	$('.boxes').on('mouseout', (event) => {
		if(!event.target.className.includes('box-filled')) { 
			event.target.style.backgroundImage = '';
		}
	});
});
})()
