/*
 * Config File 관련기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class ConfigMixin extends Vue {
  async makeNginxConfString(recordOn: boolean, twitchOn: boolean, youtubeOn: boolean, additionalOn: boolean, recordingDir: string, fullTwitchUrl: string, fullYoutubeUrl: string, fullAdditionalRTMPUrl: string): Promise<string> {                                              // recordingDir.length === 0 이거나 recordOn이 false면 녹화를 끔
    const recordOption = recordingDir.length !== 0 && recordOn ? '            record all;\n' +
                                                                 '            record_path "' + recordingDir.replace(/\\/g, '/') + '";\n' +
                                                                 '            record_unique on;' +
                                                                 '            record_suffix .flv;\n' : '            record off;\n'

    const twitchUrl = twitchOn ? fullTwitchUrl : ''
    const youtubeUrl = youtubeOn ? fullYoutubeUrl : ''
    const additionalRTMPUrl = additionalOn ? fullAdditionalRTMPUrl : ''

    const nginxConfig = 'worker_processes 1;\n' +
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
                        '\n' +
                        recordOption +
                        '\n' +
                        '            ' + twitchUrl + '\n' +
                        '            ' + youtubeUrl + '\n' +
                        '            ' + additionalRTMPUrl + '\n' +
                        '        }\n' +
                        '    }\n' +
                        '}\n' +
                        '\n'

    return nginxConfig
  }

  async makeKeyJSONString(twitchKey: string, youtubeKey: string, additionalRTMPUrl: string, additionalRTMPKey: string): Promise<string> {
    const keyJSON = '{\n' +
                    '    "twitch":' + '"' + twitchKey + '",\n' +
                    '    "youtube":' + '"' + youtubeKey + '",\n' +
                    '    "rtmpUrl":' + '"' + additionalRTMPUrl + '",\n' +
                    '    "rtmpKey":' + '"' + additionalRTMPKey + '",\n' +
                    '}'
                    '\n'

    return keyJSON
  }

  async makeOptionJONString(twitchOn: boolean, youtubeOn: boolean, additionalOn: boolean, recordingDir: string, recordOn: boolean, updatePopup: boolean): Promise<string> {
    const optionJSON = '{\n' +
                       '    "twitchOn":' + twitchOn + ',\n' +
                       '    "youtubeOn":' + youtubeOn + ',\n' +
                       '    "additionalOn":' + additionalOn + ',\n' +
                       '\n' +                        // 역슬래시 이스케이프
                       '    "recordingDir":' + '"' + recordingDir.replace(/\\/g, '\\\\') + '",\n' +
                       '\n' +
                       '    "recordOn":' + recordOn + ',\n' +
                       '\n' +
                       '    "updatePopup":' + updatePopup + '\n' +
                       '}' +
                       '\n'

    return optionJSON
  }
}
