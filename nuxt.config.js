require("dotenv").config();
import axios from 'axios'
const { API_KEY } = process.env;
const LIMIT = 5; // 画像の取得枚数

export default {
  mode: 'universal',
  env: {
    API_KEY,
    LIMIT: LIMIT
  },
  /*
  ** Headers of the page
  */
  head: {
    title: '目玉焼き',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '作った目玉焼きを載せています' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Kosugi+Maru&display=swap&text=目玉焼き' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css',
    '@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '~/modules/hook.js',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    postcss: {
      preset: {
        autoprefixer: {
          grid: true
        }
      }
    }
  },
  generate: {
    routes () {
      return axios.get('https://gunkou.microcms.io/api/v1/sunny-side-up', {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }).then((res) => {
        const limit = LIMIT;
        const totalCount = res.data.totalCount;
        const allPages = Math.ceil(totalCount / limit);
        const result = [];
        for (let i = 2; i <= allPages; ++i) {
          result.push(`/page/${i}`);
        }
        return result;
      })
    }
  }
}
