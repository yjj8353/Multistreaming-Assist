function checkKey(key) {
    console.log('checkKey 시작');
    return new Promise(async function(resolve, result) {
        if(key.twitch == "") {
            var twitchResult = {
                checkLength: true,
                checkPattern: true
            }
        } else {
            var twitchResult = await checkTwitchKey(key.twitch);
        }

        if(key.youtube == "") {
            var youtubeResult = {
                checkLength: true,
                checkPattern: true
            }
        } else {
            var youtubeResult = await checkYoutubeKey(key.youtube);
        }
    
        const checkResult = {
            twitch: twitchResult,
            youtube: youtubeResult
        }
    
        resolve(checkResult);
    }.bind(key));
}

function checkTwitchKey(twitchKey) {
    console.log(twitchKey);
    console.log('checkTwitchKey 시작');
    return new Promise(async function(resolve, result) {
        const testLength = [twitchKey, 44];
        const twitchResult = {
            checkLength:  await checkLength(testLength),
            checkPattern: await checkTwitchKeyPattern(twitchKey)
        }

        resolve(twitchResult);
    }.bind(twitchKey));
}

function checkYoutubeKey(youtubeKey) {
    console.log('checkYoutubeKey 시작');
    return new Promise(async function(resolve, result) {
        const testLength = [youtubeKey, 19];
        const youtubeResult = {
            checkLength:  await checkLength(testLength),
            checkPattern: await checkYoutubeKeyPattern(youtubeKey)
        }

        resolve(youtubeResult);
    }.bind(youtubeKey));
}

function checkLength(testLength) {
    console.log('checkLength 시작');
    return new Promise(function(resolve, result) {
        console.log(testLength[0]);
        console.log(testLength[1]);
        if(testLength[0].length == testLength[1]) {
            resolve(true);
        } else {
            resolve(false);
        }
    }.bind(testLength));
}

function checkTwitchKeyPattern(twitchKey) {
    console.log('checkTwitchPattern 시작');
    return new Promise(function(resolve, result) {
        const re = new RegExp('^live_[0-9]{8}_[a-zA-Z0-9]{30}$');
        resolve(re.test(twitchKey));
    }.bind(twitchKey));
}

function checkYoutubeKeyPattern(youtubeKey) {
    console.log('checkYoutubePattern 시작');
    return new Promise(function(resolve, result) {
        const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$');
        resolve(re.test(youtubeKey));
    }.bind(youtubeKey));
}
