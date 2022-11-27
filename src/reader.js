const { error } = require('console');
const fs = require('fs');
const yaml = require('yaml');

/**
 * recuperé les donnés d 'un fichier yaml 
 *  
 * @param {string} file chemin du fichier yaml
 * 
 * @return donnés yml
 */
function getData(file) {
    if(!file.endsWith(".yml")) return "Le fichier doit etre un .yml";
    const file = fs.readFileSync('file', 'utf8');
    return YAML.parse(file);
}

module.exports = {
    getData : getData
}