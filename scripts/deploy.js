const ghpages = require('gh-pages');
ghpages.publish('build', {
    user: {
        name: 'kimwong0919',
        email: 'kimwong0919@gmail.com'
    },
    publish: false
}, (error) => {
    console.log('gh-page deploy error: ', error);
});