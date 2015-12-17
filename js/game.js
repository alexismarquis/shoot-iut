GameStates.Game = function (game) {
	this.weapons = [];
	this.currentWeapon = 0;
};



GameStates.Game.prototype = {
    preload: function() {
      this.time.advancedTiming = true;
    },

	create: function () {
		this.loadLevel(Level.space);


	    this.setupAudio();
	    this.setupPlayer();
	    this.setupEnemies();
	    this.setupBullets();
	    this.setupExplosions();
	    this.setupInterface();



        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);

        var changeKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        changeKey.onDown.add(this.nextWeapon, this);


        this.character = {
        	maxHealth: 100,
        	health: 100,
        	displayedHealth: 100,
        	maxEnergy: 1000,
        	energy: 1000,
        	ghostUntil: null,
        	alive: function() {
        		return this.health > 0;
        	},
        	addHealth: function(amount) {
        		this.health += amount;
        		if(this.health > this.maxHealth) this.health = this.maxHealth;
        	},
        	removeHealth: function(amount) {
        		this.health -= amount;
		        if(this.health < 0) this.health = 0;
        	},
        	removeEnergy: function() {
        		this.energy -= 3;
        		if(this.energy < 0) this.energy = 0;
        	},
        	addEnergy: function() {
        		this.energy += 1;
        		if(this.energy > this.maxEnergy) this.energy = this.maxEnergy;
        	}
        }

        this.score = 0;

        /*this.filter = this.add.filter('Fire', 800, 600);
		this.filter.alpha = 0.0;

		this.filter.update();
		this.background.filters = [this.filter];*/

    },



	update: function () {

	    this.checkCollisions();
	    this.spawnEnemies();
	    //this.enemyShoot();
	    this.handleInput();
	    this.updateInterface();
	    this.delayedEffects();
	},


    render: function() {
        this.fpsText.setText(this.time.fps + ' FPS');

    },


    delayedEffects: function() {

    	if(this.character.health > this.character.displayedHealth) {
    		this.character.displayedHealth++;
    	} else if(this.character.health < this.character.displayedHealth) {
    		this.character.displayedHealth--;
    	}
    },

	setupExplosions: function () {
		this.explosionPool = this.add.group();
		this.explosionPool.enableBody = true;
		this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.explosionPool.createMultiple(100, 'explosion');
		this.explosionPool.setAll('anchor.x', 0.5);
		this.explosionPool.setAll('anchor.y', 0.5);
		this.explosionPool.forEach(function (explosion) {
			explosion.animations.add('boom');
		});
	},

    setupEnemies: function() {
	 	this.enemyPool = this.add.group();
	    this.enemyPool.enableBody = true;
	    this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
	    this.enemyPool.createMultiple(50, 'enemy.soucoupe');
	    this.enemyPool.setAll('anchor.x', 0);
	    this.enemyPool.setAll('anchor.y', 0.5);
	    this.enemyPool.setAll('outOfBoundsKill', true);
	    this.enemyPool.setAll('checkWorldBounds', true);
	    this.enemyPool.setAll('reward', 100, false, false, 0, true);
	    this.enemyPool.setAll('dropRate', 0.3, false, false, 0, true);
	 
	  
	    this.nextEnemyAt = 0;
	    this.enemyDelay = 3000;
	    this.enemyInitialHealth = 3;

    },

	spawnEnemies: function() {
	    if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
	       this.nextEnemyAt = this.time.now + this.enemyDelay;
	       var enemy = this.enemyPool.getFirstExists(false);
	       enemy.reset(1280, this.rnd.integerInRange(80, 720), this.enemyInitialHealth);
	       enemy.body.velocity.x = -this.rnd.integerInRange(30, 60);
	     }

    
	},

    setupBullets: function() {

    },

    setupPlayer: function() {

        this.weapons.push(new Weapon.SingleBullet(this.game));

        this.currentWeapon = 0;

        for (var i = 1; i < this.weapons.length; i++)
        {
            this.weapons[i].visible = false;
        }

        this.player = this.add.sprite(80, 80, 'player');
        this.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.gravity.y = 800;
    },

    setupAudio: function() {
    	var volume = localStorage.getItem('volume');

		this.sound = this.add.audio('laser');
		this.sound.volume = volume; // To improve

		var intro = this.add.audio('music.intro');
		intro.volume = volume;

		var loop = this.add.audio('music.loop');
		loop.loop = true;
		loop.volume = volume;

		intro.onStop.add(function(sound) {
			loop.play();
		}, this);

		intro.play();
    },

    setupInterface: function() {

        this.add.sprite(50, 25, 'health.bg');
        this.healthBar = this.add.sprite(118, 45, 'health.bar');


		this.barWidth = this.healthBar.width;

        this.add.sprite(375, 25, 'energy.bg');
        this.energyBar = this.add.sprite(443, 45, 'energy.bar');

        
        this.add.sprite(700, 25, 'ammo');
        this.add.sprite(900, 25, 'score');

        style = {
            font: "24px SaranaiGame",
            fill: "#f4a222"
        }
        
        this.ammoText = this.add.text(790, 50, "0", style);
        this.scoreText = this.add.text(990, 50, "0", style);
        this.fpsText = this.add.text(1150, 45, "-- FPS", { fill: "#FFF"});
    },



	nextWeapon: function () {

		//  Tidy-up the current weapon
		if (this.currentWeapon > 9)
		{
			this.weapons[this.currentWeapon].reset();
		}
		else
		{
			this.weapons[this.currentWeapon].visible = false;
			this.weapons[this.currentWeapon].callAll('reset', null, 0, 0);
			this.weapons[this.currentWeapon].setAll('exists', false);
		}

		// Activate the new one
		this.currentWeapon++;

		if (this.currentWeapon === this.weapons.length)
		{
			this.currentWeapon = 0;
		}

		this.weapons[this.currentWeapon].visible = true;

	},

	enemyShoot: function() {
		// TODO
		this.shooterPool.forEachAlive(function (enemy) {
	       if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0) {
	         var bullet = this.enemyBulletPool.getFirstExists(false);
	         bullet.reset(enemy.x, enemy.y);
	         this.physics.arcade.moveToObject(bullet, this.player, 150);
	         enemy.nextShotAt = this.time.now + this.shooterShotDelay;
	       }
	     }, this);
	    
	     
	},

	handleInput: function() {
		cursors = this.input.keyboard.createCursorKeys();

		if (cursors.left.isDown)
		{
			this.player.body.gravity.x = -1000;
		}
		else if (cursors.right.isDown)
		{
			this.player.body.gravity.x = 1000;
		}
		else {
			this.player.body.gravity.x = 0;
			this.player.body.velocity.x = this.player.body.velocity.x / 1.1;
		}

		if (cursors.up.isDown  && this.player.worldPosition.y > 40)
		{
			if (this.player.body.velocity.y > -600) {
				this.player.body.gravity.y = -2000;
			}
			else {
				this.player.body.gravity.y = 0;
			}
		}
		else if (cursors.down.isDown && this.player.worldPosition.y < 560)
		{
			if (this.player.body.velocity.y < 600) {
				this.player.body.gravity.y = 2000;
			}
			else {
				this.player.body.gravity.y = 0;
			}
		}
		else {
			if (this.player.body.velocity.y > 150) {
				this.player.body.gravity.y = -2000;
			}
			else if (this.player.body.velocity.y > 90) {
				this.player.body.gravity.y = -300;
			}
			if (this.player.body.velocity.y < -150) {
				this.player.body.gravity.y = 2000;
			}
			else if (this.player.body.velocity.y < -90) {
				this.player.body.gravity.y = 300;
			}
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {

			//this.game.paused = true;

		}


		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
		{
			if(this.character.energy > 0) {
				if(this.weapons[this.currentWeapon].fire(this.player)) this.sound.play();

				this.character.removeEnergy();
			}
			
		} else {

			this.character.addEnergy();
		}
	},

	updateInterface: function() {
        this.ammoText.setText(0);

        this.healthBar.crop(new Phaser.Rectangle(0, 0, (this.character.displayedHealth / this.character.maxHealth) * this.barWidth, this.healthBar.height));
        this.energyBar.crop(new Phaser.Rectangle(0, 0, (this.character.energy / this.character.maxEnergy) * this.barWidth, this.energyBar.height));


	},

	addToScore: function(score) {
     	this.score += score;
        this.scoreText.setText(this.score);

	},
	
	damageEnemy: function (enemy, damage) {		
	 enemy.damage(damage);

	 if (enemy.alive) {
	   
	    var sprite = this.add.sprite(0, 0, 'shield');
		this.physics.arcade.enable(sprite);
		sprite.reset(enemy.x, enemy.y);
		sprite.anchor.setTo(0.5, 0.5);
		sprite.alpha = 0;
		sprite.body.velocity.x = enemy.body.velocity.x;
		sprite.body.velocity.y = enemy.body.velocity.y;
	    this.add.tween(sprite).to( { alpha: 1 }, 200, null, true, 0, 0, true).onComplete.add(function(){
	    	sprite.destroy();
	    });;

	   //enemy.play('hit');
	 } else {
	 	enemy.kill();
	    this.explode(enemy);
	    this.addToScore(enemy.reward);
	 }
	},

	checkCollisions: function () {
		// Collision tirs avec enemies
		

		this.physics.arcade.overlap(
			this.weapons[this.currentWeapon], this.enemyPool, this.enemyHit, null, this
		);

		// Collision joueur avec enemies
		this.physics.arcade.overlap(
			this.player, this.enemyPool, this.playerHit, null, this
		);

/*
		// Collision joeur avec tirs enemies
		this.physics.arcade.overlap(
			this.player, this.enemyBulletPool, this.playerHit, null, this
		);

		// Collision joueur avec bonus
		this.physics.arcade.overlap(
			this.player, this.powerUpPool, this.playerPowerUp, null, this
		);

	*/
	},

	enemyHit: function(bullet, enemy) {
		bullet.kill();
	    this.damageEnemy(enemy, 1);
	},

  playerHit: function (player, enemy) {
  	if (!this.character.ghostUntil || this.character.ghostUntil < this.time.now) {
  		console.log(this.character.ghostUntil - this.time.now);

	    this.damageEnemy(enemy, 5);
	    this.character.removeHealth(10);

	    if (this.character.alive()) {
	      this.character.ghostUntil = this.time.now + 3000;

	      //this.player.play('ghost');
	    } else {
	      this.explode(player);
	      player.kill();
	      //this.displayEnd(false);
	      alert('dead');
	    }
	} 
  },

  explode: function (sprite) {
     if (this.explosionPool.countDead() === 0) {
       return;
     }
     var explosion = this.explosionPool.getFirstExists(false);
     explosion.reset(sprite.x + sprite.width/2, sprite.y);
     explosion.play('boom', 45, false, true);
     // add the original sprite's velocity to the explosion
     explosion.body.velocity.x = sprite.body.velocity.x;
     explosion.body.velocity.y = sprite.body.velocity.y;
  },


  loadLevel: function(level) {
	this.background = this.add.sprite(0, 0, level.background);
  }

};
