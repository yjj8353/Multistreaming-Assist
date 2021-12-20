import { CheckMixin } from 'src/mixins/check'
import { ConfigMixin } from 'src/mixins/config'
import { ElectronMixin } from 'src/mixins/electron'
import { NginxMixin } from 'src/mixins/nginx'
import { QuasarMixin } from 'src/mixins/quasar'
import { StoreMixin } from 'src/mixins/store'
import { UpdateMixin } from 'src/mixins/update'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default async ({ app, router, store }) => {
  app.mixin(CheckMixin)
  app.mixin(ConfigMixin)
  app.mixin(ElectronMixin)
  app.mixin(NginxMixin)
  app.mixin(QuasarMixin)
  app.mixin(StoreMixin)
  app.mixin(UpdateMixin)
}