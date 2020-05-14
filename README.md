# Mystic Millis

The framework of this copied from an example from @kevinsawicki (https://github.com/kevinsawicki/tray-example)

Built with [Electron](http://electron.atom.io).

Built with [photon](http://photonkit.com).

## Running

```sh
git clone https://github.com/mysticcoders/mysticmillis
cd mysticmillis
npm install
npm start
```

## Packaging
By default we package as darwin.
```sh
npm run package
open out/Mystic Millis-darwin-x64/Mystic Millis.app
```

### Darwin
```sh
npm run package:darwin
open out/Mystic Millis-darwin-x64/Mystic Millis.app
```

### Linux
```sh
npm run package:linux
./out/Mystic Millis-linux-x64/Mystic Millis
```
