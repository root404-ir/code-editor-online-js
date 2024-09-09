const runCodeBtn = document.querySelector('.editor__run')
const resetCodeBtn = document.querySelector('.editor__reset')
const consoleLogList = document.querySelector('.editor__console--logs')
const saveBtn = document.querySelector('.editor__save')
let codeEditor = ace.edit("editorCode")
let dafaultCode = "console.log('front-code.ir')"
let consoleMessages = []

let codeLib = {
    clearConsolescreen() {
        consoleMessages.length = 0
        while (consoleLogList.firstChild) {
            consoleLogList.removeChild(consoleLogList.firstChild)
        }
    },
    printToConsole() {
        consoleMessages.forEach(log => {
            const newLogItem = document.createElement('li')
            const newLogText = document.createElement('pre')
            newLogText.className = log.class
            newLogText.textContent = `> ${log.message}`
            newLogItem.appendChild(newLogText)
            consoleLogList.appendChild(newLogItem)
        })
    },
    init() {
        codeEditor.setTheme('ace/theme/cobalt')
        codeEditor.session.setMode('ace/mode/javascript')
        codeEditor.setOptions({
            fontSize: '12pt',
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        })
        codeEditor.setValue(dafaultCode)
    }
}

runCodeBtn.addEventListener('click', () => {
    codeLib.clearConsolescreen()
    const userCode = codeEditor.getValue()
    try {
        new Function(userCode)()
    } catch (err) {
        console.error(err)
    }
    codeLib.printToConsole()
})

resetCodeBtn.addEventListener('click', () => {
    codeEditor.setValue(dafaultCode)
    codeLib.clearConsolescreen()
})

saveBtn.addEventListener('click', () => {
    const userCode = codeEditor.getValue(); 
    const blob = new Blob([userCode], { type: 'text/javascript' }) 
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'script.js'
    link.click()
    URL.revokeObjectURL(link.href)
})

codeLib.init()
