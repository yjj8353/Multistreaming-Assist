export const ElectronMixin = {
  name: 'ElectronMixin',

  methods: {
    openDialog() {
      return window.app.openDialog()
    }
  }
}