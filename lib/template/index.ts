import * as path from 'path';
import * as fs from 'fs-extra';
import decamelize from 'decamelize';

interface RenderParams {
    frame: string;
    name: string;
    description: string;
}

// Features：1、替换模版目录下页面名和描述；2、拷贝目录到src目录下；
const renderPage = async ({ frame, name, description }: RenderParams, targetDir: string) => {
    const template = `template-${frame.toLowerCase()}`;
    const templateDir = path.resolve(__dirname, template);
    const decamelizeName = decamelize(name, '-');
    const vars = { 'pageName': decamelizeName, description };
    const replace = (file: string) => file.replace(
        /____([a-zA-Z\d-]+)____/g,
        (p, p1) => p1 in vars ? vars[p1] : p,
    );
    try {
        if (!fs.statSync(templateDir).isDirectory()) return;

        const fileList = await fs.readdir(templateDir);
        fileList.map(async (file) => {
            const from = path.join(templateDir, file);
            const target = path.join(targetDir, decamelizeName, file);
            const _file = await fs.readFile(from, 'utf8');

            await fs.ensureFile(target);
            await fs.writeFile(target, replace(_file.toString()));
        });
    } catch (msg) {
        console.error('replaceFile error', msg);
    }
}


export default renderPage;