export const UpdateMixin = {
  name: 'UpdateMixin',

  methods: {
    isUpdateExist() {
      console.log('실행됨')
      window.app.isUpdateExist('is-update-exist', this.rootPath)
    }
  }
}