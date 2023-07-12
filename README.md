[![SemApps](https://badgen.net/badge/Powered%20by/SemApps/28CDFB)](https://semapps.org)

# Oasis

SemApps instance for the [Coopérative Oasis](https://cooperative-oasis.org)

## Getting started

### Triple store

Launch the [Jena Fuseki](https://jena.apache.org/documentation/fuseki2/) triplestore on port 3030:

```bash
docker-compose up -d fuseki
```

### Middleware

Launch the middleware on port 3000:

```bash
cd middleware
yarn install
yarn run dev
```

> This will launch Moleculer in [REPL mode](https://moleculer.services/docs/0.14/moleculer-repl.html), allowing you to call actions directly.


### Initialize the data

Run these commands on Moleculer [REPL](https://moleculer.services/docs/0.14/moleculer-repl.html):

```bash
call importers.types.freshImport
call initialization.createAdmin --email youremail@domain.com
call webacl.resource.refreshContainersRights
```

The second commands will send an email to the given address. This will allow you to set a password and connect to the backoffice.


### Backoffice

Launch the backoffice on port 4000:

```bash
cd backoffice
yarn install
yarn start
```


### Frontoffice

Launch the frontoffice on port 5000:

```bash
cd frontoffice
yarn install
yarn start
```


## Linking to SemApps packages

To modify packages on the [SemApps repository](https://github.com/assemblee-virtuelle/semapps) and see the changes before they are published, we recommend to use [`yarn link`](https://classic.yarnpkg.com/en/docs/cli/link/).

### Linking middleware packages

```bash
cd /SEMAPPS_REPO/src/middleware
yarn run link-all
cd /OASIS_REPO/middleware
yarn run link-semapps-packages
```

### Linking frontend packages

```bash
cd /SEMAPPS_REPO/src/frontend
yarn run link-all
cd /OASIS_REPO/backoffice
yarn run link-semapps-packages
cd /OASIS_REPO/frontoffice
yarn run link-semapps-packages
```

Additionally, frontend packages need to be rebuilt, or your changes will not be taken into account. 
You can use `yarn run build` to build a package once, or `yarn run dev` to rebuild a package on every change.
