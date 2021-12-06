export function openNginxStatusAlert(state, openNginxStatusAlert) {
  state.commit('openNginxStatusAlert', openNginxStatusAlert)
}

export function openNginxStillRunningAlert(state, openNginxStillRunningAlert) {
  state.commit('openNginxStillRunningAlert', openNginxStillRunningAlert)
}

export function openPathErrorAlert(state, openPathErrorAlert) {
  state.commit('openPathErrorAlert', openPathErrorAlert)
}

export function openUpdateAlert(state, openUpdateAlert) {
  state.commit('openUpdateAlert', openUpdateAlert)
}
