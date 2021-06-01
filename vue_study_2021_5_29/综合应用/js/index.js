/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
*/
var app = new Vue({
    el:"#player",
    data:{
        //查询关键字
        query:"",
        //歌曲数组
        musicList:[],
        //歌曲地址
        musicUrl:"",
        //歌曲封面
        picUrl:"",
        //歌曲评论
        comment:[],
        //动画播放状态
        isPlaying:false,
        //遮罩层的显示状态
        isShow:false,
        //mv地址
        mvUrl:""
    },
    methods:{
        searchMusic:function (){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
                .then(function (response){
                    //console.log(response);
                    that.musicList = response.data.result.songs;
                },function (err){
                    console.log(response);
                })
        },
        /*
          2:歌曲url获取接口
            请求地址:https://autumnfish.cn/song/url
            请求方法:get
            请求参数:id(歌曲id)
            响应内容:歌曲url地址
        */
        playMusic:function (musicId){
            //console.log(musicId);
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+musicId)
                .then(function (response){
                    //console.log(response);
                    that.musicUrl = response.data.data[0].url;
                },function (err){

                });
            /*
             * 3.歌曲详情获取
                 请求地址:https://autumnfish.cn/song/detail
                 请求方法:get
                 请求参数:ids(歌曲id)
                 响应内容:歌曲详情(包括封面信息)
            * */
            axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
                .then(function (response){
                    //console.log(response);
                    that.picUrl = response.data.songs[0].al.picUrl;
                },function (err){

                });
            /*4.热门评论获取
            请求地址:https://autumnfish.cn/comment/hot?type=0
                请求方法:get
            请求参数:id(歌曲id,地址中的type固定为0)
            响应内容:歌曲的热门评论*/
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
                .then(function (response){
                    //console.log(response);
                    that.comment = response.data.hotComments;
                    //console.log(that.comment);
                },function (err){

                })
        },
        play:function (){
            this.isPlaying = true;
        },
        pause:function (){
            this.isPlaying = false;
        },
        /*
            5.mv地址获取
                请求地址:https://autumnfish.cn/mv/url
                请求方法:get
                请求参数:id(mvid,为0表示没有mv)
                响应内容:mv的地址
        */
        playMv:function (mvid){
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function (response){
                that.isShow = true;
                that.mv = response.data.data.url;
            },function (err){

            })
        },
        //隐藏
        hide:function (){
            this.isShow = false;
        }
    }

})


