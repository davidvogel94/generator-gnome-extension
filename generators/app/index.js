"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument("name", { type: String, required: true });
    this.destinationRoot(this.options.name);
  }

  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the stupendous ${chalk.red("gnome extension")} generator!`
      )
    );

    const prompts = [
      {
        type: "input",
        name: "description",
        message: "Extension description"
      },
      {
        type: "input",
        name: "author-name",
        message: "Author name",
        default: ""
      },
      {
        type: "input",
        name: "author-email",
        message: "Author email address",
        default: ""
      },
      {
        type: "input",
        name: "author-website",
        message: "Author website",
        default: ""
      },
      {
        type: "input",
        name: "url",
        message: "Extension url (e.g. Github repo)"
      },
      {
        type: "input",
        name: "uuid",
        message: "Extension uuid (e.g. extname@author.github.io)"
      },
      {
        type: "number",
        name: "version",
        message: "Extension version",
        default: 1.0
      },
      {
        type: "input",
        name: "shell-version",
        message: "Gnome shell versions (comma-delimited)",
        default: "42.0"
      }
    ];

    this.answers = await this.prompt(prompts);
  }

  writing() {
    this.fs.copy(
      [
        this.templatePath("src/extension.ts"),
        this.templatePath("src/prefs.js"),
        this.templatePath("src/stylesheet.css")
      ],
      this.destinationPath("src")
    );
    this.fs.copy(
      [
        this.templatePath(".editorconfig"),
        this.templatePath(".gitignore"),
        this.templatePath("tsconfig.json")
      ],
      this.destinationPath("")
    );

    this._writeMetadata();
    this._writePackageJson();
  }

  _writeMetadata() {
    var j = this.fs.readJSON(this.templatePath("src/metadata.json"));
    j.name = this.options.name;
    j.description = this.answers.description;
    j["shell-version"] = this.answers["shell-version"].split(",");
    j.url = this.answers.url;
    j.uuid = this.answers.uuid;
    j.version = this.answers.version;
    this.fs.writeJSON(this.destinationPath("src/metadata.json"), j);
  }

  _writePackageJson() {
    var j = this.fs.readJSON(this.templatePath("package.json"));
    j.name = this.options.name;
    j.description = this.answers.description;
    j.homepage = this.answers.url;
    j.author = {
      name: this.answers["author-name"],
      email: this.answers["author-email"],
      url: this.answers["author-website"]
    };
    j.scripts.cleanextension = `rm -rf ~/.local/share/gnome-shell/extensions/${this.answers.uuid}`;
    j.scripts.copyextension = `cp -r ./build ~/.local/share/gnome-shell/extensions/${this.answers.uuid}`;
    this.fs.writeJSON(this.destinationPath("package.json"), j);
  }
};
