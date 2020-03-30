exports.makeNginxConfigFile = async function(twitch, youtube, additionalRTMP) {
    var additionalRTMP;

    var key = {
        twitch: twitch.trim(),
        youtube: youtube.trim()
    }

    const result = await checkKey(key);
    console.log(result);
    
    if(!(result.twitch && result.youtube)) {
        checkFail(result);
    } else {
        createFile(twitch, youtube, additionalRTMP);
    }
}

function checkFail(result) {
    document.getElementById('twitch-warning').innerHTML = "";
    document.getElementById('youtube-warning').innerHTML = "";

    if(!result.youtube) {
        document.getElementById('youtube-warning').innerHTML = " 주의! youtube 키 값에 문제가 있는 것 같습니다";
        document.getElementById('youtube').focus();
    }
    if(!result.twitch) {
        document.getElementById('twitch-warning').innerHTML = " 주의! twitch 키 값에 문제가 있는 것 같습니다";
        document.getElementById('twitch').focus();
    }
    document.getElementById('nginx-make-alert').setAttribute('class', 'error text-danger');
    document.getElementById('nginx-make-alert').innerHTML = "nginx.conf 생성 실패!";
}

function createFile(twitch, youtube, additionalRTMP) {
    document.getElementById('twitch-warning').innerHTML = "";
    document.getElementById('youtube-warning').innerHTML = "";
    
    // 입력받은 twitch/youtube key값이 공백이면 "" 대입, 값이 있으면 전체주소로 대입
    const fullTwitch  = twitch ? "push rtmp://live-sel.twitch.tv/app/" + twitch.trim() + ";" : "";
    const fullYoutube = youtube ? "push rtmp://a.rtmp.youtube.com/live2/" + youtube.trim() + ";" : "";

    // 추가 RTMP 서버 및 키 확인
    if(additionalRTMP == "/") {
        this.additionalRTMP = "";
    } else {
        this.additionalRTMP = "push " + additionalRTMP.trim() + ";";
    }
    
    var config = "worker_processes auto;\n"
               + "\n"
               + "error_log logs/error.log error;\n"
               + "\n"
               + "events {\n"
               + "    worker_connections 1024;\n"
               + "}\n"
               + "\n"
               + "rtmp {\n"
               + "    server {\n"
               + "        listen 1935;\n"
               + "        chunk_size 4096;\n"
               + "\n"
               + "        application live {\n"
               + "            live on;\n"
               + "            record off;\n"
               + "\n"
               + "            " + fullTwitch + "\n"
               + "            " + fullYoutube + "\n"
               + "            " + this.additionalRTMP + "\n"
               + "        }\n"
               + "    }\n"
               + "}\n"
               + "\n"

    fs.writeFile('./nginx/conf/nginx.conf', config, function (error) {
        if (error) {
            document.getElementById('nginx-make-alert').setAttribute('class', 'text-danger');
            document.getElementById('nginx-make-alert').innerHTML = "nginx.conf 생성 실패! 생성 버튼을 다시 클릭해 주세요!";
        }
        document.getElementById('nginx-make-alert').setAttribute('class', 'text-success');
        document.getElementById('nginx-make-alert').innerHTML = "nginx.conf 생성 완료!";
    });
}