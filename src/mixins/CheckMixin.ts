/*
 * 확인/검증 관련 기능
 */

import { StoreMixin } from 'src/mixins/StoreMixin'
import Component, { mixins } from 'vue-class-component'

@Component
export class CheckMixin extends mixins(StoreMixin) {
  checkIncludeKoreanOnPath = function(path: string): boolean {
    const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
    return re.test(path)
  }

  checkTwitchKeyPattern(key: string): boolean {
    const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
    return re.test(key)
  }

  checkYoutubeKeyPattern(key: string): boolean {
    const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}(-[a-z0-9]{4})?$')
    return re.test(key)
  }

  // twitchKey q-input 값이 비는 순간 스위치를 끔
  checkTwitchKeyNull(value: string) {
    if(!value) {
      this.twitchOn = false
    }
  }

  // youtubeKey q-input 값이 비는 순간 스위치를 끔
  checkYoutubeKeyNull(value: string) {
    if(!value) {
      this.youtubeOn = false
    }
  }

  // additionalRTMP의 url 혹은 key q-input 값이 비는 순간 스위치를 끔
  checkAddtionalRTMPUrlOrKeyNull(value: string) {
    if(!value) {
      this.additionalOn = false
    }
  }

  checkAllToggleSwitchOff(...toggleSwitchs: Array<boolean>): boolean {
    let result = true

    for(const toggleSwitch of toggleSwitchs) {
      if(toggleSwitch) {
        result = false
        break
      }
    }

    return result
  }
}
