const { error } = require('console');
const fs = require('fs');
const YAML = require('yaml');

/**
 * recuperé les donnés d 'un fichier yaml 
 *  
 * @param {string} path chemin du fichier yaml
 * 
 * @return donnés yml
 */
function getData(path) {
    if(!path.endsWith(".yml")) return "Le fichier doit etre un .yml";
    const file = fs.readFileSync(path, 'utf8');
    return YAML.parse(file);
}

module.exports = {
    getData : getData
}