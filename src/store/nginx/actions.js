export function isNginxRunning(state, isNginxRunning) {
  state.commit('isNginxRunning', isNginxRunning)
}

export function isNginxStillRunning(state, isNginxStillRunning) {
  state.commit('isNginxStillRunning', isNginxStillRunning)
}
