let uniqueFilePathCounter = 0;
export function importDirectory(path: string) {
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      import(`file:///${currentPath}#${uniqueFilePathCounter}`);
      continue;
    }

    importDirectory(currentPath);
  }

  uniqueFilePathCounter++;
}
