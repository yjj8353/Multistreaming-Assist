export const MapperMixin = {
  name: 'MapperMixin',

  computed: {

    /**********************************************************************************************************
     * component_control
     **********************************************************************************************************
     * 변수명              | 자료형  | get | set | 설명
     **********************************************************************************************************
     * openNginxStatusAlert       | boolean |  O  |  O  | NginxStatusAlert 컴포넌트를 제어하기 위한 변수
     * openNginxStillRunningAlert | boolean |  O  |  O  | NginxStillRunningAlert 컴포넌트를 제어하기 위한 변수
     * openPathErrorAlert         | boolean |  O  |  O  | PathErrorAlert 컴포넌트를 제어하기 위한 변수
     * openUpdateAlert            | boolean |  O  |  O  | UpdateAlert 컴포넌트를 제어하기 위한 변수
     **********************************************************************************************************/
    openNginxStatusAlert: {
      get() { return this.getOpenNginxStatusAlert },
      set(value) { this.setOpenNginxStatusAlert(value) }
    },

    openNginxStillRunningAlert: {
      get() { return this.getOpenNginxStillRunningAlert },
      set(value) { this.setOpenNginxStillRunningAlert(value) }
    },

    openPathErrorAlert: {
      get() { return this.getOpenPathErrorAlert },
      set(value) { this.setOpenPathErrorAlert(value) }
    },

    openUpdateAlert: {
      get() { return this.getOpenUpdateAlert },
      set(value) { this.setOpenUpdateAlert(value) }
    },
    
    /**********************************************************************************************************
     * key
     **********************************************************************************************************
     * 변수명            | 자료형 | get | set | 설명
     **********************************************************************************************************
     * twitchKey         | string |  O  |  O  | twitch rtmp key 값
     * youtubeKey        | string |  O  |  O  | youtube rtmp key 값
     * additionalRTMPUrl | string |  O  |  O  | 추가적인 rtmp url 주소
     * additionalRTMPKey | string |  O  |  O  | 추가적인 rtmp key 값
     * fullTwitchUrl     | string |  O  |  X  | twitch url + key인 full 주소 
     * fullYoutubeUrl    | string |  O  |  X  | youtube url + key인 full 주소
     * fullAdditionalUrl | string |  O  |  X  | 추가적인 rtmp url + key인 full 주소
     **********************************************************************************************************/
    twitchKey: {
      get() { return this.getTwitchKey },
      set(value) { this.setTwitchKey(value) }
    },

    youtubeKey: {
      get() { return this.getYoutubeKey },
      set(value) { this.setYoutubeKey(value) }
    },

    additionalRTMPUrl: {
      get() { return this.getAdditionalRTMPUrl },
      set(value) { this.setAdditionalRTMPUrl(value) }
    },

    additionalRTMPKey: {
      get() { return this.getAdditionalRTMPKey },
      set(value) { this.setAdditionalRTMPKey(value) }
    },

    fullTwitchUrl: {
      get() { return this.getFullTwitchUrl }
    },

    fullYoutubeUrl: {
      get() { return this.getFullYoutubeUrl }
    },

    fullAdditionalUrl: {
      get() { return this.getFullAdditionalUrl }
    },

    /**********************************************************************************************************
     * nginx
     **********************************************************************************************************
     * 변수명              | 자료형  | get | set | 설명
     **********************************************************************************************************
     * isNginxRunning      | boolean |  O  |  O  | 현재 nginx.exe 프로세스의 실행 여부
     * isNginxStillRunning | boolean |  O  |  O  | NginxStillRunningAlert 컴포넌트를 제어하기 위한 변수
     **********************************************************************************************************/
    isNginxRunning: {
      get() { return this.getIsNginxRunning },
      set(value) { this.setIsNginxRunning(value) }
    },

    isNginxStillRunning: {
      get() { return this.getIsNginxStillRunning },
      set(value) { this.setIsNginxStillRunning(value) }
    },

    /**********************************************************************************************************
     * option
     **********************************************************************************************************
     * 변수명              | 자료형  | get | set | 설명
     **********************************************************************************************************
     * isUpdatePopupEnable | boolean |  O  |  O  | 업데이트 확인 팝업 사용 여부
     **********************************************************************************************************/
    isUpdatePopupEnable: {
      get() { return this.getIsUpdatePopupEnable },
      set(value) { this.setIsUpdatePopupEnable(value) }
    },

    /**********************************************************************************************************
     * path
     **********************************************************************************************************
     * 변수명        | 자료형 | get | set | 설명
     **********************************************************************************************************
     * dirname       | string |  O  |  X  | node.js의 __dirname 경로
     * rootPath      | string |  O  |  O  | 프로그램의 root 디렉토리의 경로
     * nginxPath     | string |  O  |  O  | nginx.exe가 있는 디렉토리의 경로
     * nginxConfPath | string |  O  |  O  | nginx 설정 폴더가 있는 디렉토리의 경로
     * nginxLogsPath | string |  O  |  O  | nginx 로그 폴더가 있는 디렉토리의 경로
     * recordingPath | string |  O  |  O  | 녹화 영상이 저장되는 디렉토리의 경로
     **********************************************************************************************************/
    dirname: {
      get() { return this.getDirname }
    },

    rootPath: {
      get() { return this.getRootPath },
      set(value) { this.setRootPath(value) }
    },

    nginxPath: {
      get() { return this.getNginxPath },
      set(value) { this.setNginxPath(value) }
    },

    nginxConfPath: {
      get() { return this.getNginxConfPath },
      set(value) { this.setNginxConfPath(value) }
    },

    nginxLogsPath: {
      get() { return this.getNginxLogsPath },
      set(value) { this.setNginxLogsPath(value) }
    },

    recordingPath: {
      get() { return this.getRecordingPath },
      set(value) { this.setRecordingPath(value) }
    },

    /**********************************************************************************************************
     * toggle_switch
     **********************************************************************************************************
     * 변수명       | 자료형  | get | set | 설명
     **********************************************************************************************************
     * twitchOn     | boolean |  O  |  O  | twitch 송출 여부
     * youtubeOn    | boolean |  O  |  O  | youtube 송출 여부
     * additionalOn | boolean |  O  |  O  | 추가적인 RTMP 송출 여부
     * recordOn     | boolean |  O  |  O  | 녹화 여부
     **********************************************************************************************************/
    twitchOn: {
      get() { return this.getTwitchOn },
      set(value) { this.setTwitchOn(value) }
    },

    youtubeOn: {
      get() { return this.getYoutubeOn },
      set(value) { this.setYoutubeOn(value) }
    },

    additionalOn: {
      get() { return this.getAdditionalOn },
      set(value) { this.setAdditionalOn(value) }
    },

    recordingOn: {
      get() { return this.getRecordingOn },
      set(value) { this.setRecordingOn(value) }
    }
  }
}
