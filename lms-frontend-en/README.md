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