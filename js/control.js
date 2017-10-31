//user input control page, takes in input given by the user in the HT
//game.js
(function(){
    //lines 5 to 332 are for computer vs human
    var State = function(old){//state of the game stored in a object, methods of the game
        this.turn = '';
    
        this.oMovesCount = 0;
    
        this.result = 'still running';
    
        this.board = [];
    
        if (typeof old !== 'undefined'){
            var len = old.board.length;
            this.board = new Array(len);
            for (var itr = 0 ; itr < len; itr++){
                this.board[itr] = old.board[itr];
            }
            this.oMovesCount = old.oMovesCount;
            this.result = old.result;
            this.turn = old.turn;
    
        }
        this.advanceTurn = function(){
            this.turn = this.turn === "X" ? "O" : "X";
        }
    
        this.emptyCells = function(){
            var indxs =[];
            for (var itr = 0 ; itr < 9 ; itr++){
                if (this.board[itr] === "E"){
                    indxs.push(itr);
                }
            }
            return indxs;
        }
        this.isTerminal = function(){
            var B = this.board;
            //check for rows
            //console.log('passing');
            
            for (var i = 0 ; i <= 6; i = i + 3){
                if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] === B[i + 2]){
                    this.result = B[i] + "-won";
                    return true;
    
                }
            }
            //check for columns
            for (var i = 0 ; i <= 2; i++){
                if (B[i] !== 'E' && B[i] === B[i + 3] && B[i + 3] === B[i + 6]){
                    this.result = B[i] + "-won";
                    return true;
                }
            }
            //check for diagonals
            for (var i = 0, j = 4; i <= 2; j -= 2, i += 2){
                if (B[i] !== 'E' && B[i] === B[i + j] && B[i + j] === B[i + 2*j]){
                    this.result = B[i] + "-won";
                    return true;
                }
            }
    
            var available = this.emptyCells();
            if (available.length == 0){
                this.result = "draw";
                return true;
            }
            else{
                return false;
            }
            
            
        };
    };
    var Game = function(autoPlayer){//the object used for a new game
        this.ai = autoPlayer;
    
        this.currentState = new State()// inherits from the State object
    
        this.currentState.board = ["E", "E", "E",
                                    "E","E","E",
                                    "E","E","E"];
        this.currentState.turn = "X";
    
        this.status = "beginning";
        this.advanceTo = function(_state){//_state is next, the new state object
            this.currentState = _state;
            //console.log(_state);
            if (_state.isTerminal()){
                this.status = "ended";
                if (_state.result === "X-won"){
                    ui.switchViewTo("human");
                }
                else if (_state.result === 'O-won'){  
                    ui.switchViewTo("ai");//player lost
                }
                else{
                    ui.switchViewTo("draw");
                }
            }
            else{
                
                if(this.currentState.turn === "X"){
                    $("#board").show();
                    $("#start").hide();
                    $(".screen-win").hide();
                }
                else{
                    if(!$("#game_type").attr('checked')){//making sure human vs human and computer vs human code do not mix
                        this.ai.notify('O');
                    }  
                }
            }
        };
        this.start = function(){
            
            if(this.status = 'beginning'){
                //invoke advanceTo with the initial state
                this.advanceTo(this.currentState);
                this.status = 'running';
            }
        }
    };
    Game.score = function(_state){//minimax scoring system to pick best AI move
        if (_state.result === "X-won"){
            return 10 - _state.oMovesCount;
        }
        else if (_state.result === "O-won"){
            return - 10 + _state.oMovesCount;
        }
        else{
            //it's a draw
            return 0;
        }
    }
    var ui = {};//ui properties 
    
        ui.intialControlsVisible = true;
    
        ui.robotFlickeringHandle = 0;
    
        ui.currentView = "";
    
        ui.startRobotFlickering = function(){
            ui.robotFlickeringHandle = setInterval(function(){
                $("#robot").toggleClass('robot');
            }, 500);
        };
    
        ui.stopRobotFlickering = function(){
            clearInterval(ui.robotFlickerHandle);
        }
    
        ui.switchViewTo = function(turn){//changing displays depending on whether the human or computer won, or if it was a draw
            if (turn == "player"){
                $('#board').hide();
                $('#start').hide();
                $('.screen-win').removeClass('screen-win-one screen-win-tie').addClass('player-win');
                $('.screen-win').show();
            }        
             if (turn == "ai"){
                 
                 $('#board').hide();
                 $('#start').hide();
                 $(".screen-win").removeClass('screen-win-two screen-win-tie').addClass('comp-win');
                 $(".screen-win").show();
        }
            if (turn == "draw"){
                $('#board').hide();
                $('#start').hide();
                $(".screen-win").removeClass("screen-win-one screen-win-two").addClass("draw");
                $(".screen-win").show();
            }
            
           
            
        };
        /*ui.switchColorTurn = function(){
            console.log('passing');
            $('#player2').css('background-color', 'red');
            $('#player1').css('background-color', 'white');
        }*/
        ui.insertAt = function(indx, symbol){
            
            var targetCell = $("#"+indx);
            if (!targetCell.hasClass('occupied')){
                
                targetCell.html(symbol)
                targetCell.css({
                    "text-align": "center",
                    "font-size":"31px",
                    color: symbol == "X"? "green" : "red"//if the symbol is x the color of the symbol is green, else the color is red
                });
                if ($("#game_type").attr('checked')){
                    console.log('human');
                    if (symbol == 'X'){
                        $("#player1").css('background-color','');
                        $("#player2").css('background-color','white');
                    }
                    if (symbol == 'O'){
                        $("#player1").css('background-color','red');
                        $("#player2").css('background-color','green');
                    }
                    
                    
                }
                else{
                    if (symbol == 'X'){
                        $('#player1').css('background-color','red');
                        $('#player2').css('background-color', 'white');
                        targetCell.addClass('occupied');
                        
                    }
                    if (symbol == 'O'){
                        $('#player1').css('background-color', 'red');
                        $('#player2').css('background-color', 'green');
                        targetCell.addClass('occupied');
        
                    }
                }
                }
               
        }
        ui.switchTurnColor = function(){
            $('#player2').css('background-color','green');
            $("#player1").css('background-color','red');
        }
    
    var AIAction = function(pos){//object for minimax algorithm
        this.movePosition = pos;
        this.minimaxVal = 0;
        this.applyTo = function(state){
            var next = new State(state);
    
            next.board[this.movePosition] = state.turn;
            
            if (state.turn === "O"){
                next.oMovesCount++;
            }
            next.advanceTurn();
    
            return next;
        };
    }
        AIAction.ASCENDING = function(firstAction, secondAction){//function for checking value of a move that is possible by the AI.
            if (firstAction.minimaxVal < secondAction.minimaxVal)
                return -1;
            else if (firstAction.minimaxVal > secondAction.minimaxVal)
                return 1;
            else
                return 0;
        }
        AIAction.DESCENDING = function(firstAction, secondAction){//function for checking value of a move that is possible by the AI.
            if (firstAction.minimaxVal > secondAction.minimaxVal)
                return -1;
            else if(firstAction.minimaxVal < secondAction.minimaxVal)
                return 1;
            else 
                return 0; 
        }
     var AI = function(level){
        var levelOfIntelligence = level;
        var game = {};
    function minimaxValue(state){
        if(state.isTerminal()){
            return Game.score(state);
        }
        else{
            var stateScore;
    
            if (state.turn === "X")
                stateScore = -1000;
            else
                stateScore = 1000;
            
            var availablePositions = state.emptyCells();
    
            var availableNextStates = availablePositions.map(function(pos){
                var action = new AIAction(pos);
    
                var nextState = action.applyTo(state);
    
                return nextState;
            });
    
            availableNextStates.forEach(function(nextState){
                var nextScore = minimaxValue(nextState);
                if (state.turn === "X"){
                    //X wants to maximize 
                    if (nextScore > stateScore)
                        stateScore = nextScore;
                }
                else{
                    //O wants to minimize
                    if (nextScore < stateScore)
                        stateScore = nextScore;
                }
            });
            
            return stateScore;
        }
    }
    
    function takeAMasterMove(turn){
        
        //game is undefined
        var available = game.currentState.emptyCells();
    
        var availableActions = available.map(function(pos){
            var action = new AIAction(pos);
            var next = action.applyTo(game.currentState);
    
            action.minimaxVal = minimaxValue(next);
    
            return action;
        });
        
        if(turn === "X")
            availableActions.sort(AIAction.DESCENDING);
        else 
            
            availableActions.sort(AIAction.ASCENDING);
    
        var chosenAction = availableActions[0];
        
        var next = chosenAction.applyTo(game.currentState);
        
        ui.insertAt(chosenAction.movePosition, turn);
    
        game.advanceTo(next);
    }
    this.plays = function(_game){
        game = _game;
    
    };
    this.notify = function(turn){
        
            takeAMasterMove(turn);
        }
    }

    var Player = function(){
        this.currentState = new State();
        this.currentState.board = ["E", "E", "E",
                                    "E","E","E",
                                    "E","E","E"];
        this.currentState.turn = "X";
        this.winner = '';
        this.status = "beginning";
        this.changeSymbol = function(){
            this.currentState.turn = this.currentState.turn === "X" ? "O" : "X";
    
        }
        this.isTerminal = function(){
            var B = this.currentState.board;
            var counter = 0;
           
            //check for rows
            for (var i = 0 ; i <= 6; i = i + 3){
                if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] == B[i + 2]){
                    this.winner = B[i] + "-won";
                    return true;
    
    
                }
            }
            //check for columns
            for (var i = 0 ; i <= 2; i++){
                if (B[i] !== 'E' && B[i] === B[i + 3] && B[i + 3] === B[i + 6]){
                    this.winner = B[i] + "-won";
                    return true;
                }
            }
            //check for diagonals
            for (var i = 0, j = 4; i <= 2; j -= 2, i += 2){
                if (B[i] !== 'E' && B[i] === B[i + j] && B[i + j] === B[i + 2*j]){
                    this.winner = B[i] + "-won";
                    return true;
                }
            }
            for(var i = 0 ; i < 12; i++){
                if($("#"+i).hasClass('occupied')){
                    counter++;
                } 
            }
            if (counter == 9){
                this.winner = 'draw';
                return true;
            }
            if (this.winner == ''){
                return false;
            }
        }
        this.changeScreen = function(winner){
            if (winner == 'X-won'){
                $('#board').hide();
                $('#start').hide();
                $(".screen-win").addClass('player2').removeClass('player1');
                $(".screen-win").show();
            }
            if (winner == 'O-won'){
                $('#board').hide();
                $('#start').hide();
                $(".screen-win").addClass('player1').removeClass('player2');
                $(".screen-win").show()
            }
            if (winner == 'draw'){
                $('#board').hide();
                $('#start').hide();
                $(".screen-win").addClass('draw').removeClass('player1 player2');
                $('.screen-win').show();
            }
            
        }
     }
    var globals = {}
    var player1 = new Player();//human vs human game object
    $("#board").hide();
    $("#start").show();
    $(".screen-win").hide();
    
    $("#game_type").click(function(){
        var $this = $(this);
        $this.click(function(event){
            
            $("#board").show();
            $("#start").hide();
            $(".screen-win").hide();
            if (event.target.id == 'comp-btn'){
                var aiPlayer = new AI('master');//ai object with all its methods are in the global game object which is the Game object
                globals.game = new Game(aiPlayer);//globals.game is a new property of the globals object
                aiPlayer.plays(globals.game);
                globals.game.start();
            }
            if (event.target.id == 'human-btn'){
                $("#game_type").attr('checked','checked');
                
                    
            }   
             
            
        })
    });
    
      
    $(".box").each(function(event){
        var $this = $(this);
        var counter = 0;
        $this.click(function(event){
            var indx = parseInt(event.target.id);
            if ($("#game_type").attr('checked')){//human vs human
               if (!$("#"+event.target.id).hasClass('occupied')){
                player1.status = 'still running';
                player1.currentState.board[indx] = player1.currentState.turn;
                ui.insertAt(indx, player1.currentState.turn);
                player1.changeSymbol();
                if (player1.isTerminal()){
                    player1.changeScreen(player1.winner);
                }
               }
               
               
            }
            else{
                $("#player1").addClass('blink-me');
                //ui.switchColorTurn();
                if (!$("#"+event.target.id).hasClass('occupied')){
                    //$('#player1').css('background-color','red');
                    //ui.switchColorTurn();
                    var next = new State(globals.game.currentState);//next is assigned the state object in the game.js file
                    next.board[indx] = "X";
                    
                    ui.insertAt(indx, "X");
                    next.advanceTurn();//switch this.turn from x to o
                    globals.game.advanceTo(next);
                }
            }
            
        });
    
    });
})();









    
