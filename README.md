# Figma Plugin: Node Inspector

## Table of Contents

- [Install & Build](#install--build)
- [Features](#features)
- [Linting](#linting)
- [Release Notes](#release-notes)

## Install & Build

First, make sure you have [Node.js](https://nodejs.org) installed on your machine.

_if you use nvm_, `nvm use` to switch to 16.13.1

Install: `npm i`

Run Plugin locally with hot-reload: `npm start`

Run UI in Browser: `npm run serve` (only use this for easier UI updates, doesn't interact with Figma layer)

Run Production bundle: `npm run bundle`

## Features

- Ability to Inspect Figma Node's
- If component is part of a Library, ability to view it's [Component Properties](https://help.figma.com/hc/en-us/articles/5579474826519-Create-and-use-component-properties)

## Linting

- `npm run lint` for a list of linting warnings/error in cli
- make sure you have prettier package installed:
  - [prettier for atom](https://atom.io/packages/prettier-atom)
  - [prettier for vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- then make sure to enable these options (packages → prettier):
  - eslint integration
  - automatic format on save (toggle format on save)

## Release Notes

**version 1.0.0**

- added [Dark Mode](https://www.figma.com/plugin-docs/css-variables/) support with the announcement of [Dark Mode for Figma](https://help.figma.com/hc/en-us/articles/5576781786647-Change-themes-in-Figma)
- Started with React and React DOM to v.18
- Started with Webpack v.5

Based off [Figma Plugin React Starter](https://github.com/calebnance/figma-plugin-react-starter)
