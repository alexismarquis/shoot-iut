GameStates.Preloader = function (game) {



};

GameStates.Preloader.prototype = {

    preload: function () {


        this.add.sprite(350, 300, 'loadingBackground');
        this.preloadBar = this.add.sprite(350, 300, 'loadingBar');

        //    This sets the preloadBar sprite as a loader sprite.
        //    What that does is automatically crop the sprite from 0 to full-width
        //    as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        this.load.script('gray', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Gray.js');
        this.load.script('filterX', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurX.js');
        this.load.script('filterY', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/BlurY.js');
        this.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/filters/Fire.js');


        this.load.image('logo', 'images/logo.png');
        this.load.image('settingsWindow', 'images/windows/settings_background.png');
        this.load.spritesheet('campagneButton', 'images/buttons/campagne.png', 300, 64);
        this.load.spritesheet('arcadeButton', 'images/buttons/arcade.png', 300, 64);
        this.load.spritesheet('optionsButton', 'images/buttons/options.png', 300, 64);
        this.load.spritesheet('backButton', 'images/buttons/back.png', 300, 64);


        this.load.spritesheet('switch', 'images/settings/switch.png', 126, 64);
        this.load.spritesheet('explosion', 'images/explosion.png', 256, 256);


        this.load.spritesheet('player', 'images/player.png', 136, 213);
		this.load.image('bullet', 'images/laser.png');
        this.load.image('enemy.avion', 'images/enemies/avion.png');
        this.load.image('enemy.soucoupe', 'images/enemies/soucoupe.png');
        this.load.image('shield', 'images/shield.png');

        this.load.image('health.bg', 'images/game/health-bg.png');
        this.load.image('health.bar', 'images/game/health-bar.png');
        this.load.image('energy.bg', 'images/game/energy-bg.png');
        this.load.image('energy.bar', 'images/game/energy-bar.png');



        this.load.image('slider.bg', 'images/settings/slider-bg.png');
        this.load.image('slider.bar', 'images/settings/slider-bar.png');
        this.load.image('slider.btn', 'images/settings/slider-btn.png');

        this.load.image('score', 'images/game/score.png');
        this.load.image('ammo', 'images/game/ammo.png');

        this.load.audio('explosion', 'sounds/explosion.wav');
        this.load.audio('laser', 'sounds/laser.wav');
        this.load.audio('music.intro', 'sounds/music-intro.wav');
        this.load.audio('music.loop', 'sounds/music-loop.wav');
        this.load.audio('music.menu', 'sounds/music-menu.wav');

    },

    create: function () {

        //    Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;

    },

    update: function () {

        this.state.start('MainMenu', true, false, true);


    }

};
