Quick Commands and Tips
1. "npm list" list all node-modules and their version.
2. "npm list --depth=0" list version of dependencies mention in just your package.json file.
3. "npm list <package_name>" list version of the given package_name.

Notes:
1. The lecture uses npm version 5.5.1 and for the sake of similarity the same version is installed for this project.
My npm version was higher so I used "npm i npm@5.5.1" within the package and I saw that in package.json 
a dependency for npm was created with version 5.5.1. But on checking npm -v it gives the version of the higher npm
version installed glabally. Using "npm i -g npm@5.5.1" will globaly update my npm version which I don't want
and so I'm leaving it at this hoping that this would be enough.
2. Any module you install in your package will be stored in node_modules folder. So if
you install "mongoose" module it will be stored under node_modules folder of your package.
Now if "mongoose" module itself depends on other module say "async" module this will also 
be automatically installed to your package and you will find it in node_modules folder.
Note that your package.json will just have "mongoose": "^5.9.7" added to it, that is you 
wont see all the mongoose dependencies added to your package.json even though they are in 
node_modules folder.
Now say that your package depends on "async" module 2 and "mongoose" on "async" module 3.
In that case you would have installed "async" version 2 for your package which means your 
package.json has a dependency entry for "async" module 2 and it is stored in node_modules.
Now you install "mongoose" then the "async" module 3 that "mongoose" requires will NOT be 
stored directly under node_modules along side "async" 2. It will be however stored inside 
"mongoose" folder whichin turn is in node_modules. Shown below:

node_modules
    async version 2
    mongoose
        async version 3

3. In real world application node_modules can grow to few 100 MB. Hence these are not
checked into the source repositories like git. "npm i" is enough to install all required packages.
4. Semantic versioning also called SemVer. In package.json you will see that packages are versioned 
in this format ^major-version.minor-version.patch-version, like ^5.5.1. patch-version is for any bug fixes,
every release will increment the patch-version number like ^5.5.2. minor-version adds functionality 
that does not break any existing apis and hence will look like ^5.6.0 path version 0 becuase it is a 
new minor version with no bugs reported yet. If a new version is released that could potentially break
the different application that depends on this module then major-version is increased. ^6.0.0.
The ^ function tells npm that we are interested in any version of said module as long as the major-version
matches. So, if there is a newer minor or patch version available it will be updated in the package.json.
5. Another character used to indicate versioning is ~(tilde), if you see a version as ~1.8.0 means 
that the package can be updates as long as the major version is 1 and minor version is 8.
6. Intead of using ^ we can also specify the version as 5.x, and for ~ we can use replace with 1.8.x. 
7. If you are worried that any updates to the module might have bugs that will break your app and you 
want your users to run your app on exact version of dependies that it was built on then just leave the
versions as is without ^ or ~ character. Like, "5.5.1".
