# Cortes y materiales

App web instalable (PWA) que calcula cuánto tubo, tablero, chapa, tela o filamento comprar y cómo cortarlos con el mínimo desperdicio. Todo en centímetros.

- **Tubos y perfiles:** corte lineal (barras, tubos, listones) con grosor de disco, saneado de puntas y retales aprovechables.
- **Tableros de madera:** corte en guillotina (sierra circular, de mesa o de panel) con veta por pieza, saneado de cantos y dibujo de cada tablero.
- **Chapa:** el mismo corte en guillotina, con material (acero, galvanizado, inoxidable, aluminio, latón, cobre) y espesor para calcular el peso a comprar y el de las piezas; precio por chapa o por kilo y sentido del laminado por pieza.
- **Tela:** encaje de piezas en el rollo (ancho fijo, largo libre) con margen de costura, encogimiento al lavar, tramos de venta, piezas que siguen el hilo o se pueden girar, y precio por metro.
- **Filamento 3D:** bobinas necesarias a partir de los gramos de cada impresión (del laminador), con purga, bobina empezada, opción de no partir una impresión entre bobinas, metros de filamento y coste por impresión.

- **Resumen:** visión de todo el proyecto: coste total, materiales, piezas y tiendas; cada material con lo que hay que comprar, piezas, aprovechamiento y coste; la compra agrupada por tienda, notas del proyecto y «Copiar resumen».

**Exportar e importar** (ficheros `.json`, desde los paneles o desde el menú):

| Exportar | Qué lleva |
|---|---|
| Un proyecto («Exportar» en Mis proyectos, o «Exportar este proyecto») | El proyecto y los materiales del catálogo que usan sus tipos |
| Todos los proyectos | Todos los proyectos y los materiales que usan |
| Un material («Exportar» en Mis materiales) | Solo esa ficha |
| Todos los materiales | Todo el catálogo |
| Todo | Proyectos y catálogo completo |

«Importar» acepta cualquiera de esos ficheros (y los de versiones anteriores). Los proyectos con un nombre que ya existe se añaden como «(importado)». Los materiales idénticos a uno que ya tienes no se duplican y los tipos importados quedan enlazados a él; si el nombre coincide pero cambian los datos, se añade como «(importado)».

**PDF del proyecto:** «Descargar PDF» (en Resumen y en el menú) monta un documento A4 con el resumen, las notas, la compra por tienda y el despiece de cada tipo (dibujo de cortes y lista), y abre el diálogo del sistema para «Guardar como PDF». El nombre propuesto es el del proyecto.

**Navegación:** las secciones del proyecto (Resumen, Tubos, Tableros, Chapa, Tela, Filamento 3D) son pestañas siempre visibles; en el móvil se deslizan. El menú lateral (☰) es para gestionar: ir al proyecto abierto, «+ Nuevo proyecto», «Mis proyectos», «Mis materiales» e instalar la app. En las pantallas de gestión se ocultan las pestañas y la barra del proyecto.

Funciona sin conexión una vez abierta y se instala en el móvil como una app.

**Proyectos:** cada trabajo (una estantería, una barandilla…) se guarda como proyecto con sus tubos, tableros y chapas. En cada pestaña puede haber varios **tipos** (tubo de 40×40 y de 20×20, melamina y DM, chapa de 1,5 y de 3 mm), cada uno con su material, sus piezas y su plan de corte; la **compra del proyecto** los junta todos, agrupados por tienda, con el coste de cada tienda, el total y los kilos de chapa.

**Mis proyectos:** pantalla propia (menú o botón «Mis proyectos») con buscador (nombre, notas, materiales, tiendas), orden por últimos cambios, nombre, fecha de creación o coste, y una ficha por proyecto con lo que hay que comprar, coste, piezas, tiendas y notas. Desde cada ficha: abrir (va al resumen), renombrar, duplicar, exportar (PDF o archivo .json con sus materiales) o eliminar. Al volver a abrir la app se entra en la última sección de trabajo, nunca en estas pantallas de gestión.

**Mis materiales:** pantalla propia (menú o botón «Mis materiales») con buscador (nombre, material, tienda, referencia, notas), filtro por sección, orden por últimos cambios, nombre, tienda o precio, y una ficha por material con compra, precio y su fecha, tienda, en cuántos proyectos se usa y aviso si el precio tiene más de 3 meses. Desde cada ficha: «Añadir al proyecto», editar, duplicar, exportar o borrar. Catálogo común a todos los proyectos. Cada material tiene una ficha: material (hierro, PVC, melamina…), tipo o forma (tubo cuadrado, ángulo, lagrimada…), sección, espesor, medidas de compra, tienda, referencia, precio (con la fecha en que se anotó) y notas; el nombre se compone solo si no se escribe. Se crea desde «Mis materiales → + Nuevo» o desde un tipo con «Guardar en mis materiales». Al pulsar «+ Otro tipo» se elige del catálogo. Cambiar un precio en el catálogo solo afecta a los tipos que se añadan después; los proyectos ya hechos conservan su precio. «Exportar todos» incluye el catálogo y al importar se añaden los materiales que no existan con el mismo nombre. Se guardan solos en el dispositivo; desde «Mis proyectos» se abren, duplican, eliminan, exportan a un fichero `.json` e importan en otro móvil. No hay servidor: si se borran los datos del navegador, solo se recuperan desde una copia exportada.

## Ficheros

| Fichero | Qué es |
|---|---|
| `index.html` | La app entera (HTML, CSS y JS, sin dependencias) |
| `manifest.webmanifest` | Nombre, icono y colores para instalarla |
| `sw.js` | Modo sin conexión: guarda la app y las fuentes en el dispositivo |
| `icons/` | Iconos (192, 512, adaptable de Android y el de iPhone) |

## Probar en local

```bash
python3 -m http.server 8080
```

Abre http://localhost:8080. El modo sin conexión solo funciona con `http://localhost` o con `https://`.

## Publicar

Es un sitio estático: basta con subir la carpeta a cualquier alojamiento con HTTPS.

- **Netlify Drop** (sin cuenta de GitHub): arrastra la carpeta a https://app.netlify.com/drop.
- **GitHub Pages:** sube el repositorio y activa Pages en *Settings → Pages* con la rama `main` y la carpeta raíz.

## Instalar en el móvil

- **Android (Chrome):** aparece el aviso «Instalar» en la app, o menú ⋮ → «Instalar aplicación».
- **iPhone (Safari):** botón Compartir → «Añadir a pantalla de inicio».

## Actualizar

Edita `index.html` y vuelve a publicar. Quien la tenga instalada verá la versión nueva la siguiente vez que la abra (la primera apertura usa la copia guardada y descarga la nueva por detrás). Si añades o renombras ficheros, súmalos a la lista de `sw.js` y sube `VERSION`.
