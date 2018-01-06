/**
 * 资源管理
 * @type {Object}
 */
var resourceHelp = {
    // 加载图片
    imageLoad: function(src, callback) {
        var image = new Image();
        // 图片加载完成
        image.addEventListener('load', callback);
        image.addEventListener('error', function() {
            console.log('image error');
        });
        image.src = src;
        return image;
    },
    // 加载音频
    soundLoad: function(src,className) {
        var audio = new Audio();
        audio.preload='auto';
        audio.controls=false;
        audio.loop=false;
        audio.src = src;
        audio.className=className;
        document.body.appendChild(audio);
        return audio;
    },
    //返回哪张图片
    getImage: function(imageName) {
        return this.resources.images[imageName];
    },
    //资源加载
    load: function(resources, callback) {
        var images = resources.images,
            sounds = resources.sounds,
            imgLen = images.length,
            soundLen = sounds.length,
            finish = 0; //完成的个数

        // 保存加载后的图片对象和声音对象
        this.resources = {
            images: {},
            sounds: {}
        };
        var self = this;

        //遍历加载图片
        for (var i = 0; i < imgLen; i++) {
            var name = images[i].name,
                src = images[i].src;
            self.resources.images[name] = this.imageLoad(src, function() {
                //加载完成
                finish++;
                if (finish === imgLen) {
                    //全部加载完成
                    callback();
                }
            });
            // console.log(self.resources.images[name]);
        }
        //循环加载音频
        while (soundLen--) {
            var name = sounds[soundLen].name,
                src = sounds[soundLen].src;
            self.resources.sounds[name] = this.soundLoad(src,name);
            // console.log(self.resources.sounds[name]);
        }
    }
}