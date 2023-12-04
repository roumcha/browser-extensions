import esbuild from 'esbuild';
import fs, { Dirent } from 'fs';
import path from 'path';
import { exit } from 'process';

fs.rmSync('dist', { recursive: true, force: true });

fs.readdirSync(__dirname, { withFileTypes: true })
  .filter((child) => child.isDirectory())
  .forEach(visitDir);

console.log();
console.log('Completed.');
exit(0);

function visitDir(dir: Dirent): void {
  const files = fs
    .readdirSync(path.join(dir.path, dir.name), {
      withFileTypes: true,
    })
    .filter((child) => child.isFile());

  if (files.find((file) => file.name === 'user-script.ts'))
    buildUserScript(dir);

  if (files.find((file) => file.name === 'extension.ts'))
    buildExtension(dir);
}

function buildUserScript(dir: Dirent): void {
  const srcfile = path.join(dir.path, dir.name, 'user-script.ts');
  const infofile = path.join(dir.path, dir.name, 'info.ts');
  const outfile = path.join('dist', dir.name, 'user-script.js');
  console.log('- ' + outfile);

  esbuild.buildSync({
    entryPoints: [srcfile],
    outfile,
    banner: { js: require(infofile).userScriptHeader ?? '' },
    minify: false,
    bundle: true,
  });
}

function buildExtension(dir: Dirent): void {
  const srcfile = path.join(dir.path, dir.name, 'extension.ts');
  const outfile = path.join('dist', dir.name, 'extension.js');
  console.log('- ' + outfile);

  esbuild.buildSync({
    entryPoints: [srcfile],
    outfile: outfile,
    minify: false,
    bundle: true,
  });
}
