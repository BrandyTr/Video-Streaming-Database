# How to run rendervideo branch

After pulling, go to branch rendervideo by using **git checkout rendervideo**

## Back-end folder

**1. Setup docker:**
**1.1 Download and setup docker:**

- Download docker at: https://docs.docker.com/get-started/get-docker/
- How to install docker: https://www.youtube.com/watch?v=ZyBBv1JmnWQ
- Run virtualization for Windows 10 Home and Windows 11 Home: https://www.simplilearn.com/enable-virtualization-windows-10-article

**1.2 Test:**
Open cmd and type docker ps to test if the engine is running.

<p algin="center">
  <img src="https://github.com/user-attachments/assets/f3bac0e8-df60-43ba-8b0e-2447cfdd2f56">
</p>
<br>

**1.3 Run docker**
Open the project, in the root, type docker-compose up or docker-compose up -d

<p algin="center">
  <img src="https://github.com/user-attachments/assets/648029a9-6f5e-4ad5-a58a-b05e524d237d">
</p>
<br>
Note: it would last longer if you initially use docker-compose, so please wait
<br>

**2.1 Create a .env file**

- Create an **.env** file in the backend folder.
- Copy and paste these lines, as for the TMDB_API_KEY, you can replace your API, but you also can keep this API key
  MONGO_URI=mongodb://localhost:27018/netflix
  PORT=3000
  JWT_SECRET=ec6aa47f98cc4fc756cf0a8f89bb4e956b11198c54ee604672fee79cba2e513ac10a26
  MODE=development
  TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzI3YjBmYmZlOTU2ZDlmMTU2NzFkOWJlMzliNzM2ZSIsIm5iZiI6MTcyODIwNjg4Ni4yNjgzNTUsInN1YiI6IjY3MDI1N2E0ZTQ4MDE0OTE0Njg1OGU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iN9gb-WH8T6T1LAM3h_uK1DmhTimyo76vpzZy9N8QSw

**2.2 Run node js**

- Open cmd , type **node –version** to check whether you have installed it or not.
  If you haven’t installed node js, install it
  Ref: https://youtube.com/watch?v=4FAtFwKVhn0

- Open project's terminal and type **npm start**
<p algin="center">
  <img src="https://github.com/user-attachments/assets/2c919542-ad35-4588-b676-2da72b2462c5">
</p>
<br>
- Each time you open project, remeber to run **npm start**

  # Frontend folder

- open terminal, and type **cd frontend**, **npm run dev**
