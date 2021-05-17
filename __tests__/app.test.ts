
import path from 'path'
import assert from 'yeoman-assert'
import helpers from 'yeoman-test'

describe('generator-pcf-detaillist:app', () => {

  const componentName = 'MyComponent'
  beforeAll(() => 
    helpers
      .run( path.join(__dirname, '../generators/app') )
      .withPrompts({ componentName: componentName })
  )

  it('creates files', () => {
    assert.file([ 
      path.join( componentName, 'package.json' ),
      path.join( componentName, 'project.pcfproj' ),
      path.join( componentName, 'pcfconfig.json' ),
    ])
  })

})
