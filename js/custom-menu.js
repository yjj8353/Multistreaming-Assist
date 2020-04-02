const {Menu, shell} = require('electron');

const template = [
    {
        label: '도움말',
        submenu: [
            {
                label: '프로그램 사용법',
                click: async () => {
                    shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/README.md');
                }
            },
            {
                label: '이 프로그램에 도움을 준 사람들',
                click: async() => {
                    shell.openExternal('https://github.com/yjj8353/Multistreaming-Assist/blob/master/%EA%B8%B0%EC%97%AC%EC%9E%90%EB%AA%A9%EB%A1%9D.md');
                }
            }
        ]
    }
 ]
 
 const menu = Menu.buildFromTemplate(template)
 Menu.setApplicationMenu(menu)