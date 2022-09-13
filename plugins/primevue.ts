import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import Menu from 'primevue/menu'
import Panel from 'primevue/panel'
import Card from 'primevue/card'
import Avatar from 'primevue/avatar';
import Image from 'primevue/image'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('Menubar', Menubar)
  nuxtApp.vueApp.component('Menu', Menu)
  nuxtApp.vueApp.component('Panel', Panel)
  nuxtApp.vueApp.component('Card', Card)
  nuxtApp.vueApp.component('Avatar', Avatar)
  nuxtApp.vueApp.component('Image', Image)

  //other components that you need
})
