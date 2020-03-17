const fs = require('fs');

async function makeNginxConfigFile(twitch, youtube, additionalRTMP) {
    var additionalRTMP;

    var key = {
        twitch: twitch.trim(),
        youtube: youtube.trim()
    }

    const result = await checkKey(key);
    console.log(result);
    
    if(!(result.twitch && result.youtube)) {
        var message = [];
        if(!result.twitch) {
            message.push("Twitch RTMP Key가 ");
        }
        if(!result.youtube) {
            message.push("Youtube RTMP Key가 ");
        }
        message.push("올바르지 않습니다");
        message.join();

        alert(message);
        return;
    }

    // twitch 키 확인
    if(twitch == "") {
        var fullTwitch = "";
    } else {
        var fullTwitch = "push rtmp://live-sel.twitch.tv/app/" + twitch.trim() + ";";
    }

    // youtube 키 확인
    if(youtube == "") {
        var fullYoutube = "";
    } else {
        var fullYoutube = "push rtmp://a.rtmp.youtube.com/live2/" + youtube.trim() + ";";
    }

    // 추가 RTMP 서버 및 키 확인
    if(additionalRTMP == "/") {
        this.additionalRTMP = "";
    } else {
        this.additionalRTMP = "push " + additionalRTMP.trim() + ";";
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
        alert('nginx.conf 파일 생성 완료');
    });
} 