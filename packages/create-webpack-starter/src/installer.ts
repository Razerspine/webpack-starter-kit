import { execSync } from 'child_process';

export function installDeps(targetDir: string) {
  execSync('npm install', {
    cwd: targetDir,
    stdio: 'inherit'
  });
}
