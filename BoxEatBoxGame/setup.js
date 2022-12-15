function setup(){
    let player = document.getElementById("player");
    let ai = document.getElementById("ai");
    let food = document.getElementById("food");
    let scoreBoard = document.getElementById("score");
    let newGame = document.getElementById("newGame");
    newGame.addEventListener("click", startNewGame);
    document.addEventListener("keydown",movePlayer);


    let score = 0;
    let aiSpeed = 600;
    let aiStartHunting = false;
    let aiMoveIntervals = [];
    
    scoreBoard.innerHTML = score;

    let posXPlayer = 20;
    let posYPlayer = 20;
    let playerAlive = true;

    let posXAi = 200;
    let posYAi = 200;

    let boardLeft = 10;
    let boardRight = 400;
    let boardTop = 10;
    let boardBottom = 400;

    let foodX = 0;
    let foodY = 0;

    generateFood();

    function refreashAiMoveSpeed(aiSpeed){
        
        if (aiSpeed > 300){
            aiMoveIntervals.push(setInterval(aiMove, aiSpeed)); //istedenfor å oppdatere den orginale vil en ny interval bli oppretet, ikke ønskelig
            //midlertidig fiks, legge alle intervalene inn i en array så det er lettere å fjerne de
            console.log(aiSpeed);
        }
    }
    function movePlayer(e){ //player movement
        let k = e.keyCode;
        if (playerAlive){
            cheackIfPlayerIsEaten();
        
        switch (k) {
            case 37: //arrow left
                if(!cheackoutOfBounds()){
                    posXPlayer -= 10 ;
                    player.style.left =  posXPlayer + 'px';
                }
                cheackIfFoodIsEaten();
                break;
            case 38: // arrow up
                if (!cheackoutOfBounds()){
                    posYPlayer -= 10;
                    player.style.top = posYPlayer + 'px';
                }
                cheackIfFoodIsEaten();
                break;
            case 39: //arrow right
                if(!cheackoutOfBounds()){
                    posXPlayer += 10;
                    player.style.left = posXPlayer + 'px';
                }
                cheackIfFoodIsEaten();
                break;
            case 40: //arrow down
                if (!cheackoutOfBounds()){
                    posYPlayer += 10;
                    player.style.top = posYPlayer + 'px';
                }
                cheackIfFoodIsEaten();
                break;
        }
    }
    }


    function aiMove(){
        if(aiStartHunting){
        if(posYPlayer < posYAi){
            posYAi -= 10;
        } 
        if (posYPlayer > posYAi){
            posYAi += 10;
        }
        if (posXPlayer < posXAi){
            posXAi -= 10;
        } 
        if (posXPlayer > posXAi) {
            posXAi += 10;
        }
    }
        ai.style.left = posXAi + 'px';
        ai.style.top = posYAi + 'px';
        if(playerAlive){
            cheackIfPlayerIsEaten();
        }
    }

    function generateFood(){
        foodX = Math.random() * (400 - 20);
        foodY = Math.random() * (400 - 20);

        food.style.left = foodX + 'px';
        food.style.top = foodY + 'px';
    }

    function cheackIfPlayerIsEaten(){
        if(posXPlayer >= posXAi - 10 && posXPlayer <= posXAi + 10 && posYPlayer >= posYAi - 10 && posYPlayer <= posYAi + 10 ){
            aiStartHunting = false;
            refreashAiMoveSpeed(aiSpeed);
            playerAlive = false;
            console.log("Player is eaten");

        }
    }

    function cheackIfFoodIsEaten(){
        if(posXPlayer >= foodX - 10 && posXPlayer <= foodX + 10 && posYPlayer >= foodY - 10 && posYPlayer <= foodY + 10 ){
            generateFood();
            score++;
            aiSpeed -= 50;
            scoreBoard.innerHTML = score;
            if (aiStartHunting == false){
                aiStartHunting = true;
            }
            refreashAiMoveSpeed(aiSpeed);
        }
    }
    
    function cheackoutOfBounds(){
        if(boardLeft == posXPlayer){
            posXPlayer += 10;
            player.style.left = posXPlayer + 'px';
            return true
        } 

        if(boardRight == posXPlayer + 10){
            posXPlayer -= 10;
            player.style.left = posXPlayer + 'px';
            return true;
        }

        if(boardTop == posYPlayer){
            posYPlayer += 10;
            player.style.top = posYPlayer + 'px';
            return true;
        }

        if (boardBottom == posYPlayer + 10){
            posYPlayer -= 10;
            player.style.top = posYPlayer + 'px';
            return true;
        }

        return false;
    }

    function startNewGame(){
        aiStartHunting = false;
        playerAlive = true;

        //Ai speed reset
        aiSpeed = 600;
        for (let i = 0; i <= aiMoveIntervals.length; i++){
            console.log(aiMoveIntervals[i]); 
            clearInterval(i);
            //blir arrayen tømt vil farten gå opp per restart
        }
        
        //position reset
        generateFood();
        posXAi = 200;
        posYAi = 200;
        posXPlayer = 20;
        posYPlayer = 20;
        player.style.top = posYPlayer + "px";
        player.style.left = posXPlayer + "px";
        ai.style.top = posYAi + "px";
        ai.style.left = posXAi + "px";

        //score reset
        score = 0;
        scoreBoard.innerHTML = score;
    }

}