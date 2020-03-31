module.exports = function() {
  this.nuxt.hook('build:extendRoutes', routes => {
    routes.unshift({
      name: 'page-id',
      path: '/page/:id?',
      component: 'pages/index.vue'
    })
  })
 }
