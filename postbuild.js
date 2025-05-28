import { promises as fs } from 'fs';
import path from 'path';

async function routes(relativePath) {
    const routes = [];
    const files = await fs.readdir(relativePath, { withFileTypes: true });
    const main = path.join(relativePath, 'main.jsx');
    if (files.some(file => file.name === 'main.jsx')) {
        const mainContent = await fs.readFile(main, 'utf8');
        const routeRegex = /path:\s*["']([^"']+)["']/g;
        let match;
        while ((match = routeRegex.exec(mainContent)) !== null) {
            routes.push(match[1]);
        }
    } else {
        console.warn(`No main.jsx found in ${relativePath}`);
    }
    return routes;
}

async function listFilesRecursive(dir, currentPath = '') {
    let results = [];
    const list = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of list) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(await listFilesRecursive(fullPath, currentPath + entry.name + '/'));
        } else {
            if (entry.name === 'serviceworker.js') {
                continue; // Skip serviceworker.js
                //Do not self cache the service worker
                //However navigator.serviceWorker.register('service-worker.js)
                //is not intercepted by the service worker itself
            }
            results.push(currentPath + entry.name);
        }
    }
    return results;
}

(async () => {
    const distDir = path.resolve('./dist');
    try {
        const route = await routes('./src');
        const files = await listFilesRecursive(distDir, './');
        const swPath = path.join(distDir, 'serviceworker.js');
        let swContent = await fs.readFile(swPath, 'utf8');
        const start = swContent.indexOf('//%FILENAMES%');
        const end = swContent.indexOf('//%FILENAMESEND%');
        if (start === -1 || end === -1) {
            console.error('Placeholder comments not found in serviceworker.js');
            return;
        }
        swContent = swContent.substring(0, start + '//%FILENAMES%'.length) + '\n' +
            "const FILENAMES =" + JSON.stringify(files, null, 2) + ';\n' +
            "const ROUTES = " + JSON.stringify(route, null, 2) + ';\n' +
            swContent.substring(end);
        await fs.writeFile(swPath, swContent, 'utf8');
        console.log('Injected file list into serviceworker.js');
    } catch (err) {
        console.error('Error reading files:', err);
    }
})();