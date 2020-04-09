import path from 'path'
import fs from 'fs-extra'
import process from 'process'
import opn from 'opn'
import Bundler from 'parcel-bundler'

// Bundler选项
const options = {
    outDir: './dist-prev',
    watch: true,
};
// 根据输入获取打包页面和打包路径: 1、不输入即所有；2、即特定页面
const getBuildPage = async () => {
    let pageList = process.argv.slice(2) || [];

    if (!pageList.length) {
        pageList = await fs.readdir(path.resolve(__dirname, '../src'));
    } else if (pageList.length > 1) {
        pageList.unshift('home');
    }
    const entryFiles = pageList.map(file => path.join('src', file, '*.html'));

    return { pageList, entryFiles };
};
// 开始打包应用
(async function iife () {
    const { pageList, entryFiles } = await getBuildPage();
    const bundler = new Bundler(entryFiles, options);
    
    bundler.serve();
    const indexPage = (pageList.length > 1) ? 'home/index.html' : `${pageList[0]}/index.html`;
    opn(`http://localhost:1234/${indexPage}`);

    console.log(`listening at http://localhost:1234/${indexPage}`);
})();