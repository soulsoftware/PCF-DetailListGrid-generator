import yo = require('yeoman-generator')
import * as path from 'path'
import assert from 'assert'

export const GENERATOR_NAME = 'generator-pcf-fluentui'


type TemplateCommonOptions = {
    // 'PCF.Version'
    // 'PCF.Name'
    // 'PCF.Description'
    Version: '1.0.0'
    Name: string
    Description: string
}
// Solution/Other/Solution.xml
type TemplateSolutionOptions = {
    // 'PCF.Publisher.UniqueName'
    // 'PCF.Publisher.Description'
    // 'PCF.Publisher.Prefix'
    Publisher: {
        UniqueName: string
        Description: string 
        Prefix: string
    }
}

// src/ControlManifest.Input.xml
type TemplateManifestOptions = {
    // 'PCF.Namespace'
    // 'PCF.Constructor'
    Namespace: string
    Constructor: string
}

type TemplateOptions = {
    PCF: TemplateCommonOptions & TemplateManifestOptions & TemplateSolutionOptions
} 

export type ComponentConfig = Partial<TemplateOptions>

const validateName = ( minLenght:number = 1 ) => {
    return ( input:string ) => {    const len = input.trim().length
        if( len >= minLenght ) return true
        
        return (len ==0 ) ? 
            'please provide a name!' : 
            `value must be at least of ${minLenght} chars`
        }
  }

export const componentPrompts:yo.Questions = [
    {
        name: 'PCF.Namespace',
        message: 'Component namespace:',
        validate: validateName(),
        default: 'PCFNamespace'
    },
    {
        name: 'PCF.Name',
        message: 'Component name:',
        validate: validateName()
    },
    {
        name: 'PCF.Description',
        message: 'Component description:',
        default: ( answers:ComponentConfig ) => 
            `The ${answers.PCF!.Name} Component` 
    },  
    {
        name: 'PCF.Publisher.UniqueName',
        message: 'Solution Publisher:',
        validate: validateName(4),
        default: 'Development'
    },
    {
        name: 'PCF.Publisher.Prefix',
        message: 'Solution Publisher Prefix:',
        validate: validateName(3),
        default: ( answers:ComponentConfig ) => 
            `${answers.PCF!.Publisher.UniqueName.substr(0,3)}` 
    },
    {
        name: 'PCF.Publisher.Description',
        message: 'Solution Publisher description:',
        default: ( answers:ComponentConfig ) => 
            `The ${answers.PCF!.Publisher.UniqueName} Publisher` 
    },  
  
    ];

    export class CommonGenerator<T extends yo.GeneratorOptions = yo.GeneratorOptions> extends yo<T> {

              
        copyTemplateFromRoot( pcfconfig:TemplateCommonOptions & TemplateManifestOptions & TemplateSolutionOptions ) {
            assert.ok( pcfconfig.Constructor && pcfconfig.Constructor.trim().length > 0, 'PCF.Constructor not set!' )

            if( !pcfconfig.Version || pcfconfig.Version.trim().length == 0 ) {
                pcfconfig.Version = '1.0.0'
            }

            const root = this.sourceRoot()
            this.sourceRoot( path.join( root, '..', '..', 'app', 'templates' ) )
        
            const solutionTpl = path.join('Solution', 'Other', 'Solution.xml')
            this.fs.copyTpl( 
            this.templatePath( solutionTpl ),
            this.destinationPath( path.join(pcfconfig.Name, solutionTpl) ),
                pcfconfig
            )
        
            const manifestTpl = path.join('src', 'ControlManifest.Input.xml')
            this.fs.copyTpl( 
            this.templatePath( manifestTpl ),
            this.destinationPath( path.join(pcfconfig.Name, manifestTpl) ),
            pcfconfig
            )
        
            this.sourceRoot( root )
        
        }
    }