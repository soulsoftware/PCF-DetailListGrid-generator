
import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe( 'generators util test', () => {

  it( 'match version', () => {

    const rx = (v:string) => /^(\d+)[\.](\d+)[\.](\d+)$/.test(v)

    expect( rx('1.0.0') ).toBe( true )
    expect( rx('1.0') ).toBe( false )
    expect( rx('') ).toBe( false )
    expect( rx('27.3.1257') ).toBe( true )
    expect( rx('1.0.0.1') ).toBe( false )
  })
})

describe('generator-pcf-fluentui:detaillist', () => {

  const componentName = 'MyComponent'

  let targetDir = ''


  beforeAll( async () => {
    await helpers
      .run(path.join(__dirname, '../generators/detaillist'))
      .inTmpDir(dir => targetDir = dir )
      //.inDir( '/tmp', dir => targetDir = dir )
      .withPrompts({ 
        'PCF.Name': componentName,
        'PCF.Namespace': 'namespace',
        'PCF.Version': '1.0.0',
        'PCF.Description': '',
        'PCF.Publisher.UniqueName': 'soulsoftware',
        'PCF.Publisher.Prefix': 'soul',
        'PCF.Publisher.Description': 'The Soulsoftware publisher'

      })
      .toPromise()
  })

  it('creates files', async () => {
      
    assert.file([
      path.join( targetDir, componentName, 'package.json'),
      //path.join( componentName, 'project.pcfproj' ),
      //path.join( componentName, 'pcfconfig.json' ),
    ])
    
  })

})
