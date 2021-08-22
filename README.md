# CORE-KIT-Map
Map application for displaying estimated renewable energy resources in Shan-State, Myanmar.

Installation Steps

Install Node.js from https://nodejs.org/en/.

Download postgreSQL from https://www.postgresql.org/.

When installing postgreSQL set the following:

!! NOTE !!
These can be changed to anything, but then credentials needs to be changed in the source-code of CORE-KIT ResourceMap.

Superuser: postgres
password: admin
port: 5432

When postgreSQL finishes the installation there will be prompt about stack builder. Launch it and select postGIS 3.1 under spatial extensions.

After the installation Launch pgAdmin.
On the top left expand Servers, then right click on Databases and select Create -> Database.
![image](https://user-images.githubusercontent.com/14816655/130365668-276755a6-1863-4d38-8313-3ec64b27dcb4.png)

Name the database as corekit and press Save.
Then expand corekit and right click on extensions -> create -> extension. Select postgis and save.
Repeat but select postgis_raster.

![image](https://user-images.githubusercontent.com/14816655/130365836-5236b9cf-2749-4e5f-ac7b-cc198ff5a466.png)






