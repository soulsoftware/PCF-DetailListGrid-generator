import chalk from 'chalk'
import yosay from 'yosay'
import Generator = require('yeoman-generator')

const GENERATOR_NAME = 'generator-pcf-detaillist'

type Options = Generator.GeneratorOptions

type TemplateOptions = {
  'PCF.Version': "1.0.0"
  'PCF.Name':string
  'PCF.Description': string
  
}

// Solution/Other/Solution.xml
type TemplateSolutionOptions = TemplateOptions & {
  'PCF.Publisher.UniqueName': string,
  'PCF.Publisher.Description': string
  'PCF.Publisher.Prefix': string
}

// src/ControlManifest.Input.xml
type TemplateManifestOptions = TemplateOptions & {
  'PCF.Namespace': string,
  'PCF.Publisher.Description': string
  'PCF.Publisher.Prefix': string
}

type Config = Partial<{ 
  componentName:string
}>

export default class SimpleGenerator extends Generator<Options> {

  private _config:Config = {}

  constructor(args: string|string[], options: Options) {
		super(args, options)
    this.log(yosay(`Welcome to the ${chalk.red(GENERATOR_NAME)} generator!`))
	}

  public async prompting() {
    // Have Yeoman greet the user.

    const prompts:Generator.Questions = [
      {
        type: 'input',
        name: 'componentName',
        message: 'Give Me Component Name',
        
      }
    ];

    return this.prompt(prompts).then( (props:Config) => {
      // To access props later use this.props.someAnswer;
      console.log( props.componentName )
      this._config = props
    });
  }

  /**
   * 
   */
  public writing() {
    this.fs.copy( 
      this.templatePath( 'DetailListGridTemplate'),
      this.destinationPath(this._config.componentName!)
      // this.templatePath('dummyfile.txt'),
      // this.destinationPath('dummyfile.txt')
    );
  }

  public install() {
    this.destinationRoot( this._config.componentName! )
    this.installDependencies({ npm: true, bower: false });
  }

  public end() {
    
  }
};
