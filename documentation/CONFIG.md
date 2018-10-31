# Configuración de una nueva aplicación

### Configurar `config/environment.js`
#### Google Analytics
Utilizamos Google Analytics por medio de el addon [ember-metrics](https://github.com/poteto/ember-metrics) un servicio que se utiliza en nuestro [`router.js`](https://github.com/RedCiudadana/MiGuatemala/blob/master/app/router.js). Cambiar id por el identificador que provea Google Analytics.
```javascript
...
metricsAdapters: [{
  name: 'GoogleAnalytics',
  environments: ['production', 'development'],
  config: {
    id: 'UA-XXXX-Y',
    // Use verbose tracing of GA events
    trace: environment === 'development',
    // Ensure development env hits aren't sent to GA
    sendHitTask: environment !== 'development',
    // Specify Google Analytics plugins
    // require: ['ecommerce']
  }
}]
...
```
#### Datos
Para utilizar otros datos debemos cambiar las URLs en los archivos [config-spreadsheet-url](https://github.com/RedCiudadana/MiGuatemala/blob/master/public/config-spreadsheet-url) y [data-spreadsheet-url](https://github.com/RedCiudadana/MiGuatemala/blob/master/public/data-spreadsheet-url), que le dice a nuestro programa donde se encuentra los datos. En el caso que 'staticFilesUrl' sea 'null' el servicio [spreadsheets.js](https://github.com/RedCiudadana/MiGuatemala/blob/master/app/services/spreadsheets.js) descargara los datos desde las hojas de datos publicadas, en caso contrario utilizamos la url de `static-files`. **Nota: estos archivo 
tambien son usados por [`build-data.js`](https://github.com/RedCiudadana/MiGuatemala/blob/master/build-data.js) para generar `/static-files/..`**.

```javascript
...
APP: {
  dataSpreadsheetSourceUrl: '/data-spreadsheet-url',
  configSpreadsheetSourceUrl: '/config-spreadsheet-url',

  // Establecer null para recibir datos desde spreadsheet en vivo.
  // En otro caso estrablecer la url de '/static-files/' los archivos descargados.

  // Datos desde spreadsheets en vivo.
  staticFilesUrl: null

  // Datos desde localhost => desarrollo
  // staticFilesUrl: 'http://192.168.250.206:6360/static-files/'
  // staticFilesUrl: 'http://localhost:6360/static-files/'

  // Datos desde gh-pages
  // staticFilesUrl: 'http://eleccioncgc.org/static-files/'
}
...
```
#### Disqus
Configuramos el `shortname` de disqus para los comentarios utilizado con [ember-disqus](https://github.com/sir-dunxalot/ember-disqus).
```javascript
...
disqus: {
  shortname: null
},
...
````
### Configurar `config/deploy.js`
Cambiar `repo` por el nuevo respositorio y `workthreePath` por un nuevo nombre. Generalmente '/tmp/deploy-{app}'.
**Explicación: `workthreeApp` es un directorio temporal que utiliza [ember-cli-deploy-git](https://github.com/ef4/ember-cli-deploy-git) para publicar (deploy) nuestro proyecto en gh-pages. Si no cambiarmos el nombre y trataramos de publicar un proyecto diferente en la misma sesión utilizaria el mismo repositorio para hacer los cambios del otro proyecto y generaria problemas.**
```javascript
...
if (deployTarget === 'production') {
  ENV.build.environment = 'production';

  // configure other plugins for production deploy target here
  ENV.git = {
    repo: 'https://github.com/RedCiudadana/MiGuatemala.git',
    branch: 'gh-pages',
    worktreePath: '/tmp/deploy-miguatemala'
  };
}
...
```
