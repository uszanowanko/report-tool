"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var awilix = require('awilix');
function configureContainer() {
    var container = awilix.createContainer();
    container.loadModules([
        'dist/adapters/*.js',
        'dist/controllers/*.js',
    ], {
        formatName: 'camelCase'
    });
    return container;
}
exports.default = configureContainer;
//# sourceMappingURL=configureContainer.js.map