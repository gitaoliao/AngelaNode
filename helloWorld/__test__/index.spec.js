test('test hello world', () => {
    const helloworld = require('../index')
    console.log('helloworld', helloworld)
    expect(helloworld).toBe('xxx')
})