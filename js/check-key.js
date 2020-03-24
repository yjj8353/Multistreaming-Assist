exports.checkKey = function(key) {
    console.log('checkKey 시작');
    return new Promise(async function(resolve, result) {
        if(key.twitch == "") {
            var twitchResult = true
        } else {
            var twitchResult = await checkTwitchKeyPattern(key.twitch)
        }

        if(key.youtube == "") {
            var youtubeResult = true
        } else {
            var youtubeResult = await checkYoutubeKeyPattern(key.youtube)
        }

        const checkResult = {
            twitch: twitchResult,
            youtube: youtubeResult
        }

        resolve(checkResult);
    }.bind(key));
}

exports.checkTwitchKeyPattern = function(twitchKey) {
    console.log('checkTwitchPattern 시작');
    return new Promise(function(resolve, result) {
        const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$');
        resolve(re.test(twitchKey));
    }.bind(twitchKey));
}

exports.checkYoutubeKeyPattern = function(youtubeKey) {
    console.log('checkYoutubePattern 시작');
    return new Promise(function(resolve, result) {
        const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$');
        resolve(re.test(youtubeKey));
    }.bind(youtubeKey));
}
