const spawn = require('child_process').spawn

function exec(command, args) {
  const win32 = process.platform === 'win32'
  const cmd = win32 ? 'cmd' : command
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args
  return spawn(cmd, cmdArgs, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
}

function execSync(command, args) {
  return new Promise((resolve, reject) => {
    const cp = exec(command, args)
    cp.on('error', (code) => {
      reject(code)
    })
    cp.on('exit', (code) => {
      resolve(code)
    })
  })
}

execSync('yarn', 'build').then(() => {
  exec('yarn', 'gp')
})
