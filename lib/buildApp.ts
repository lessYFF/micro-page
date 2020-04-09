import Bundler from 'parcel-bundler'

// Bundler选项
const options = {
    watch: false,
    cache: false,
    hmr: false,
    minify: true, 
    scopeHoist: true,
};

(async function iife () {
    const bundler = new Bundler('src/**/*.html', options);

    await bundler.bundle();
})();