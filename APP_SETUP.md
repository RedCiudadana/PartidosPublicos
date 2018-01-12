# App setup

### Instrucciones para levantar app específica

```bash
git clone https://github.com/{user}/{app}

cd {app}

git commit --allow-empty --message="Initial commit"
```

#### Agregar miguatemala upstream

```bash
git remote add miguatemala https://github.com/RedCiudadana/MiGuatemala.git

git fetch miguatemala

git checkout -b miguatemala-master miguatemala/master
```

#### Merge miguatemala/master

```bash
git checkout master

git merge miguatemala-master --allow-unrelated-histories

git push
```

#### Crear gh-pages branch

```bash
git checkout --orphan gh-pages

git rm -rf .

git commit --allow-empty --message="Initial commit"
```

#### Init and dev

```bash
git checkout master

yarn

bower install
```

Customize `REAMDE.md`, `DATOS.md`, `public/README.md`, `public/CNAME`, `config/deploy.js`,
`.ember-cli`, `config/environment.js`

```bash
Commit and push

ember deploy production
```

Profit :ok_hand:
