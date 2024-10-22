module.exports = {
  content: [
    './views/**/*.handlebars', // Inclua os arquivos Handlebars aqui
    './src/**/*.{html,js}',           // Inclua seus arquivos HTML e JS (se houver)
  ],
  theme: {
    extend: {
      backgroundImage: {
        "home": "url('/imagens/capa/bg.png')"
      }
    },
  },
  plugins: [],
}
