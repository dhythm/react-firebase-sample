# Getting started

## To install a new firebase project

```
firebase init hosting
? Please select an option: Create a new project
? Please specify a unique project id (warning: cannot be modified afterward) [6-30 characters]: react-firebase-sample-1225
? What would you like to call your project? (defaults to your project ID) react-firebase-sample-1225

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
```

```
firebase init database
? What file should be used for Database Rules? database.rules.json
```

## To install a new React app

```
npm init -y
yarn add react react-dom
```

```
yarn add -D @babel/core @babel/cli @babel/preset-env @babel/preset-react
touch .babelrc
# modify .babelrc
```

```
yarn add -D webpack webpack-cli webpack-dev-server style-loader css-loader babel-loader url-loader file-loader dotenv-webpack tsconfig-paths-webpack-plugin
touch webpack.config.js
# modify webpack.config.js
```

```
yarn add -D typescript ts-loader typesync
yarn run tsc --init
# modify tsconfig.json
```

```
yarn add -D eslint eslint-plugin-react prettier eslint-config-prettier eslint-plugin-prettier eslint-loader eslint-plugin-import eslint-plugin-unused-imports eslint-plugin-sort-export-all
yarn run eslint --init
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · react
✔ Does your project use TypeScript? · Yes
✔ Where does your code run? · browser
✔ What format do you want your config file to be in? · YAML
✔ Would you like to install them now with npm? · No
yarn add -D eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
touch .prettierrc
# modify .eslintrc.yml and .prettierrc
```

```
# modify package.json for script
yarn install

mkdir src
mkdir -p src/app/{pages,assets,lib}
mkdir -p src/core/{components,assets,lib}
touch src/{index,App}.tsx
touch .env
```

## To deploy the app

```
yarn run build
firebase deploy --only hosting
```

## To install firebase to the React app

```
# Create a firestore database in Firebase Console first
firebase init firestore

? What file should be used for Firestore Rules? firestore.rules
? What file should be used for Firestore indexes? firestore.indexes.json
```

```
yarn add firebase
touch src/app/lib/firebase-config.js
```
