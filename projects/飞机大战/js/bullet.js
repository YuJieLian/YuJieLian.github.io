var Bullet = function(opts) {
    //调用父类构造方法
    Element.call(this, opts);

    // 特有属性和方法
    this.icon = opts.icon;
}

//继承父类Element
Bullet.prototype = new Element();

/**
 * 子弹移动
 * @return {[typBullete]} [description]
 */
Bullet.prototype.fly = function() {
    this.move(0, -this.speed);
}

/**
 * 判断是否碰撞
 * @param  {[type]}  target [description]
 * @return {Boolean}        [description]
 */
Bullet.prototype.hasImpact = function(target) {
    var impact = false;
    //判断是否碰撞
    if (this.x + this.width > target.x &&
        this.y > target.y &&
        this.x < target.x + target.width &&
        this.y < target.y + target.height) {
        //碰撞成功
        impact = true;
    }
    return impact;
}

/**
 * 绘制子弹
 * @return {[type]} [description]
 */
Bullet.prototype.draw = function() {
    ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
}