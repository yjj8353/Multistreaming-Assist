export function checkKey (keys) {
  return new Promise(async function (resolve, reject) {
    const twitchKeyCheckResult = keys.twitch ? await checkTwitchKeyPattern(keys.twitch) : true
    const youtubeKeyCheckResult = keys.youtube ? await checkYoutubeKeyPattern(keys.youtube) : true

    function checkTwitchKeyPattern (twitch) {
      return new Promise(function (resolve, reject) {
        const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
        resolve(re.test(twitch))
      }.bind(twitch))
    }
    
    function checkYoutubeKeyPattern (youtube) {
      return new Promise(function(resolve, reject) {
        const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$')
        resolve(re.test(youtube))
      }.bind(youtube))
    }

    const results = {
      twitch: twitchKeyCheckResult,
      youtube: youtubeKeyCheckResult
    }

    resolve(results)
  }.bind(keys))
}

export function makeNginxConfFile (twitch, youtube, additionalRTMP) {
  const config = 'worker_processes auto;\n' +
                 '\n' +
                 'error_log logs/error.log error;\n' +
                 '\n' +
                 'events {\n' +
                 '    worker_connections 1024;\n' +
                 '}\n' +
                 '\n' +
                 'rtmp {\n' +
                 '    server {\n' +
                 '        listen 1935;\n' +
                 '        chunk_size 4096;\n' +
                 '\n' +
                 '        application live {\n' +
                 '            live on;\n' +
                 '            record off;\n' +
                 '\n' +
                 '            ' + twitch + '\n' +
                 '            ' + youtube + '\n' +
                 '            ' + additionalRTMP + '\n' +
                 '        }\n' +
                 '    }\n' +
                 '}\n' +
                 '\n'

  return config
}
