const awilix = require('awilix')

export default function configureContainer () {
  const container = awilix.createContainer()
  
  container.loadModules([
    'dist/adapters/*.js',
    'dist/controllers/*.js',
  ], {
    formatName: 'camelCase'
  })
  
  return container
}