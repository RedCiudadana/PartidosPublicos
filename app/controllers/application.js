import Controller from '@ember/controller';

export default class ApplicationController extends Controller {
  links = [
    {
      text: '¿Qué es?',
      route: 'quees',
      model: null
    },
    {
      text: 'Partidos Politicos',
      route: 'perfiles',
      model: 'partidos'
    },
    {
      text: 'Comparar Partidos',
      route: 'comparar',
      model: null
    },
    {
      text: 'Índice',
      route: 'indice',
      model: null
    },
  ]
}
