    /*控制轮播图按钮的切换，响应式*/
    $(function () {
//        自动播放
        $("#myCarousel").carousel({
//            自动4秒播放
            interval:4000,
        });
//        设置垂直居中
        $(".carousel-control").css("line-height", $(".carousel-inner img").height()+'px');
        $(window).resize(function () {
            var $height=$(".carousel-inner img").eq(0).height()||
                $(".carousel-inner img").eq(1).height()||
                $(".carousel-inner img").eq(2).height()||
                $(".carousel-inner img").eq(3).height()||
                $(".carousel-inner img").eq(4).height();
            $(".carousel-control").css("line-height", $height+"px");
        });

    /*hover遮罩层事件*/
        $(function(){
            $(".top1").hover(function(){
                $(".top1").stop().animate({"margin-top":"-60px"},500);
                $(".top1 .sp1 span").css({"opacity":"0.2"});

            },function(){
                $(".top1").stop().animate({"margin-top":"0px"},500);
                $(".top1 .sp1 span ").css({"opacity":"1"})
            });
        });
        $(function(){
            $(".top2").hover(function(){
                $(".top2").stop().animate({"margin-top":"-60px"},500);
                $(".top2 .sp1 span").css({"opacity":"0.2"});

            },function(){
                $(".top2").stop().animate({"margin-top":"0px"},500);
                $(".top2 .sp1 span ").css({"opacity":"1"})
            });
        });
        $(function(){
            $(".top3").hover(function(){
                $(".top3").stop().animate({"margin-top":"-60px"},500);
                $(".top3 .sp1 span").css({"opacity":"0.2"});

            },function(){
                $(".top3").stop().animate({"margin-top":"0px"},500);
                $(".top3 .sp1 span ").css({"opacity":"1"})
            });
        });
        $(function(){
            $(".top4").hover(function(){
                $(".top4").stop().animate({"margin-top":"-60px"},500);
                $(".top4 .sp1 span").css({"opacity":"0.2"});

            },function(){
                $(".top4").stop().animate({"margin-top":"0px"},500);
                $(".top4 .sp1 span ").css({"opacity":"1"})
            });
        });

    });
   /*加载更多*/
 $(document).ready(function(){
  $(".btn").click(function(){
  $("#sw").show();
  });
    $(".btn").click(function(){
  $("#he").hide();
  });
});