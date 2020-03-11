const fs = require('fs');

function makeNginxConfigFile(twitch, youtube, additionalRTMP) {
    //var twitch  = "live_55712246_jkyuSUDogqydXJCDfZ7SRNGdyocKCx";
    //var youtube = "0p28-k56e-d1pj-awgb";

    var additionalRTMP;

    if(twitch) {
        var fullTwitch = "push rtmp://live-sel.twitch.tv/app/" + twitch.trim() + ";";
    } else {
        var fullTwitch = "";
    }

    if(youtube) {
        var fullYoutube = "push rtmp://a.rtmp.youtube.com/live2/" + youtube.trim() + ";";
    } else {
        var fullYoutube = "";
    }

    if(additionalRTMP) {
        this.additionalRTMP = "push " + additionalRTMP.trim() + ";";
    } else {
        this.additionalRTMP = "";
    }
    
    var config = "worker_processes 1;\n"
               + "\n"
               + "error_log logs/error.log debug;\n"
               + "\n"
               + "events {\n"
               + "    worker_connections 1024;\n"
               + "}\n"
               + "\n"
               + "rtmp {\n"
               + "    server {\n"
               + "        listen 1935;\n"
               + "\n"
               + "        application live {\n"
               + "            live on;\n"
               + "\n"
               + "            " + fullTwitch + "\n"
               + "            " + fullYoutube + "\n"
               + "            " + this.additionalRTMP + "\n"
               + "        }\n"
               + "\n"
               + "        application hls {\n"
               + "            live on;\n"
               + "            hls on;\n"
               + "            hls_path temp/hls;\n"
               + "            hls_fragment 8s;\n"
               + "        }\n"
               + "    }\n"
               + "}\n"
               + "\n"
               + "http {\n"
               + "    server {\n"
               + "        listen 8080;\n"
               + "\n"
               + "        location / {\n"
               + "            root html;\n"
               + "        }\n"
               + "\n"
               + "        location /stat {\n"
               + "            rtmp_stat all;\n"
               + "            rtmp_stat_stylesheet stat.xsl;\n"
               + "        }\n"
               + "\n"
               + "        location /stat.xsl {\n"
               + "            root html;\n"
               + "        }\n"
               + "\n"
               + "        location /hls {\n"
               + "            #server hls fragments\n"
               + "            types{\n"
               + "                application/vnd.apple.mpegurl m3u8;\n"
               + "                video/mp2t ts;\n"
               + "            }\n"
               + "            alias temp/hls;\n"
               + "            expires -1;\n"
               + "        }\n"
               + "    }\n"
               + "}\n"

    fs.writeFile('./nginx/conf/nginx.conf', config, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
    });
} 