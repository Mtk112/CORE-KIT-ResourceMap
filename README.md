# CORE-KIT-ResourceMap
Map application for displaying estimated renewable energy resources in Shan-State, Myanmar.
<br>
<br>
# Installation Steps
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
!! NOTE !!
These can be changed to anything, but then credentials needs to be changed in the source-code of CORE-KIT ResourceMap.
<br>
<br>
Superuser: postgres
password: admin
port: 5432
<br>
<br>
When postgreSQL finishes the installation there will be prompt about stack builder. Launch it and select postGIS 3.1 under spatial extensions.
<br>
<br>
After the installation Launch pgAdmin.
On the top left expand Servers, then right click on Databases and select Create -> Database.
![image](https://user-images.githubusercontent.com/14816655/130365668-276755a6-1863-4d38-8313-3ec64b27dcb4.png)
<br>
<br>
Name the database as corekit and press Save.
Then expand corekit and right click on extensions -> create -> extension. Select postgis and save.
Repeat but select postgis_raster.
<br>
<br>
![image](https://user-images.githubusercontent.com/14816655/130365836-5236b9cf-2749-4e5f-ac7b-cc198ff5a466.png)
<br>
<br>
Next download corekitdump.sql from https://drive.google.com/drive/folders/1rAR9lxN_Z5AAE8O4Vupn6p-G8RIqoesz?usp=sharing.

Navigate to PostgreSQL\13\bin folder and tap on the filepath and type cmd and press enter to launch command line.
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
Clone CORE-KIT-ResourceMap repository ()






