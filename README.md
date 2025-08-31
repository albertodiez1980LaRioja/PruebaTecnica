# PruebaTécnica

Es una pagina de ejemplo de una prueba técnica

## Instalación


Es necesario tener instalada una versión de nodeJS, recomendada la versión 20

```bash
git clone https://github.com/albertodiez1980LaRioja/PruebaTecnica
cd PruebaTecnica
cd back
npm install
cd ..
cd front 
npm install
```

En el archivo .env del back esta configurada la conexión a la base de datos. Hay que modificarla con los datos que se tenga en local

## Iniciar

Hay que arrancar dos terminales

En un terminal

```bash
cd PruebaTecnica
cd back
npm run dev
```

En el otro terminal

```bash
cd PruebaTecnica
cd front
npm start
```



## Testear el back

```bash
cd PruebaTecnica
cd back
npm test
```

## Funcionamiento

Antes hay que iniciar.

Hay que abrir un navegador y poner la dirección http://localhost:4200/. Hay que mandar los archivos excel y poner el nombre y los apellidos.
Si se repite nombre y apellidos se sobreescriben los datos en la tabla de visualización y en la base de datos
