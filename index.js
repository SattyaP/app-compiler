const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * Compile JavaScript files with Google Closure Compiler and copy non-JS files.
 * @param {string} srcDir - Source directory containing files.
 * @param {string} distDir - Destination directory for compiled/copied files.
 */
function buildProject(srcDir, distDir) {
    srcDir = path.resolve(srcDir);
    distDir = path.resolve(distDir);

    fs.rmSync(distDir, { recursive: true, force: true });
    fs.mkdirSync(distDir, { recursive: true });

    console.log('🚀 Starting build...\n');

    const copyFile = (src, dest) => {
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
    };

    const compileJsFile = (src, dest) => {
        fs.mkdirSync(path.dirname(dest), { recursive: true });

        exec(`google-closure-compiler --js "${src}" --js_output_file "${dest}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Error compiling ${src}`);
            } else if (stderr) {
                console.warn(`⚠️ Warning: ${stderr}`);
            } else {
                console.log(`✅ Compiled: ${src} -> ${dest}`);
            }
        });
    };

    const processFiles = (dir) => {
        fs.readdirSync(dir).forEach((file) => {
            const filePath = path.join(dir, file);
            const relPath = path.relative(srcDir, filePath);
            const outPath = path.join(distDir, relPath);

            if (fs.statSync(filePath).isDirectory()) {
                processFiles(filePath);
            } else if (file.endsWith('.js')) {
                compileJsFile(filePath, outPath);
            } else {
                copyFile(filePath, outPath);
                console.log(`📂 Copied: ${filePath} -> ${outPath}`);
            }
        });
    };

    processFiles(srcDir);
    console.log("\n🎉 Build completed!");
}

module.exports = buildProject;
