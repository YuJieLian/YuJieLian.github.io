var body = document.body;
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
// 设置画布宽高为视口的宽高
var canvasWidth = canvas.width = window.innerWidth,
    canvasHeight = canvas.height = window.innerHeight;

// var canvasPlane = document.createElement('canvas');
// canvasPlane.width = CONFIG.planeSzie.width;
// canvasPlane.height = CONFIG.planeSzie.height;
// canvasPlane.style.cssText = 'position:absolute;z-index:999;';
// document.body.appendChild(canvasPlane);
// var ctxPlane = canvasPlane.getContext('2d');

// 兼容定义requestAnimationFram
var requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var touchstart = isPC() ? 'mousedown' : 'touchstart',
    touchmove = isPC() ? 'mousemove' : 'touchmove',
    touchend = isPC() ? 'mouseup' : 'touchend';

function $(dom) {
    var list = dom.indexOf(',') && dom.indexOf(' ') === -1 ?
        document.querySelector(dom) : document.querySelectorAll(dom)[0];
    return list;
}

//判断是否是PC
function isPC() {
    var device = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
    var userAgentInfo = navigator.userAgent;
    var flag = true;
    for (var i = 0, len = device.length; i < len; i++) {
        if (userAgentInfo.match(device[i])) {
            // console.log(device[i]);
            flag = false;
            break;
        }
    }
    return flag;
}

// 阻止浏览器默认事件
function stopDefault(e) {
    var e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
var off = true,
    end = false;
// 为首页按钮绑定事件
function bindBtn() {
    var self = this;
    // 绑定开始按钮
    $('.ui-index .start').addEventListener(touchend, function() {
        body.setAttribute('data-page', '');
        // 开始游戏
        GAME.start();
    }, false);
    // 绑定游戏设置按钮
    $('.ui-index .setting').addEventListener(touchend, function() {
        body.setAttribute('data-page', 'ui-setting');
    }, false);
    // 绑定确认设置按钮
    $('.ui-setting .confirm').addEventListener(touchend, function() {
        GAME.setting();
        body.setAttribute('data-page', 'ui-index');
    }, false);
    // 绑定游戏说明按钮
    $('.ui-index .rule').addEventListener(touchend, function() {
        body.setAttribute('data-page', 'ui-rule');
    }, false);
    // 绑定我明白了按钮
    $('.ui-rule .clear').addEventListener(touchend, function() {
        body.setAttribute('data-page', 'ui-index');
    }, false);
    // 再来一局
    $('.ui-end .new-game').addEventListener(touchend, function() {
        body.setAttribute('data-page', '');
        GAME.init();
        GAME.start();
    }, false);
    // 返回主界面
    $('.ui-end .return-index').addEventListener(touchend, function() {
        body.setAttribute('data-page', 'ui-index');
    }, false);
    //为每个按钮添加音效
    var button = document.querySelectorAll('button');
    Array.prototype.forEach.call(button, function(item) {
        item.addEventListener(touchend, function() {
            GAME.play('audio.button', false);
        });
    });

}


// 游戏对象
var GAME = {
    /**
     * 游戏初始化
     * @param  {[type]} opts [description]
     * @return {[type]}      [description]
     */
    init: function(opts) {
        // 初始化配置
        var opts = Object.assign({}, opts, CONFIG);
        this.opts = opts;

        //设置飞机初始坐标
        this.planeX = canvasWidth / 2 - opts.planeSzie.width / 2;
        this.planeY = canvasHeight - opts.planeSzie.height - opts.planeSzie.height / 2;

        this.setParameter = {
            // off: true,
            bg: [
                { src: './img/bg_1.jpg' },
                { src: './img/bg_2.jpg' },
                { src: './img/bg_3.jpg' },
                { src: './img/bg_4.jpg' }
            ],
            plane: [
                { src: resourceHelp.getImage(opts.planeType) },
                { src: resourceHelp.getImage('pinkPlaneIcon') }
            ]
        };

        // 载入BGM
        GAME.play('audio.music', true);

        //创建玩家飞机
        this.plane = new Plane({
            x: this.planeX,
            y: this.planeY,
            width: opts.planeSzie.width,
            height: opts.planeSzie.height,
            icon: resourceHelp.getImage(opts.planeType),
            score: '0000000',
            bulletSize: opts.bulletSzie,
            bulletSpeed: opts.bulletSpeed,
            bulletIcon: resourceHelp.getImage('enemyFireIcon'),
            boomIcon: resourceHelp.getImage('enemyBigBoomIcon')
        });
    },
    /**
     * 游戏设置
     * @param {[type]} select [description]
     */
    setting: function(target, select) {
        var setParameter = this.setParameter;

        // 选项索引
        var indexSound = $('.ui-setting select.sound').selectedIndex,
            indexBg = $('.ui-setting select.bg').selectedIndex,
            indexPlane = $('.ui-setting select.plane').selectedIndex;

        // 选择的值
        var bg = setParameter.bg[indexBg].src,
            planeIcon = setParameter.plane[indexPlane].src;

        // 设置背景
        $('body').style.backgroundImage = 'url(' + bg + ')';
        // 飞机类型
        this.plane.icon = planeIcon;
        // 关闭BGM
        if (indexSound === 1) {
            this.pause();
            off = false;
        } else {
            off = true;
            GAME.play('audio.music', true);
        }

    },
    /**
     * 播放声音
     * @param  {[type]} name [description]
     * @param  {[type]} loop [description]
     * @return {[type]}      [description]
     */
    play: function(name, loop) {
        var setParameter = this.setParameter;
        if (off) {
            $(name).loop = loop;
            $(name).play();
        }
        // console.log(setParameter.off);
    },
    /**
     * 关闭声音
     * @return {[type]} [description]
     */
    pause: function() {
        var audio = document.getElementsByTagName('audio')
        Array.prototype.forEach.call(audio, function(item, i) {
            item.pause();
        });
    },
    /**
     * 生成敌人
     * @param  {[type]} enemyType [description]
     * @return {[type]}           [description]
     */
    createEnemy: function(enemyType) {
        var opts = this.opts,
            points = this.points,
            images = this.images || {},
            enemySize = opts.enemySmallSize,
            enemySpeed = opts.enemySpeed,
            enemyLive = 1,
            enemyScore = 100,
            emenyIcon = resourceHelp.getImage('enemySamllIcon'),
            emenyBoomIcon = resourceHelp.getImage('enemySamllBoomIcon');

        // console.log(emenyIcon)

        // 大型敌机
        if (enemyType === 'big') {
            enemySize = opts.enemyBigSize;
            enemySpeed = opts.enemySpeed * 0.6;
            enemyLive = 10;
            enemyScore = 1000;
            emenyIcon = resourceHelp.getImage('enemyBigIcon');
            emenyBoomIcon = resourceHelp.getImage('enemyBigBoomIcon');
        }

        //综合参数
        var initOpt = {
            x: Math.floor(Math.random() * (canvasWidth - enemySize.width)),
            y: -enemySize.height,
            speed: enemySpeed,
            live: enemyLive,
            score: enemyScore,
            width: enemySize.width,
            height: enemySize.height,
            icon: emenyIcon,
            boomIcon: emenyBoomIcon
        }
        //敌人数量没到上限则增加
        if (points.length < opts.enemyMaxNum) {
            points.push(new Emeny(initOpt));
        }
        // console.log(points)
    },
    // 开始游戏
    start: function() {
        var self = this,
            opts = this.opts;
        // 清空敌人、分数为0
        this.points = [],
            score = 0;

        //创建敌人
        this.createEnemySmall = setInterval(function() {
            self.createEnemy('small');
        }, 500);
        this.createEnemyBig = setInterval(function() {
            self.createEnemy('big');
        }, 1500);

        //生成子弹
        this.plane.setShoot();

        // 更新游戏
        this.update();

        // 控制飞机
        this.bindTouch();
    },
    update: function() {
        var self = this;
        var opts = this.opts;
        // 更新飞机、敌人
        this.updateElement();

        //清理画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (this.plane.status === 'blast') {
            this.end();
            return;
        }

        //绘制画布
        this.draw();

        //更新敌人
        requestAnimFrame(function() {
            self.update();
        });
    },
    /**
     * 更新元素当前的状态
     * @return {[type]} [description]
     */
    updateElement: function() {
        var opts = this.opts,
            pointArr = this.points,
            plane = this.plane,
            i = pointArr.length,
            play = this.play;

        //游戏结束
        if (plane.status === 'booming') {
            plane.booming();
            return;
        }

        // 判断每一帧敌人、玩家飞机的状态
        while (i--) {
            var point = pointArr[i];
            point.down();
            // 敌人超出边界则删除
            if (point.y >= canvasHeight) {
                pointArr.splice(i, 1);
            } else {
                // 如果飞机和敌人碰撞则爆炸
                if (plane.status === 'normal') {
                    if (plane.hasImpact(point)) {
                        plane.booming();
                        // 爆炸音效
                        play('audio.die', false);
                    }
                }
                // 敌人状态
                switch (point.status) {
                    case 'normal':
                        // 如果子弹命中敌人则减少生命
                        if (plane.isAttack(point)) {
                            point.live -= 1;
                            if (point.live === 0) {
                                point.booming();
                            }
                        }
                        break;
                    case 'booming':
                        // 爆炸残留动画                       
                        point.booming();
                        break;
                    case 'blast':
                        // 爆炸音效、计分、删除敌人
                        play('audio.boom', false);
                        plane.setScore(point);
                        pointArr.splice(i, 1);
                        break;
                }
            }
        }
    },
    //绑定触摸方法
    bindTouch: function() {
        var opts = this.opts,
            self = this,
            plane = self.plane;

        // 飞机最大和最小坐标
        var planeMinX = 0,
            planeMinY = 0,
            planeMaxX = canvasWidth - plane.width,
            planeMaxY = canvasHeight - plane.height;
        // 手指起始位置
        var startTouchX,
            startTouchY;
        // 飞机起始位置
        var startPlaneX,
            startPlaneY;

        // 手指停止的位置
        var endTouchX,
            endTouchY;

        var impact = false;

        // canvasPlane.style.left = plane.x + 'px';
        // canvasPlane.style.top = plane.y + 'px';
        // ctxPlane.drawImage(plane.icon, 0, 0, plane.width, plane.height);

        // 首次触屏
        $('#game').addEventListener(touchstart, function(e) {
            var e = e || window.event;
            // 手指开始的位置
            if (isPC()) {
                startTouchX = e.clientX;
                startTouchY = e.clientY;
            } else {
                startTouchX = e.touches[0].clientX;
                startTouchY = e.touches[0].clientY;
            }
            // console.log(startTouchX + ' ' + startTouchY)

            startPlaneX = plane.x;
            startPlaneY = plane.y;

            // 手指是否碰到飞机
            if (plane.x < startTouchX &&
                plane.y < startTouchY &&
                plane.x + plane.width > startTouchX &&
                plane.y + plane.height > startTouchY) {
                //碰撞成功
                impact = true;
            }

            // 滑动屏幕
            $('#game').addEventListener(touchmove, function(e) {
                var e = e || window.event;
                // 手指停止的位置
                if (isPC()) {
                    endTouchX = e.clientX;
                    endTouchY = e.clientY;
                } else {
                    endTouchX = e.touches[0].clientX;
                    endTouchY = e.touches[0].clientY;
                }

                // 新的飞机位置等于飞机初始位置+手指滑动距离
                var newPlaneX = startPlaneX + endTouchX - startTouchX,
                    newPlaneY = startPlaneY + endTouchY - startTouchY;

                // 判断飞机是否超出边界
                if (newPlaneY < planeMinY) {
                    newPlaneY = planeMinY;
                }
                if (newPlaneY > planeMaxY) {
                    newPlaneY = planeMaxY;
                }
                if (newPlaneX < planeMinX) {
                    newPlaneX = planeMinX;
                }
                if (newPlaneX > planeMaxX) {
                    newPlaneX = planeMaxX;
                }
                // console.log('x:' + newPlaneX + ' y:' + newPlaneY);

                // 设置飞机的位置
                if (impact) {
                    self.plane.setPosition(newPlaneX, newPlaneY);
                }

                // 阻止默认事件
                stopDefault(e);
                // console.log(self.plane.x)
                // self.plane.drawPlane();
            });

            //手指离开屏幕
            $('#game').addEventListener(touchend, function() {
                impact = false;
            });

        });
    },
    draw: function() {
        //绘制敌人
        this.points.forEach(function(item) {
            item.draw();
        });

        var plane = this.plane;
        // // 绘制玩家飞机
        plane.drawPlane();
        // 绘制飞机子弹
        plane.drawBullet();
        // 绘制玩家分数
        plane.drawScore();
    },
    // 游戏结束
    end: function(end) {
        //清除敌人
        clearInterval(this.createEnemySmall);
        clearInterval(this.createEnemyBig);

        // 再来一局 or 返回首页
        body.setAttribute('data-page', 'ui-end');

        // console.log('end')
    }
};
// 绑定页面主入口
function init() {
    // 加载图片资源后交互
    resourceHelp.load(CONFIG.resources, function() {
        //开始游戏
        GAME.init();
        bindBtn();
    });
}
init();