export async function checkKey (keys) {
    const twitchKeyCheckResult = keys.twitch ? await checkTwitchKeyPattern(keys.twitch) : true
    const youtubeKeyCheckResult = keys.youtube ? await checkYoutubeKeyPattern(keys.youtube) : true

    async function checkTwitchKeyPattern (twitch) {
      const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
      return re.test(twitch)
    }
    
    async function checkYoutubeKeyPattern (youtube) {
      const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}(-[a-z0-9]{4})?$')
      return re.test(youtube)
    }

    const results = {
      twitch: twitchKeyCheckResult,
      youtube: youtubeKeyCheckResult
    }

    return results
}

export async function makeNginxConfFile (twitch, youtube, additionalRTMP) {
  const config = 'worker_processes 1;\n' +
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

export async function makeRTMPJSONFile (twitchKey, youtubeKey, additionalRTMPUrl, additionalRTMPKey) {
  const rtmpJSON = '{\n' +
                   '    "twitch":' + '"' + twitchKey + '",\n' +
                   '    "youtube":' + '"' + youtubeKey + '",\n' +
                   '    "rtmpUrl":' + '"' + additionalRTMPUrl + '",\n' +
                   '    "rtmpKey":' + '"' + additionalRTMPKey + '"\n' +
                   '}'

  return rtmpJSON
}