import fs from 'fs-extra';

export async function copyTemplate(
  templatePath: string,
  targetDir: string
) {
  if (fs.existsSync(targetDir)) {
    throw new Error(`Directory "${targetDir}" already exists`);
  }

  await fs.copy(templatePath, targetDir);
}
