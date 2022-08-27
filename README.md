# CORE-KIT-ResourceMap
Map application for displaying estimated renewable energy resources in southern Shan-State, Myanmar.
<br>
<br>
![image](https://user-images.githubusercontent.com/14816655/186962442-8fe20107-58c4-4f2a-9cb6-a354896187f1.png)

<br>
<br>

# Setup
<br>
<br>
Download and install Node.js from https://nodejs.org/en/.
<br>
<br>
Download and install postgreSQL from https://www.postgresql.org/.
<br>
<br>
When installing postgreSQL as an example you can set the following variables when prompted:
<br>
!! NOTE !!
<br>
These can be changed to anything, but then credentials needs to be changed to match when creating .env later in the setup.
<br>
<br>
Superuser: postgres
<br>
password: admin
<br>
port: 5432
<br>
<br>
When postgreSQL finishes the installation there will be prompt about stack builder. Launch it and select postGIS 3.1 under spatial extensions.
<br>
<br>
After the installation Launch pgAdmin.
<br>
On the top left expand Servers, then right click on Databases and select Create -> Database.
<br>
![image](https://user-images.githubusercontent.com/14816655/187041343-9bd7d0d7-ff24-432c-aec5-ef1d328b1bad.png)

<br>
<br>
Name the database as corekit and press Save.
<br>
Then expand corekit and right click on extensions -> create -> extension. Select postgis and save.
<br>
Repeat but select postgis_raster.
<br>
![image](https://user-images.githubusercontent.com/14816655/187041354-a5681de8-2ac5-43f5-993a-f139a7d02e8f.png)

<br>
<br>
Next download corekitdump.sql from https://drive.google.com/drive/folders/1rAR9lxN_Z5AAE8O4Vupn6p-G8RIqoesz?usp=sharing.
<br>
<br>
Navigate to PostgreSQL\13\bin folder and tap on the filepath and type cmd and press enter to launch command line.
<br>
![image](https://user-images.githubusercontent.com/14816655/187041367-5e831acb-6ea3-4af5-bc3c-eeaae744fd73.png)

<br>
On command line write the following:
<br>
psql -U [postgreSQL_superuser] -h localhost -p [postgreSQL_portnumber] [databasename] < [path_to_corekitdump.sql]
<br>
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
![image](https://user-images.githubusercontent.com/14816655/187041382-b312c5c8-de97-4fb5-9be8-62f1a01a95a4.png)

<br>
Next open the CORE-KIT-ResourceMap with Visual Studio Code.
<br>
In visual studio, create a new file under CORE-KIT-RESOURCEMAP by right clicking anywhere under the README.md and selecting New File.
<br>
![image](https://user-images.githubusercontent.com/14816655/187041397-c226f899-5a51-45e0-ab66-dc5dc0adcc06.png)

<br>
Name this file as .env. Proceed to copy the code from a file named 'example.env' and paste it to the newly created .env file.
<br>
Change the values in the .env file so that they match the credentials set during postgreSQL setup.
<br>
<br>
Finally open the CORE-KIT-ResourceMap with Visual Studio Code, and open terminal by selecting View -> Terminal.
<br>
![image](https://user-images.githubusercontent.com/14816655/187041406-b4ace1cb-f75e-481a-a8c2-aa8356ecda80.png)

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









