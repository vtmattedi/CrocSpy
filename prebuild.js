/*
    * This script is used to update the version.js file in the src directory.
    * It increments the patch version and updates the build date. Every time vercel    
    * deploys the app, this script will run and update the version.js file.
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const versionFile = path.join(path.join(__dirname, 'src'),'version.js');
if (!fs.existsSync(versionFile)) {
    fs.writeFileSync(
        versionFile,
        `export default {\n  version: '1.0.0',\n  buildDate: '${new Date().toUTCString()}'\n};\n`,
        'utf8'
    );
}
// Read current version.js
let content = fs.readFileSync(versionFile, 'utf8');

// Update version (increment patch) and build date
content = content.replace(
    /version:\s*['"`](\d+)\.(\d+)\.(\d+)['"`]/,
    (match, major, minor, patch) => {
        const newPatch = parseInt(patch, 10) + 1;
        return `version: '${major}.${minor}.${newPatch}'`;
    }
);

const now = new Date().toUTCString();
content = content.replace(
    /buildDate:\s*['"`][^'"`]*['"`]/,
    `buildDate: '${now}'`
);

// Write back to version.js
fs.writeFileSync(versionFile, content, 'utf8');
console.log('version.js updated.');