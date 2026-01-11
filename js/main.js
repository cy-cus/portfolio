const contact = document.querySelector('#contact')
const about = document.querySelector('#about')
const skills = document.querySelector('#skills')
const experience = document.querySelector('#experience')
const cmdline = document.querySelector('#cmdline')
const heroTerminal = document.querySelector('#hero-terminal')
const heroTerminalOutput = document.querySelector('#hero-terminal-output')
const heroTerminalSource = document.querySelector('#hero-terminal-source')
const heroCmd = document.querySelector('#hero-cmd')

const contactContent = document.querySelector('#contact-content')
const aboutContent = document.querySelector('#about-content')
const skillContent = document.querySelector('#skill-content')
const experienceContent = document.querySelector('#experience-content')

function openWindow({ title, mount, background = '#00aa00' }) {
  if (!mount) return

  const win = new WinBox({
    title,
    background,
    width: '100%',
    height: '100%',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount,
    onfocus: function () {
      this.setBackground('#00aa00')
    },
    onblur: function () {
      this.setBackground('#777')
    },
  })

  const root = win?.dom
  if (root) {
    root.classList.add('winbox-animate-in')
    window.setTimeout(() => root.classList.remove('winbox-animate-in'), 450)
  }
}

function typewriterFromHtml(targetElement, html, { onDone } = {}) {
  if (!targetElement) return

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduceMotion) {
    targetElement.innerHTML = html
    if (typeof onDone === 'function') onDone()
    return
  }

  const typed = document.createElement('span')
  const cursor = document.createElement('span')
  cursor.className = 'cursor'
  cursor.textContent = '_'

  targetElement.innerHTML = ''
  targetElement.appendChild(typed)
  targetElement.appendChild(cursor)

  let i = 0
  let typedHtml = ''

  const step = () => {
    if (i >= html.length) {
      cursor.remove()
      if (typeof onDone === 'function') onDone()
      return
    }

    const ch = html[i]
    if (ch === '<') {
      const closeIdx = html.indexOf('>', i)
      if (closeIdx === -1) {
        i = html.length
      } else {
        typedHtml += html.slice(i, closeIdx + 1)
        i = closeIdx + 1
      }
    } else {
      typedHtml += ch
      i += 1
    }

    typed.innerHTML = typedHtml
    window.setTimeout(step, 22 + Math.random() * 55)
  }

  step()
}

contact?.addEventListener('click', () => {
  openWindow({ title: 'Contact', mount: contactContent })
})

about?.addEventListener('click', () => {
  openWindow({ title: 'About Me', mount: aboutContent })
})

skills?.addEventListener('click', () => {
  openWindow({ title: 'Technical Skills', mount: skillContent })
})

experience?.addEventListener('click', () => {
  openWindow({ title: 'Experience', mount: experienceContent })
})

function runCommand(raw) {
  const cmd = (raw || '').trim().toLowerCase();
  if (!cmd) return;

  if (heroTerminalOutput) {
    const echo = document.createElement('div');
    echo.innerHTML = `<div class="terminal__echo"><span class="terminal__prompt"><span class="prompt__user">cyus@pectus</span><span class="prompt__separator">:</span><span class="prompt__path">~</span></span><span class="dollar"></span> ${cmd}</div>`;
    heroTerminalOutput.appendChild(echo);
    heroTerminalOutput.scrollTop = heroTerminalOutput.scrollHeight;
  }

  if (cmd === 'clear') {
    if (cmdline) cmdline.value = '';
    if (heroCmd) heroCmd.value = '';
    if (heroTerminalOutput) heroTerminalOutput.innerHTML = '';
    return;
  }

  if (cmd === 'help' || cmd === '--help') {
    if (heroTerminalOutput) {
      const help = document.createElement('div');
      help.innerHTML = `
        <div class="terminal__help">
          <div>available commands:</div>
          <div><span class="terminal__cmd">about</span> - professional summary</div>
          <div><span class="terminal__cmd">experience</span> - roles and highlights</div>
          <div><span class="terminal__cmd">skills</span> - tools and technical focus</div>
          <div><span class="terminal__cmd">contact</span> - email and profiles</div>
          <div><span class="terminal__cmd">articles</span> - open Medium</div>
          <div><span class="terminal__cmd">clear</span> - clear the terminal</div>
        </div>
      `;
      heroTerminalOutput.appendChild(help);
      heroTerminalOutput.scrollTop = heroTerminalOutput.scrollHeight;
    }
    return;
  }

  if (cmd === 'contact' || cmd === '/contact') {
    openWindow({ title: 'Contact', mount: contactContent });
    return;
  }
  if (cmd === 'about' || cmd === '/about') {
    openWindow({ title: 'About Me', mount: aboutContent });
    return;
  }
  if (cmd === 'experience' || cmd === '/experience') {
    openWindow({ title: 'Experience', mount: experienceContent });
    return;
  }
  if (cmd === 'skills' || cmd === '/skills') {
    openWindow({ title: 'Technical Skills', mount: skillContent });
    return;
  }
  if (cmd === 'articles' || cmd === '/articles') {
    window.open('https://medium.com/@pectuscyus', '_blank', 'noopener,noreferrer');
    return;
  }

  if (heroTerminalOutput) {
    const notFound = document.createElement('div');
    notFound.innerHTML = `<span class="terminal__error">command not found: ${cmd}</span>`;
    heroTerminalOutput.appendChild(notFound);
    heroTerminalOutput.scrollTop = heroTerminalOutput.scrollHeight;
  }
}

cmdline?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    runCommand(cmdline.value)
    cmdline.value = ''
  }
})

function typewriter(element) {
  if (!element) return

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  if (reduceMotion) return

  const originalHtml = element.innerHTML

  const typed = document.createElement('span')
  const cursor = document.createElement('span')
  cursor.className = 'cursor'
  cursor.textContent = '_'

  element.innerHTML = ''
  element.appendChild(typed)
  element.appendChild(cursor)

  let i = 0
  let typedHtml = ''

  const step = () => {
    if (i >= originalHtml.length) {
      cursor.remove()
      return
    }

    const ch = originalHtml[i]
    if (ch === '<') {
      const closeIdx = originalHtml.indexOf('>', i)
      if (closeIdx === -1) {
        i = originalHtml.length
      } else {
        typedHtml += originalHtml.slice(i, closeIdx + 1)
        i = closeIdx + 1
      }
    } else {
      typedHtml += ch
      i += 1
    }

    typed.innerHTML = typedHtml
    window.setTimeout(step, 35 + Math.random() * 65)
  }

  step()
}

window.addEventListener('DOMContentLoaded', () => {
  if (heroTerminalOutput && heroTerminalSource) {
    const html = heroTerminalSource.innerHTML
    if (heroCmd) {
      heroCmd.disabled = true
    }
    typewriterFromHtml(heroTerminalOutput, html, {
      onDone: () => {
        if (heroCmd) {
          heroCmd.disabled = false
          heroCmd.focus()
        }
      },
    })
  }
})

heroCmd?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    runCommand(heroCmd.value)
    heroCmd.value = ''
  }
})

window.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return
  const tag = (e.target && e.target.tagName) || ''
  if (tag === 'INPUT' || tag === 'TEXTAREA') return

  const key = (e.key || '').toLowerCase()
  if (key === 'c') {
    openWindow({ title: 'Contact', mount: contactContent })
  }
  if (key === 'a') {
    openWindow({ title: 'About Me', mount: aboutContent })
  }
  if (key === 'e') {
    openWindow({ title: 'Experience', mount: experienceContent })
  }
  if (key === 's') {
    openWindow({ title: 'Technical Skills', mount: skillContent })
  }
})


