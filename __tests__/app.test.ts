
import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'


describe('generator-pcf-fluentui:detaillist', () => {

  const componentName = 'MyComponent'

  let targetDir = ''


  beforeAll( async () => {
    await helpers
      .run(path.join(__dirname, '../generators/detaillist'))
      .inTmpDir(dir => targetDir = dir )
      //.inDir( '/tmp', dir => targetDir = dir )
      .withPrompts({ componentName: componentName })
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
