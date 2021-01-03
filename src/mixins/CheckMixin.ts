/*
 * 확인/검증 관련 기능
 */

import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export class CheckMixin extends Vue {
  checkIncludeKoreanOnPath = function(path: string): boolean {
    const re = new RegExp('[ㄱ-ㅎ|ㅏ-ㅑ|가-힣]')
    return !(re.test(path))
  }

  checkTwitchKeyPattern(key: string): boolean {
    const re = new RegExp('^live_[0-9]*_[a-zA-Z0-9]{30}$')
    return re.test(key)
  }

  checkYoutubeKeyPatter(key: string): boolean {
    const re = new RegExp('^[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}(-[a-z0-9]{4})?$')
    return re.test(key)
  }
}
