/**
 * 子类射击目标对象
 * @param {[type]} opts [description]
 */
var Emeny = function(opts) {
    var opts = opts || {};
    // 调用父类方法
    Element.call(this, opts);

    // 特有属性和方法
    this.status = 'normal';
    this.icon = opts.icon;
    this.boomIcon = opts.boomIcon;
    this.live = opts.live;
    this.score=opts.score;
    this.boomCount=0;
};

//继承父类Element
Emeny.prototype = new Element();

/**
 * 向下移动一个身位
 * @return {[type]} [description]
 */
Emeny.prototype.down = function() {
    this.move(0, this.speed);
};

/**
 * 爆炸中
 * @return {[type]} [description]
 */
Emeny.prototype.booming=function(){
    //设置敌人状态为booming
    this.status='booming';
    this.boomCount+=1;
    //如果booming了5次，则设置为blast
    if(this.boomCount>4){
        this.status='blast';
    }
}

/**
 * 绘制敌人
 * @return {[type]} [description]
 */
Emeny.prototype.draw = function() {
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.fillStyle = '#000';
    switch (this.status) {
        case 'normal':
            ctx.drawImage(this.icon, this.x, this.y, this.width, this.height);
            break;
        case 'booming':
            ctx.drawImage(this.boomIcon, this.x, this.y, this.width, this.height);
            break;
    }
    // ctx.fill();
};