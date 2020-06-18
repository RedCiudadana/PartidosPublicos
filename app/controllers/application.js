import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  links = [
    {
      text: '¿Qué es?',
      route: 'index',
      model: null
    },
    {
      text: 'Partidos Politicos',
      route: 'perfiles',
      model: 'partidos'
    },
    {
      text: 'Comparar Partidos',
      route: 'index',
      model: null
    },
    {
      text: 'Índice',
      route: 'index',
      model: null
    },
  ]
}
