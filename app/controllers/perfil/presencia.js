import Controller from '@ember/controller';

export default class PerfilPresenciaController extends Controller {
  get dataPie() {
    console.log(this.model);
    return {
      labels: [
        'Hombres',
        'Mujeres'
      ],
      datasets: [
        {
          label: 'Genero',
          data: [
            this.model.presencia.AfiliadosHombres,
            this.model.presencia.AfiliadosMujeres
          ],
          backgroundColor: [
            'rgb(67, 188, 166)',
            'rgb(32, 45, 62)'
          ],
        },
      ],
    };
  }
}
