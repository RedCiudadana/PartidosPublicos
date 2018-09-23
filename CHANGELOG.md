# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
- Folder docs

## [0.4.0] - 2018-09-23
### Added
- Added ember-bootstrap, ember-font-awesome, ember-cli-sass.
- Added node-sass to implement with ember-cli-sass.
- Added SASS file mi-guatemala.scss.
- SASS lighten and darken to calculate hover colors.
- Add tabletop to package.json.
- Add front-portfolio component.

### Change
- In application.hbs, the footer and the header are now added with "partial".
- Change test data to 'Congreso' data

### Removed
- Older images.
- Weid css files.


## [0.3.1] - 2018-09-23
### Change
- Rename adapter diputado-comision to comission-deputies.
- Rename adapter perfil to magistrate.
- Rename serializer perfil to magistrate.

## [0.3.0] - 2018-09-22
### Added
- Routes application, index, institucion, perfil, resultados to YUIDoc.

### Removed
- Namespace tag in models. Instead, use DOT in class.

## [0.2.1] - 2018-09-22
### Added
- Addon ember-cli-yuidoc

### Change
- All models to YUIDoc

## [0.2.0] - 2018-09-18
### Added
- Profile, magistrate and commission-deputies models.
- [DockYard Styles](https://github.com/DockYard/styleguides/tree/master/engineering) and [ESDocs](https://esdoc.org/manual/tags.html)  in models.

### Removed
- Removed perfil and diputado-comision models.

### Fixed
- Sematinc versioning

## [0.1.0] - 2018-09-17
### Added
- This CHANGELOG.

### Changed
- Ember 2.16 to 3.3.0.
- Change syntax ember 2.16 to 3.3.
- Comment broken code, sorry about this.
