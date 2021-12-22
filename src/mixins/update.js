export const UpdateMixin = {
  name: 'UpdateMixin',

  methods: {
    isUpdateExist() {
      return window.app.isUpdateExist('is-update-exist', this.rootPath)
    }
  }
}