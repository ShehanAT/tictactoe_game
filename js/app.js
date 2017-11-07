//checkforwin, move ai , change screens
(function(){
    $(document).ready(function(){
        var token = 'x';
        const grid = ['E','E','E','E','E','E','E','E','E'];
        var computerToken = 'o';
        $('#finish').hide();
        $('#board').hide();
        
    function isGameOver(){
        if ($(".start-button-human").hasClass('checked')){
            var counter = 0;
        }
        else if (!$(".start-button-human").hasClass('checked')){
            var counter = -1;
        }
        for (var i = 0 ; i <= 6; i = i + 3){
            if (grid[i] !== 'E' && grid[i] === grid[i + 1] && grid[i + 1] ===grid[i + 2]){
                
                return grid[i]+'won';
            }
        }
        
        for (var i = 0 ; i <= 2; i++){
            if (grid[i] !== 'E' && grid[i] === grid[i + 3] && grid[i + 3] === grid[i + 6]){
                
                return grid[i]+'won';
            }
        }
        for (var i = 0, j = 4; i <= 2; j-= 2, i+=2){
            if (grid[i] !== 'E' && grid[i] === grid[i + j] && grid[i + j] === grid[i + 2*j]){
                
                return grid[i]+'won';
            }
        }
        
        for (var i = 0 ; i < 9; i++){
            if($('#'+i).hasClass('occupied')){
                counter++;    
            }
        }
        if (counter == 8){
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
        
        if (whoWon == 'xwon'){
            $('#board').hide();
            $('#finish').addClass('screen-win-two').removeClass('screen-win-tie screen-win-one');
            $('header h1').text($(".col-2").text().replace(/['"]+/g, ''))
            $('#finish').show();
            
        }
        if (whoWon == 'owon'){
            $('#board').hide();
            $('header h1').text($(".col-1").text().replace(/['"]+/g, ''))//'<p>'+$(".col-1").text().replace(/['"]+/g, '')+'</p>')
            //$('#finish').css('background-image','url(mockups/tictactoe-03-winner1.png)');
            $('#finish').removeClass('screen-win-tie');
            $('#finish').addClass('screen-win-one').removeClass('screen-win-two screen-win-tie');
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
    var turnObject = {
        turn: 'x',
        color:'#3688C3',
        background: 'orange'
    }
    $('.start-button-computer').click(function(){
        $("#player2").css('background-color', '#3688C3');
        var name = prompt("What is your name?");
        while(name == ''){
            var name = prompt("What is your name?");
        }
        $("#player1").after('<div class="row" ><div class="col-1"><h3 id="comp_name" style="">Computer</h3></div></div>');
        $(".row").append('<div class="col-2"><h3 id="human_name"style="">'+ name +'<h3></div>');
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
        if ($("#"+event.target.id).hasClass('occupied') == false && !$(".start-button-human").hasClass('checked')){//human vs computer
            $(this).text(token).css('color','#3688C3');
            $("#"+event.target.id).addClass('occupied box-filled-2');
            grid[event.target.id] = 'x';
            advance();
        }
        if ($(".start-button-human").hasClass('checked') && !$('#'+event.target.id).hasClass('occupied')){//human vs human
            
            $("#"+event.target.id).html(turnObject.turn).css('color', turnObject.color);
            
            grid[event.target.id] = turnObject.turn;
            if (isGameOver() == 'draw'){
                changeScreen('draw');
            }
            else if (isGameOver() == 'owon'){
                changeScreen('owon');
            }
            else if (isGameOver() == 'xwon'){
                changeScreen('xwon');
            }
            else{
                if (turnObject.turn == 'x'){
                    $("#player1").css('background-color',turnObject.background);
                    $("#player2").css('background-color','white');
                    turnObject.turn = 'o';
                    turnObject.color = 'orange';
                    turnObject.background = '#3688C3'
                }
                
                else if (turnObject.turn == 'o'){
                    $("#player2").css('background-color',turnObject.background);
                    $("#player1").css('background-color','white');
                    turnObject.turn = 'x';
                    turnObject.color = '#3688C3';
                    turnObject.background = 'orange';
            }
                
            }
            var filledNum = turnObject.turn === 'x' ? 'o' : 'x';
            console.log(filledNum);
            if (filledNum == 'x'){
                filledNum = 'box-filled-' + '2';
            }
            else{
                filledNum = 'box-filled-' + '1';
            }
            $('#'+event.target.id).addClass(filledNum);
            $("#"+event.target.id).addClass('occupied');
            }
            
            //else{
                
            //}
            
            
            
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
