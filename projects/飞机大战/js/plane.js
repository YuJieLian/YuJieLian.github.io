var Plane = function(opts) {
    //调用父类构造方法
    Element.call(this, opts);

    // 特有属性和方法
    this.icon = opts.icon;
    this.boomIcon = opts.boomIcon;
    this.status = 'normal';
    this.score = opts.score,
        //子弹相关
        this.bullets = [];
    this.planeType = opts.planeType;
    // this.planeSzie = opts.planeSzie;
    this.bulletSize = opts.bulletSize;
    this.bulletSpeed = opts.bulletSpeed;
    this.bulletIcon = opts.bulletIcon;
    this.boomCount = 0;
}

//继承父类Element
Plane.prototype = new Element();

/**
 * 判断飞机是否碰撞敌人
 * @param  {[type]}  target [description]
 * @return {Boolean}        [description]
 */
Plane.prototype.hasImpact = function(target) {
    var impact = false;
    //判断是否碰撞
    if ((this.x + this.width > target.x &&
            this.y > target.y &&
            this.x < target.x + target.width &&
            this.y < target.y + target.height) ||
        (this.x + this.width > target.x &&
            this.y + this.width > target.y &&
            this.x < target.x + target.width &&
            this.y + this.width < target.y + target.height)) {
        //碰撞成功
        impact = true;
    }
    return impact;
}

/**
 * 判断子弹是否击中当前元素
 * @param  {[type]} target [description]
 * @return {[type]}        [description]
 */
Plane.prototype.isAttack = function(target) {
    var bullets = this.bullets,
        impact = false;
    for (var i = bullets.length - 1; i >= 0; i--) {
        // 如果子弹击中敌人，则子弹消失
        if (bullets[i].hasImpact(target)) {
            bullets.splice(i, 1);
            impact = true;
            break;
        }
    };
    return impact;
}

/**
 * 绘制玩家飞机
 * @return {[type]} [description]
 */
Plane.prototype.drawPlane = function() {
    switch (this.status) {
        case 'normal':
            ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
            break;
        case 'booming':
            ctx.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
            break;
    }
}

/**
 * 修改飞机当前位置
 * @param {[type]} x [description]
 * @param {[type]} y [description]
 */
Plane.prototype.setPosition = function(plaenX, plaenY) {
    this.x = plaenX;
    this.y = plaenY;
    return this;
}

/**
 * 飞机爆炸中
 * @return {Boolean} [description]
 */
Plane.prototype.booming = function() {
    this.status = 'booming';
    this.boomCount += 1;
    if (this.boomCount > 10) {
        this.status = 'blast';
        clearInterval(this.shortInterval);
    }

}

/**
 * 生成子弹
 */
Plane.prototype.setShoot = function() {
    var self = this,
        bulletWidth = this.bulletSize.width,
        bulletHeight = this.bulletSize.height;
    //定时发射子弹
    this.shortInterval = setInterval(function() {
        // 子弹居中射出
        var bulletX = self.x + bulletWidth,
            bulletY = self.y;
        //创建子弹
        self.bullets.push(new Bullet({
            x: bulletX,
            y: bulletY,
            width: bulletWidth,
            height: bulletHeight,
            speed: self.bulletSpeed,
            icon: self.bulletIcon
        }));
    }, 200);
}

/**
 * 计算飞机得分
 */
Plane.prototype.setScore = function(target) {
    var score = this.score;
    score = parseInt(score, 10);
    score += target.score;
    score = score.toString();
    var i = 0;
    while (score.length < 7) {
        score = '0' + score;
        i++;
    }
    this.score = score;
}

/**
 * 显示得分
 * [setScore description]
 * @param {[type]} target [description]
 */
Plane.prototype.drawScore = function(target) {
    ctx.font = '20px arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(this.score, canvas.width - 80, 20);
}

/**
 * 绘制子弹
 * @return {[type]} [description]
 */
Plane.prototype.drawBullet = function() {
    var bullets = this.bullets,
        i = bullets.length;
    while (i--) {
        var bullet = bullets[i];
        bullet.fly();
        if (bullet.y <= 0) {
            // 超出边界则删除
            bullets.splice(i, 1);
        } else {
            // 否则绘制子弹
            bullet.draw();
            //攻击音效
            GAME.play('audio.biubiubiu', false);
        }
    }
}