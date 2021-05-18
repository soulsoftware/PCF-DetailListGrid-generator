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

export default class MainGenerator extends Generator<Options> {


  constructor(args: string|string[], options: Options) {
		super(args, options)
    this.log(yosay(`Welcome to the ${chalk.red(GENERATOR_NAME)}!`))
	}

  public async prompting() {
  }

  /**
   * 
   */
  public writing() {
  }

  public install() {
  }

  public end() {
    
  }
};
