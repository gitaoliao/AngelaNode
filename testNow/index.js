// 测试驱动开发: 重点在path包的用法
const path = require('path');
const fs = require('fs');
module.exports = class testNow {
    /** 
     * @param {*}
     */    
    // resolve('./')执行的默认文件夹
    genJestSource(sourcePath = path.resolve('./')){
        const testPath = `${sourcePath}/__test__`
        if(!fs.existsSync(testPath)) {
            fs.mkdirSync(testPath)
        }
        // 遍历代码文件
        let list = fs.readdirSync(sourcePath)// 即会读取文件夹也会读取文件 
        list
            // 添加完整路径
            .map(v =>  `${sourcePath}/${v}`)
            // 过滤文件 statSync留下是文件的 v是一个文件名
            .filter(v => fs.statSync(v).isFile())
            // 排除测试代码 要没有的
            .filter(v => v.indexOf('.spec') === -1)
            .map(v => this.genTestFile(v))
    }
    genTestFile(filename) {
        const testFileName = this.getTestFileName(filename)
        console.log('fileam,e', filename)
        // 判断此文件是否存在
        if (fs.existsSync(testFileName)) {
            console.log('已存在',testFileName)
            return
        }
        const mod = require(filename)
        let source
        if (typeof mod === 'object') {
            source = Object.keys(mod)
                .map(v => this.getTestSource(v, (path.basename(filename)),true))
                .join('\n')
        } else if (typeof mod == 'function') {
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testFileName, source)
    }
    /**
     * 生成测试文件
     * @param {*} methodName
     * @param {*} classFile
     * @param {*} isClass
     */    
    getTestSource(methodName, classFile, isClass) {
        return `test('${'TEST'+ methodName}', () => {
    const ${isClass ? `{${methodName}}` : methodName } = require('${'../' + classFile}')
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