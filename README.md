# Stare

Stare allows users to compare different versions of a same source code file of a given project. In other words, if you want to actually find out what has been modified within a certain software update, this project can help you to perform a static analysis of the code. Moreover, this tool is reachable through a web browser.

# Requirements

 + nodeJS > 7.6.0

# Installation

In order to install the dependencies, you have to run this command:

```bash
npm install
```

# Usage

## Getting started

First of all, you have to have a look at the file called "default.json" located in the "config" directory. By opening this one with your favorite text editor, you will notice some options that the tool uses. The configuration file must contains:

 + user.login
   > Login required for HTTP BasicAuth
 + user.password
   > Password required for HTTP BasicAuth
 + port
   > Listening port for the web server

 _Please change the default login and the default password before using the tool._

 Then, you can launch the script by running the following command:
 ```bash
 node index.js
 ```

You are now able to access the web page via your web browser with on the given port.

 ## Importing a project

If you haven't a directory called "projects" on the root yet, enter in the cloned source directory and create it with the command:
```bash
mkdir projects
```

Then, create a new directory with a name that you want and copy all the source code within it. For instance, the commands can be:
```bash
mkdir projects/awesome-project-1.0.0
cp -r /tmp/awesome-project-1.0.0/* projects/awesome-project-1.0.0
```

Finally, you have to create a file called ".stare_project.json" located within the brand-new project directory, where you've just copied the source code.
```bash
nano projects/awesome-project-1.0.0/.stare_project-1.0.0
```

The content of this file must fit the following sample pattern:
```json
{
        "name": "Awesome project",
        "version": "1.0.0",
        "lang": "c"
}
```

 + name
   > Project name
 + version
   > Project version
 + lang
   > Language used for the project development

Note that when this file is created, the changes immediately take effect, you only have to refresh the page thanks to your web browser. That is, no need to re-run the server.

# License

Stare is licensed under the GNU GPL license. Have a look at the [LICENSE](https://github.com/bla5r/Stare/blob/master/LICENSE) for more information.

# Credits

 + [Microsoft](https://github.com/Microsoft): The code viewer is based on the project [monaco-editor](https://github.com/Microsoft/monaco-editor)
 + [claviska](https://github.com/claviska): The file tree is based on the project [jquery-file-tree](https://www.abeautifulsite.net/jquery-file-tree)

# Contact

If you have any question about the project, feel free to contact me on Twitter: [@bla5r](https://twitter.com/bla5r)
