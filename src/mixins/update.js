export const UpdateMixin = {
  name: 'UpdateMixin',

  methods: {
    isUpdateExist() {
      window.app.isUpdateExist('program-version', this.rootPath)
    }
  }
}