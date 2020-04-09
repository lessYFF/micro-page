import * as path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import renderPage from './template';

(async function iife() {
    const nameReg = /^[a-zA-Z\-]{2,50}$/g;
    const descriptionReg = /^.{2,100}$/g;
    const pageDir = path.resolve(__dirname, '../src');

    const { frame, name, description } = await prompts([
        {
            type: 'select',
            name: 'frame',
            initial: 0,
            message: 'Pick technology type(技术框架)',
            choices: [
                { title: 'Vue', value: 'Vue' },
                { title: 'React', value: 'React' },
                { title: 'Jquery', value: 'Jquery' },
            ],
        }, {
            type: 'text',
            name: 'name',
            message: 'page name(页面名称)',
            validate: value => nameReg.test(value) ? true : `${nameReg}`,
        }, {
            type: 'text',
            name: 'description',
            message: 'page description(页面描述/作用)',
            validate: value => descriptionReg.test(value) ? true : `${descriptionReg}`,
        },
    ]);

    await renderPage({ frame, name, description }, pageDir);
    console.log(chalk.green(`Success! ${name} with ${frame} has been created`));
}());