import chalk from 'chalk'
import yosay from 'yosay'
import * as Generator from 'yeoman-generator'

const GENERATOR_NAME = 'generator-pcf-detaillist'

type Options = Generator.GeneratorOptions

export default class SimpleGenerator extends Generator<Options> {

  constructor(args: string|string[], options: Options) {
		super(args, options)
    this.log(
      yosay(
        `Welcome to the glorious ${chalk.red(GENERATOR_NAME)} generator!`
      )
    );
    
	}

  public async prompting() {
    // Have Yeoman greet the user.

    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
    });
  }

  public writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  public install() {
    this.installDependencies();
  }
};
