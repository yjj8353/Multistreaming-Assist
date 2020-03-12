// url 마지막에 슬래시(/)가 있는 경우 잘라냄
function findLastSlash(url) {
    let re = new RegExp('/$');
    
    let find = re.exec(url.trim());
    if(find) {
        url = url.slice(0, -1);
    }

    return url;
}

// url 시작부분에 슬래시(/)가 있는 경우 잘라냄
function findFirstSlash(url) {
    let re = new RegExp('^/');
    
    let find = re.exec(url.trim());
    if(find) {
        url = url.slice(1, url.length);
    }

    return url
}