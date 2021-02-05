# Willkommen bei FoodCart

FoodCart ist das Online Bestellsystem für deinen Lieferservice. Das vorliegende Projekt ist eines von Dreien. Es handelt sich hierbei um die Server-Anwendung basierend auf JavaScript / ReactJs.

<p align="center">
<img src="https://github.com/habibhaidari1/foodcart-client/raw/master/public/icon.png" alt="icon" width="100"/>
</p>
<p align="center">
<img src="https://i.imgur.com/UfkWtpf.jpg" alt="screenshot" width="30%"/>
<img src="https://i.imgur.com/9QnZZhz.jpg" alt="screenshot" width="30%"/>
<img src="https://i.imgur.com/7fYNHVx.jpg" alt="screenshot" width="30%"/> 
</p>

- [Willkommen bei FoodCart](#willkommen-bei-foodcart)
  - [Beispiel](#beispiel)
  - [Konfiguration](#konfiguration)
    - [Farben](#farben)
    - [Umgebungsvariablen](#umgebungsvariablen)
    - [Webpack-Konfiguration](#webpack-konfiguration)
  - [Installation](#installation)
    - [FoodCart-Projekte](#foodcart-projekte)

## Beispiel

Schau dir an wie FoodCart aussieht! Sollte dir es gefallen, dann würde ich mich über einen Stern freuen 😊

[Zur Demo-Installation](https://foodcart.habibhaidari1.de/)

**Tipp:** Tarife sind für die Postleitzahl 34119 hinterlegt.

## Konfiguration

### Farben

Mithilfe der Farbpalette kannst du das Bestellsystem farblich an die Corporate Identity deines Lieferdienstes anpassen. Standardmäßig ist eine Orange/ Bernstein-Farbene Gestaltung konfiguriert. Die Farbpalette ist im Ordner `src/theme/palette.js` gespeichert. Eine alternativer Dark-Mode ist im `src/theme/palette.d.js`. Um den Dark-Mode zu verwenden, muss die `src/theme/palette.js` und die Hintergrundfarbe im CSS-Selektor `body` in der `src/assets/index.scss` überschrieben werden.

### Umgebungsvariablen

Es müssen innerhalb des Projektes folgende Umgebungsvariablen gesetzt werden. Eine beispielhafte Konfiguration befindet sich im `.env.example`.

| Variable                      | Wert                                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| REACT_APP_HOST                | URL zu der FoodCart Server-Anwendung                                |
| REACT_APP_SHOW_NUMBER         | Artikelnummer in der Speisekarte anzeigen                           |
| REACT_APP_DEBUG_MODE          | Debug-Modus                                                         |
| REACT_APP_USE_SESSION_STORAGE | SessionStorage anstatt des LocalStorage für den Warenkorb verwenden |

### Webpack-Konfiguration

Damit deine Kunden das Bestellsystem als Progressive WebApp zu ihrem Betriebssystem hinzufügen können, musst du in der `webpack.config.js` das Manifest anpassen mit dem Namen deines Lieferservices und den entsprechenden Hauptfarben. Die Einstellungen sind unter den Key-Value-Paaren `short_name`, `name`, `theme_color` und `background_color` zu hinterlegen.

## Installation

Führe `npm run build` aus, um dein Paket mit allen Notwendigen Dateien zu generieren. Anschließend befinden sich im Ordner `dist` alle relevanten Dateien. Die Dateien müssen anschließend in den `public`-Ordner deines Servers. Lediglich die `app.blade.php` muss in den Ordner `resources/views` kopiert werden, da es sich um ein generiertes Blade-Template handelt.

**Alternativ**

Alternativ kann der Client auch als eigenständige Anwendung gehostet werden, welcher auf die Programmierschnittstellen des FoodCart-Servers zugreift. Wichtig ist dabei die Host-Variable so wie die CORS-Einstellung im Server anzupassen. Das Blade-Template muss darüber hinaus auch zu einem HTML-Entrypoint umgeschrieben werden.

### FoodCart-Projekte

| Projekt                                                             | Beschreibung               |
| ------------------------------------------------------------------- | -------------------------- |
| [foodcart-server](https://github.com/habibhaidari1/foodcart-server) | Server-Anwendung           |
| [foodcart-client](https://github.com/habibhaidari1/foodcart-client) | Client-Anwendung           |
| [foodcart-admin](https://github.com/habibhaidari1/foodcart-admin)   | Client für Administratoren |
