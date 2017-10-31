//checkforwin, move ai , change screens
(function(){
    $(document).ready(function(){
        var token = 'X';
        const grid = ['E','E','E','E','E','E','E','E','E'];
        var computerToken = 'O';
        $('#finish').hide();
        $('#board').hide();
        
    function isGameOver(){
        var counter = 0;
        for (var i = 0 ; i <= 6; i = i + 3){
            if (grid[i] !== 'E' && grid[i] == grid[i + 1] && grid[i + 1] ===grid[i + 2]){
                
                return true;
            }
        }
        
        for (var i = 0 ; i <= 2; i++){
            if (grid[i] !== 'E' && grid[i] == grid[i + 3] && grid[i + 3] == grid[i + 6]){
                
                return true;
            }
        }
        for (var i = 0, j = 4; i <= 2; j-= 2, i+=2){
            if (grid[i] !== 'E' && grid[i] === grid[i + j] && grid[i + j] == grid[i + 2*j]){
            
                return true;
            }
        }
        
        for (var i = 0 ; i < 9; i++){
            if($('#'+i).hasClass('occupied')){
                counter++;
                
            }
            
        }
        
        if (counter == 9){
            return 'draw';
        }
        return false;
    }
    function moveAI(){
        
        for (var i =0 ; i < 9; i++){
            if (!$("#"+i).hasClass('occupied')){
                return $('#'+i);
            }
        }
    }
    function changeScreen(whoWon){
        if (whoWon == 'X'){
            $('#board').hide();
            //$('#finish').css('background-image','url(mockups/tictactoe-04-winner2.png)');
            $('#finish').addClass('screen-win-two').removeClass('screen-win-one');
            $('#finish').show();
    
        }
        if (whoWon == 'O'){
            $('#board').hide();
            //$('#finish').css('background-image','url(mockups/tictactoe-03-winner1.png)');
            $('#finish').addClass('screen-win-one').removeClass('screen-win-two');
            $('#finish').show();
        }
        if (whoWon == 'draw'){
            $('#board').hide();
            $('#finish').css('background-image','url(mockups/draw.png)');
            $('#finish').addClass('screen-win-tie').removeClass('screen-win-two screen-win-one');
            $('.message').hide();
            $('#finish').show();
        }
    }
    function advance(){
        if(isGameOver() == 'draw'){
            changeScreen('draw');
        }
        if (isGameOver()){
            changeScreen('X');
        }
        if (isGameOver() == false){
            const move = moveAI();
            grid[move[0].id] = computerToken;
            $('#'+move[0].id).text('O');
            $('#'+move[0].id).css('color','red');
            $('#'+move[0].id).addClass('occupied');
            if (isGameOver()){
                changeScreen('O');
            }
        }
    }
    var turnObject = {
        turn: 'X',
        color:'green',
        background: 'red'
    }
    $('.start-button-computer').click(function(){
        $("#start").hide();
        $("#board").show();
        $("#finish").hide();
    });
    $('.start-button-human').click(function(){
        $("#start").hide();
        $("#board").show();
        $("#finish").hide();
        $('.start-button-human').addClass("checked");
    });
    $('.box').click(function(event){
        if ($("#"+event.target.id).hasClass('occupied') == false && !$(".start-button-human").hasClass('checked')){
            $(this).text(token).css('color','green');
            $("#"+event.target.id).addClass('occupied');
            grid[event.target.id] = 'X';
            advance();
        }
        if ($(".start-button-human").hasClass('checked') && !$('#'+event.target.id).hasClass('occupied')){
            $("#"+event.target.id).html(turnObject.turn).css('color', turnObject.color);
            
            grid[event.target.id] = turnObject.turn;
            if (isGameOver() == 'draw'){
                changeScreen('draw');
            }
            if (isGameOver()){
                changeScreen(turnObject.turn);
            }
            if (turnObject.turn == 'X'){
                $("#player1").css('background-color',turnObject.background);
                $("#player2").css('background-color','white');
                turnObject.turn = 'O';
                turnObject.color = 'red';
                turnObject.background = 'green'
            }
            else{
                $("#player2").css('background-color',turnObject.background);
                $("#player1").css('background-color','white');
                turnObject.turn = 'X';
                turnObject.color = 'green';
                turnObject.background = 'red';
            }
            $("#"+event.target.id).addClass('occupied');
        }
        
    });
    
    $('.newgame').click(function(){
        location.reload();
    });
    $('.boxes').on('mouseover', (event) => {
		if(!event.target.className.includes('box-filled')) {
			event.target.style.backgroundImage = 'url("img/' + (turnObject.turn).toLowerCase() + '.svg")';
		}
	});
	
	// Make the letter disappear when the player mouses out, if the box is not filled
	$('.boxes').on('mouseout', (event) => {
		if(!event.target.className.includes('box-filled')) { 
			event.target.style.backgroundImage = '';
		}
	});
    }); 
})()
