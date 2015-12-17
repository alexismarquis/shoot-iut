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
        this.add.sprite(250, 100, 'logo');
        campagneButton = this.add.button(100, 650, 'campagneButton', function() {
            this.state.start('Game');
        }, this, 1, 0, 2);
        arcadeButton = this.add.button(500, 650, 'arcadeButton', function() {
            this.state.start('Game');
        }, this, 1, 0, 2);
        optionsButton = this.add.button(900, 650, 'optionsButton', function() {
            this.state.start('Settings');
        }, this, 1, 0, 2);

    },

    update: function () {

        
    }

};

