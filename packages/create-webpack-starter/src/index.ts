import path from 'path';
import { askQuestions } from './cli';
import { templates } from './templates';
import { copyTemplate } from './copier';
import { installDeps } from './installer';
import { log } from './logger';

// helper to get repo root
function getRepoRoot() {
    return path.resolve(__dirname, '../../../');
}

async function run() {
    try {
        const { projectName, template } = await askQuestions();

        const targetDir = path.resolve(process.cwd(), projectName);
        const repoRoot = getRepoRoot();

        const templatePath = path.join(
            repoRoot,
            templates[template].path
        );

        log.info(`Creating project in ${projectName}...`);
        await copyTemplate(templatePath, targetDir);

        log.info('Installing dependencies...');
        installDeps(targetDir);

        log.success('Done!');
        log.info(`cd ${projectName}`);
        log.info('npm run dev');
    } catch (err: any) {
        log.error(err.message);
        process.exit(1);
    }
}

run();
