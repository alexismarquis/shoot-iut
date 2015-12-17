GameStates.Settings = function (game) {

};

GameStates.Settings.prototype = {



    create: function () {

        var background = this.add.sprite(0, 0, 'background');

        this.blurX = this.add.filter('BlurX');
        this.blurY = this.add.filter('BlurY');

        background.filters = [this.blurX, this.blurY];


        var settings = this.add.sprite(this.world.centerX, this.world.centerY - 50, 'settingsWindow');
        settings.anchor.setTo(.5, .5);

        this.blur = 0;

        this.add.button(500, 650, 'backButton', function() {
            this.state.start('MainMenu',true, false);
        }, this, 1, 0, 2);


        style = {
            font: "24px SaranaiGame",
            fill: "#66c8ff"
        }
        
        this.add.text(425, 300, "Musique", style);

        this.add.text(425, 400, "Plein ecran", style);

        this.switchBtn = this.add.button(650, 380, 'switch', function() {
            if (this.scale.isFullScreen)
            {
                this.scale.stopFullScreen();
            }
            else
            {
                this.scale.startFullScreen(false);
            }

        }, this, 0);

        this.bar = this.add.sprite(580, 297, 'slider.bg');
        this.progressBar = this.add.sprite(592, 307, 'slider.bar');
        this.btn = this.add.sprite(600, 286, 'slider.btn');
        this.btn.inputEnabled = true;
        this.btn.input.enableDrag();
        this.btn.input.allowVerticalDrag = false;



    },

    update: function () {

        if(this.blur < 10) {
            this.blurY.blur = this.blur;
            this.blurX.blur = this.blur;

            this.blur += .5;        
        }

        this.switchBtn.frame = this.scale.isFullScreen?1:0;

        var width = this.bar.width - this.btn.width;


        if(this.btn.x - this.bar.x <= 0) {
            this.btn.x = this.bar.x;
        }
        else if(this.btn.x - this.bar.x >= width){
            this.btn.x = this.bar.x + width;
        }

        var progress = (this.btn.x - this.bar.x) / (width);

        this.progressBar.crop(new Phaser.Rectangle(0, 0, progress * width, this.progressBar.height));


    }

};

