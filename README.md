# Twitch Vertical

A very simple extension build with Vue using Kocal's [Vue Web Extension](https://github.com/Kocal/vue-web-extension) boilerplate.

[<img src="./images/ChromeWebStore.png">](https://chrome.google.com/webstore/detail/twitch-vertical/ahfcaiejokljdddiodkpgoljeaglhokb)

## Features

Actually just a simple one: move the chat below the player

## But WHY?

Well, I don't know about you, but I have a vertical monitor. The main problem for me is, in Twitch's theatre mode, the chat goes to the right and the player turns into a really small square.

So I've created this simple extension to inject some CSS and fix that.

## PICS

#### Problem

![Problem](./images/problem.gif)

#### Solution

![Solution](./images/solution.gif)

## Know issues

- When you go to "Categories" you have to enable/disabled the extension to work on the new channel (but changing between channels has no problem)
- Some responsiveness
- I've only tried in my own monitor and some resolutions, please try in yours and create a issue

# Development

## Requirements

- Node.js >= 10 and npm >= 5
- [git](https://git-scm.com)
- [vue-cli 2](https://github.com/vuejs/vue-cli/tree/v2)

## Usage

```bash
$ vue init kocal/vue-web-extension my-extension
$ cd my-extension
$ npm install
$ npm run build
```

### `npm run build`

Build the extension into `dist` folder for **production**.

### `npm run build:dev`

Build the extension into `dist` folder for **development**.

### `npm run watch`

Watch for modifications then run `npm run build`.

### `npm run watch:dev`

Watch for modifications then run `npm run build:dev`.

It also enable [Hot Module Reloading](https://webpack.js.org/concepts/hot-module-replacement), thanks to [webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader) plugin.

:warning: Keep in mind that HMR only works for your **background** entry.

### `npm run build-zip`

Build a zip file following this format `<name>-v<version>.zip`, by reading `name` and `version` from `manifest.json` file.
Zip file is located in `dist-zip` folder.

## LICENSE

[MIT](LICENSE)
