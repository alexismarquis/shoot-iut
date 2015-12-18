


GameStates.GameEnd = function (game) {

};





GameStates.GameEnd.prototype = {
	init: function(score) {
		this.score = score;
	},

    create: function () {

        this.add.sprite(490, 300, 'textInput');


    	this.input.keyboard.addCallbacks(this, null, null, this.keyPress);




        menuButton = this.add.button(300, 650, 'backButton', function() {
        	this.postScore();
            this.state.start('MainMenu');
        }, this, 1, 0, 2);
        replayButton = this.add.button(700, 650, 'replayButton', function() {
        	this.postScore().then(function() {
            	this.state.start('Game');
        	});
        }, this, 1, 0, 2);

        this.name = "";


        var scoreText = this.add.text(this.world.centerX, 200, this.score, {
            font: "42px SaranaiGame",
            fill: "#66c8ff"
        });
        scoreText.anchor.x = .5;

        this.nameText = this.add.text(520, 325, "_", {
            font: "36px SaranaiGame",
            fill: "#f4a222"
        });


    },

    keyPress: function(char) {

    	if(this.name.length < 10) {

	        if( (char < "A" || char > "Z") && (char < 'a' || char > 'z') && (char < '0' || char > '9') )
	        {
	            return;
	        }
	        
	        this.name += char;

	        var text = this.name;
	        if(text.length < 10) text += '_';

            this.nameText.setText(text);

	    }
    },

    postScore: function() {
    	return $.post('http://localhost:8888/shoot-iut-server/score', {
            name: this.name,
            score: this.score
        }, function(response) {

        }, 'json');
    }

};