import inquirer from 'inquirer';
import { templates, TemplateKey } from './templates';

type Answers = {
  projectName: string;
  template: TemplateKey;
};

export async function askQuestions(): Promise<Answers> {
  const answers = await inquirer.prompt<Answers>([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-app',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Choose a template:',
      choices: Object.entries(templates).map(([key, value]) => ({
        name: value.description,
        value: key,
      })),
    },
  ] as any);

  return answers;
}
