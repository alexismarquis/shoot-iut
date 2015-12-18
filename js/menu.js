GameStates.MainMenu = function (game) {

};

GameStates.MainMenu.prototype = {

    init: function(animation) {
        if(animation) {
            this.animation = true;
        }
        else {
            this.animation = false;
        }
    },

    create: function () {
        var background = this.add.sprite(0, 0, 'background');

        if(this.animation) {            
            background.alpha = 0;
            var fade = this.add.tween(background).to( { alpha: 1 }, 1000, null, true).onComplete.add(this.showMenu, this);
        } else {
            this.showMenu();
        }



    },

    showMenu: function () {

        var music = this.add.audio('music.menu');
        music.volume = localStorage.getItem('volume');
        music.loop = true;
        music.play();


        this.add.sprite(50, 140, 'logo');
        this.add.sprite(800, 100, 'scoreboard');


        campagneButton = this.add.button(100, 650, 'campagneButton', function() {
            //music.stop();
            //this.state.start('Game');
        }, this, 3, 3, 3);

        arcadeButton = this.add.button(500, 650, 'arcadeButton', function() {
            music.stop();
            this.state.start('Game');
        }, this, 1, 0, 2);
        optionsButton = this.add.button(900, 650, 'optionsButton', function() {
            music.stop();
            this.state.start('Settings');
        }, this, 1, 0, 2);


        var style = {
            font: "24px SaranaiGame",
            fill: "#f4a222"
        }
        
        var game = this;

        $.getJSON("http://localhost:8888/shoot-iut-server/scores", function(data) {
            data.data.forEach(function(item, i) {
                var y = 165 + i * 78;

                game.add.text(830, y, i+1 + ')', style);
                game.add.text(880, y, item.name, style);
                var score = game.add.text(1180, y, item.score, style);
                score.anchor.x = 1;
            });
        });


    },

    update: function () {

        
    }

};

