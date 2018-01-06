// 游戏相关配置
var CONFIG = {
    //飞机大小
    planeSzie: {
        width: 60,
        height: 45
    },
    planeType: 'bluePlaneIcon', // 飞机类型
    // 子弹大小
    bulletSzie: {
        width: 20,
        height: 20
    },
    bulletSpeed: 10, // 子弹移速
    enemyMaxNum: 5, // 敌人数量
    enemySpeed: 2, // 敌人移速
    // 大型敌人大小
    enemySmallSize: {
        width: 54,
        height: 40
    },
    // 小型敌人大小
    enemyBigSize: {
        width: 86,
        height: 66
    },
    // 资源
    resources: {
        images: [{
                name: 'bluePlaneIcon',
                src: './img/plane_1.png'
            },
            {
                name: 'pinkPlaneIcon',
                src: './img/plane_2.png'
            },
            {
                name: 'enemyBigIcon',
                src: './img/enemy_big.png'
            },
            {
                name: 'enemySamllIcon',
                src: './img/enemy_small.png'
            },
            {
                name: 'enemySamllBoomIcon',
                src: './img/boom_small.png'
            },
            {
                name: 'enemyBigBoomIcon',
                src: './img/boom_big.png'
            },
            {
                name: 'enemyFireIcon',
                src: './img/fire.png'
            },
            { name: 0, src: './img/bg_1.jpg' },
            { name: 1, src: './img/bg_2.jpg' },
            { name: 2, src: './img/bg_3.jpg' },
            { name: 3, src: './img/bg_4.jpg' }
        ],
        sounds: [{
                name: 'biubiubiu',
                src: './music/biubiubiu.mp3'
            },
            {
                name: 'boom',
                src: './music/boom.mp3'
            },
            {
                name: 'button',
                src: './music/button.mp3'
            },
            {
                name: 'die',
                src: './music/die.mp3'
            },
            {
                name: 'music',
                src: './music/music.mp3'
            }
        ]
    }
};