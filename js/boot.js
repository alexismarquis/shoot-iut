var GameStates = {};

GameStates.Boot = function (game) {

};

GameStates.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 1;

        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;


            this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;


    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('background', 'images/background.png');
        this.load.image('loadingBar', 'images/loading-bar.png');
        this.load.image('loadingBackground', 'images/loading-background.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};