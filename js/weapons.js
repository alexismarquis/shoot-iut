var Bullet = function (game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

	this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	this.anchor.set(0.5);

	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
	this.exists = false;

	this.tracking = false;
	this.scaleSpeed = 0;

	this.damage = 1;
};


Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, angle, speed, gx, gy) {

	gx = gx || 0;
	gy = gy || 0;

	this.reset(x, y);
	this.scale.set(1);

	this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

	this.angle = angle;

	this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function () {

	if (this.tracking)
	{
		this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	}

	if (this.scaleSpeed > 0)
	{
		this.scale.x += this.scaleSpeed;
		this.scale.y += this.scaleSpeed;
	}

};
var Weapon = {};

Weapon.SingleBullet = function (game) {

	Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 600;
	this.fireRate = 110;

	for (var i = 0; i < 64; i++)
	{
		this.add(new Bullet(game, 'bullet'), true);
	}


	return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) { return; }


	var x = source.x + 115;
	var y = source.y + 80;

	this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

	this.nextFire = this.game.time.time + this.fireRate;

	return true;
};


/* Missile */

var Missile = function (game, key) {

	Phaser.Sprite.call(this, game, 0, 0, key);

	//this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

	this.anchor.set(0.5);

	this.checkWorldBounds = true;
	this.outOfBoundsKill = true;
	this.exists = false;

	this.tracking = true;
	this.scaleSpeed = 0;

	this.damage = 3;

};

Missile.prototype = Object.create(Phaser.Sprite.prototype);
Missile.prototype.constructor = Bullet;

Missile.prototype.fire = function (x, y, angle, speed, gx, gy) {

	gx = gx || 0;
	gy = gy || 0;

	this.reset(x, y);
	this.scale.set(1);

	this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

	this.angle = angle;

	this.body.gravity.set(gx, gy);

};

Missile.prototype.update = function () {

	if (this.tracking)
	{
		this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	}

	if(this.angle >= 20) {
		this.body.gravity.y = -60;
		this.body.gravity.x = 800;
	}

	if (this.scaleSpeed > 0)
	{
		this.scale.x += this.scaleSpeed;
		this.scale.y += this.scaleSpeed;
	}

};


Weapon.Missile = function (game) {

	Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

	this.nextFire = 0;
	this.bulletSpeed = 400;
	this.fireRate = 1000;

	for (var i = 0; i < 64; i++)
	{
		this.add(new Missile(game, 'rocket'), true);
	}


	return this;

};

Weapon.Missile.prototype = Object.create(Phaser.Group.prototype);
Weapon.Missile.prototype.constructor = Weapon.Missile;

Weapon.Missile.prototype.fire = function (source) {

	if (this.game.time.time < this.nextFire) { return; }


	var x = source.x + 60;
	var y = source.y + 30;

	this.getFirstExists(false).fire(x, y, -45, this.bulletSpeed, 0, 500);

	this.nextFire = this.game.time.time + this.fireRate;

	return true;
};
