# CORE-KIT-ResourceMap
Map application for displaying estimated renewable energy resources in Shan-State, Myanmar.
<br>
<br>
# Installation
<br>
<br>
Download and install Node.js from https://nodejs.org/en/.
<br>
<br>
Download and install postgreSQL from https://www.postgresql.org/.
<br>
<br>
When installing postgreSQL set the following:
<br>
<br>
Superuser: postgres
<br>
password: admin
<br>
port: 5432
<br>
<br>
!! NOTE !!
<br>
These can be changed to anything, but then credentials needs to be changed in the source-code of CORE-KIT ResourceMap.
<br>
<br>
When postgreSQL finishes the installation there will be prompt about stack builder. Launch it and select postGIS 3.1 under spatial extensions.
<br>
<br>
After the installation Launch pgAdmin.
<br>
On the top left expand Servers, then right click on Databases and select Create -> Database.
<br>
![image](https://user-images.githubusercontent.com/14816655/130365668-276755a6-1863-4d38-8313-3ec64b27dcb4.png)
<br>
<br>
Name the database as corekit and press Save.
<br>
Then expand corekit and right click on extensions -> create -> extension. Select postgis and save.
<br>
Repeat but select postgis_raster.
<br>
<br>
![image](https://user-images.githubusercontent.com/14816655/130365836-5236b9cf-2749-4e5f-ac7b-cc198ff5a466.png)
<br>
<br>
Next download corekitdump.sql from https://drive.google.com/drive/folders/1rAR9lxN_Z5AAE8O4Vupn6p-G8RIqoesz?usp=sharing.
<br>

Navigate to PostgreSQL\13\bin folder and tap on the filepath and type cmd and press enter to launch command line.
<br>
![image](https://user-images.githubusercontent.com/14816655/130366812-cd04f874-b489-4ead-9df4-cf689c433452.png)
<br>
<br>
On command line write the following:
<br>
psql -U [postgreSQL_superuser] -h localhost -p [postgreSQL_portnumber] [databasename] < [path_to_corekitdump.sql]
<br>
For example: 
<br>
psql -U postgres -h localhost -p 5432 corekit < C:\Users\Miikka\Downloads\corekitdump.sql
<br>
<br>
Then download and install Visual Studio Code (https://code.visualstudio.com/) or any equivalent.
<br>
Clone or download CORE-KIT-ResourceMap repository (https://github.com/Mtk112/CORE-KIT-ResourceMap).
<br>
![image](https://user-images.githubusercontent.com/14816655/130367419-774fe438-f67a-4ba0-95a7-e00f5f228288.png).
<br>
Open the CORE-KIT-ResourceMap with Visual Studio Code, and open terminal by selecting View -> Terminal.
<br>
![image](https://user-images.githubusercontent.com/14816655/130367619-298a6e6b-b3ea-4c1d-bb3f-79457628dfcf.png)
<br>
On the terminal write the following commands:
<br>
cd server
<br>
npm i 
<br>
npm start 
<br>
Then open a second terminal and write the following:
<br>
cd client 
<br>
npm i 
<br>
npm start 
<br>
And the application should now be running on your browser locally!
<br>
<br>
If you chose to use different Superuser username, database name, password or port when installing postgresSQL modify db.js file in CORE-KIT-ResourceMap\server\db.js to match what you chose.
<br>
![image](https://user-images.githubusercontent.com/14816655/130372352-b4c48a7f-577d-4d0a-88cf-8727c3443e72.png)









