## MealApp frontend Test


## File and Folder naming

- We name files and folders with the kebab casing style (each stanalone word
  separated by an hyphen).

### Project Directories in the src directory (Folders)

## components

- `components` generally contain standalone components that may be used in
  multiple places
- 
- When components relate to a particular `route` or "concern" alone, we create a
  folder for them. For example, I could create an `organizations` folder and put
  things like `organization-header`, `organization-panel and so on in it.
- Single components in the `components` directory don't need to be placed in
  folders. Infact, we encourage them to have standalone files so we reduce the
  number of `index` files we have in the project.

## routes

- Contains the files (pages) that are passed to each `Route` instance in
  `App.tsx`

## styles

- `Tailwind css` - Tailwind CSS for most component styling, when project gets larger setup themes in `tailwind.config.js`
- Contains multiple scss files all combined in `global.scss` to handle
  individual concerns where possible.
  styles applied to `body`

## types

- Contains custom object/resource/component/function types extracted for import
  in places that need them.

## utils

- Contains helpers to transform data or extract certain parts from provide data.
  They are mostly functions

## Typescript Extras

- We try as much as possible to avoid passing `any` as the type for any
  variable/property. This is because static typechecking is the whole goal of
  `Typescript` and we don't want to be deproved of knowing what properties are
  present on any property. We also want to avoid app errors that could have been
  caught with typescript.
- We use a mix of `types` and `interfaces` discretionally. We use Interfaces
  more in components for the props, then types for many other things

## STATE MANAGEMENT

- We are using component state and Redux for state management

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the production version of the app served from the build folder.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run dev`

Runs the app in development mode.<br /> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br /> You will also see any lint errors
in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br /> See the section
about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br /> It correctly bundles
React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is
ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.
