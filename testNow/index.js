// 测试驱动开发: 重点在path包的用法
const path = require('path');
module.exports = class testNow {
    /**
     * 生成测试文件
     * @param {*} methodName
     * @param {*} classFile
     * @param {*} isClass
     */    
    getTestSource(methodName, classFile, isClass = false) {
        return `test('${'TEST'+ methodName}', () => {
    const ${isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
    const ret = ${methodName}()
    // expect(ret).toBe('test return')
})`
    }
    /**
     * 生成测试文件名
     * @param {*} fileName 代码文件名
     * @return {*}
     */    
    getTestFileName(fileName) {
        const dirName = path.dirname(fileName) // 路径名 !注意dirname都是小写
        const baseName = path.basename(fileName) // 基础名
        const extName = path.extname(fileName) // 拓展名
        const testName = baseName.replace(extName, `.spec${extName}`)
        return path.format({
            root: dirName + '/__test__/',
            base: testName
        })
    }
}