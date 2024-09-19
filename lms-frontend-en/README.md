#LMS Frontend

### Setup instructions

1. Clone the project

...
    git clone https://github.com/AniketShrivastava/Lms_backend/tree/main/lms-frontend-en
...

2. Move into the directory

...
   cd Lms-frontend-en
...

3. Install dependancies

...
    npm install
...

4. Run the server

...
   npm run dev
...

### How to setup tailwind css in your project

1. Install  tailwind css  and other dependancies
 
 ...
     npm install -D tailwindcss postcss autoprefixer
 ...

2. Create the `tailwind.config.js` file

...
    npx tailwindcss init -p
...

3. Add the files and dependancies  to tailwind config in the content property

...
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
...

4. Add the tailwind directives on the top  of index.js  file

...
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
...

### Adding plugins and dependancies

... 
   npm install @reduxjs/toolkit react-redux react-router-dom react-icond react-chartjs-2 chart.js daisyui axios react-hot-toast @tailwindcss/line-clamp
...

### Adding auto import sort for esline

1. Install  the plugin

...
   npm install eslint-plugin-simple-import-sort
...

2. Add rule in `eslintrc.cjs`

...

  'simple-import-sort/imports: 'error'
...

3. Add simple-import-sort in the plugin array of `.eslintrc.cjs` file

...
   plugin:[...,'simple-import-sort']
...

4. open setting.json  in vscode configration settings

5. Add the following line

...

      "editor.codeActionsOnSave": {
            "source.fixAll.eslint":  true 
         }
...

