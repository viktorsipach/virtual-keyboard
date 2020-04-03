const Keyboard = {

  alphabet: {
    rus: [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
      ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '/', 'del'],
      ['capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
      ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '&#9650', 'shift'],
      ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '&#9668', '&#9660', '&#9658']],

    eng: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '&#8592'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del'],
      ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '&#9650', 'shift'],
      ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', '&#9668', '&#9660', '&#9658']],

  },

  keyCode: {
    id: [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Del'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']],
  },

  properties: {
    capsLock: false,
    shift: false,
    rusLang: false,
  },

  addElements() {
    const input = document.createElement('textarea')
    const section = document.createElement('section')
    const keyboard = document.createElement('div')
    const text = document.createElement('p')
    section.className = 'main'
    input.className = 'input'
    keyboard.className = 'keyboard'
    text.className = 'text'
    text.innerHTML = 'Change language (ctrl + alt), Click (win)'
    document.body.append(section)
    document.querySelector('.main').appendChild(input)
    document.querySelector('.main').appendChild(keyboard)
    document.querySelector('.main').appendChild(text)
  },

  createKeys(alphabet) {
    for (let i = 0; i < alphabet.length; i = 1 + i) {
      const row = document.createElement('div')
      row.className = `keyboard__row row-${i + 1}`
      document.querySelector('.keyboard').appendChild(row)
      for (let j = 0; j < alphabet[i].length; j = 1 + j) {
        const btn = document.createElement('div')
        btn.className = `btn btn-${i + 1}-${j + 1}`
        btn.id = `${this.keyCode.id[i][j]}`
        document.querySelector(`.row-${i + 1}`).append(btn)
        btn.innerHTML = alphabet[i][j]
      }
    }
  },

  animation(el) {
    const element = document.getElementById(`${el}`)
    element.style.backgroundColor = 'rgba(0, 0, 255,0.5)'
    element.style.borderRadius = '12px'
  },

  defaultStyle(el) {
    const currElement = document.getElementById(`${el}`)
    currElement.style.backgroundColor = ''
    currElement.style.borderRadius = ''
  },

  changeLanguage() {
    const delElem = document.querySelectorAll('.keyboard__row')
    for (let i = 0; i < delElem.length; i = 1 + i) {
      delElem[i].remove()
    }
    if (this.properties.rusLang) {
      this.createKeys(this.alphabet.rus)
      this.properties.rusLang = false
      localStorage.removeItem('rusLang')
      localStorage.setItem('rusLang', this.properties.rusLang)
    } else {
      this.createKeys(this.alphabet.eng)
      this.properties.rusLang = true
      localStorage.removeItem('rusLang')
      localStorage.setItem('rusLang', this.properties.rusLang)
    }
  },

  printMassage(btn) {
    const output = document.querySelector('.input')
    const buttons = document.querySelectorAll('.btn')
    buttons.forEach((el) => {
      if (el.id === btn) {
        output.value += el.innerHTML
      }
    })
  },

  checkPressedBtn(btn, event) {
    const mainKeys = ['Backspace', 'Del', 'Tab', 'CapsLock', 'Space', 'Enter', 'ShiftLeft', 'ControlLeft',
      'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ShiftRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
    const buttons = document.querySelectorAll('.btn')
    const output = document.querySelector('.input')
    if (mainKeys.includes(btn)) {
      buttons.forEach((el) => {
        if (el.id === btn) {
          output.focus()
          this.animation(el.id)
        }
      })
    } else {
      buttons.forEach((el) => {
        if (el.id === btn) {
          event.preventDefault()
          output.focus()
          this.animation(el.id)
          this.printMassage(el.id)
        }
      })
    }
  },

  addCapsLockHandler(btn, event) {
    if (this.properties.capsLock === false) {
      const buttons = document.querySelectorAll('.btn')
      this.checkPressedBtn(btn, event)
      buttons.forEach((el) => {
        const button = el
        button.innerHTML = el.innerHTML.toUpperCase()
      })
      this.properties.capsLock = true
    } else {
      const buttons = document.querySelectorAll('.btn')
      this.checkPressedBtn(btn, event)
      buttons.forEach((el) => {
        const button = el
        button.innerHTML = el.innerHTML.toLowerCase()
      })
      this.properties.capsLock = false
    }
  },

  addShiftHandler(btn, event) {
    if (this.properties.shift === false) {
      const specSymbols = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '&#8592']
      const backSlash = document.getElementById('Backslash')
      const bracketLeft = document.getElementById('BracketLeft')
      const bracketRight = document.getElementById('BracketRight')
      const semicolon = document.getElementById('Semicolon')
      const quote = document.getElementById('Quote')
      const comma = document.getElementById('Comma')
      const period = document.getElementById('Period')
      const slash = document.getElementById('Slash')
      const rows = document.querySelectorAll('.keyboard__row')
      const specRow = document.createElement('div')

      this.properties.shift = true
      this.checkPressedBtn(btn, event)
      specRow.className = 'keyboard__row row-1'
      for (let i = 0; i < specSymbols.length; i = 1 + i) {
        const specBtn = document.createElement('div')
        specBtn.className = `btn btn-1-${i + 1}}`
        specBtn.id = `${this.keyCode.id[0][i]}`
        specBtn.innerHTML = specSymbols[i]
        specRow.append(specBtn)
      }
      rows[0].replaceWith(specRow)
      backSlash.innerHTML = '|'
      bracketLeft.innerHTML = '{'
      bracketRight.innerHTML = '}'
      semicolon.innerHTML = ':'
      quote.innerHTML = '"'
      comma.innerHTML = '&#8249'
      period.innerHTML = '&#8250'
      slash.innerHTML = '?'
    } else {
      const rows = document.querySelectorAll('.keyboard__row')
      const row = document.createElement('div')
      const backSlash = document.getElementById('Backslash')
      const bracketLeft = document.getElementById('BracketLeft')
      const bracketRight = document.getElementById('BracketRight')
      const semicolon = document.getElementById('Semicolon')
      const quote = document.getElementById('Quote')
      const comma = document.getElementById('Comma')
      const period = document.getElementById('Period')
      const slash = document.getElementById('Slash')
      let alphabet = null

      this.properties.shift = false
      this.checkPressedBtn(btn, event)
      row.className = 'keyboard__row row-1'
      if (this.properties.rusLang) {
        alphabet = this.alphabet.eng
      } else {
        alphabet = this.alphabet.rus
      }
      for (let i = 0; i < alphabet[0].length; i = 1 + i) {
        const standardBtn = document.createElement('div')
        standardBtn.className = `btn btn-1-${i + 1}}`
        standardBtn.id = `${this.keyCode.id[0][i]}`
        standardBtn.innerHTML = alphabet[0][i]
        row.append(standardBtn)
      }
      rows[0].replaceWith(row)
      if (this.properties.rusLang) {
        backSlash.innerHTML = '\\'
        bracketLeft.innerHTML = '['
        bracketRight.innerHTML = ']'
        semicolon.innerHTML = ';'
        quote.innerHTML = '\''
        quote.innerHTML = '\''
        comma.innerHTML = ','
        period.innerHTML = '.'
        slash.innerHTML = '/'
      } else {
        backSlash.innerHTML = '/'
        bracketLeft.innerHTML = 'х'
        bracketRight.innerHTML = 'ъ'
        semicolon.innerHTML = 'ж'
        quote.innerHTML = 'э'
        comma.innerHTML = 'б'
        period.innerHTML = 'ю'
        slash.innerHTML = '.'
      }
    }
  },

  addClickTabHandler() {
    const output = document.querySelector('.input')
    output.value += '  '
  },

  addClickBackspaceHandler() {
    const output = document.querySelector('.input')
    output.setRangeText('', output.selectionStart - 1, output.selectionEnd)
  },

  addClickSpaceHandler() {
    const output = document.querySelector('.input')
    output.setRangeText(' ', output.selectionStart, output.selectionEnd, 'end')
  },

  addClickEnterHandler() {
    const output = document.querySelector('.input')
    output.value += '\n'
  },

  addClickDelHandler() {
    const output = document.querySelector('.input')
    output.setRangeText('', output.selectionStart, output.selectionEnd + 1)
  },

  addClickArrowsHandler(btn) {
    this.printMassage(btn)
  },

  addClickKeyboardHandler() {
    const keyboard = document.querySelector('.keyboard')
    keyboard.addEventListener('mousedown', (e) => {
      const btn = e.target.id
      if (btn === 'CapsLock') {
        this.addCapsLockHandler(btn, e)
      } else if (btn === 'ShiftLeft' || btn === 'ShiftRight') {
        this.addShiftHandler(btn, e)
      } else if (btn === 'Backspace') {
        e.preventDefault()
        this.addClickBackspaceHandler()
      } else if (btn === 'Tab') {
        e.preventDefault()
        this.addClickTabHandler()
      } else if (btn === 'Space') {
        e.preventDefault()
        this.addClickSpaceHandler()
      } else if (btn === 'MetaLeft') {
        this.checkPressedBtn(btn, e)
        this.changeLanguage()
      } else if (btn === 'Enter') {
        e.preventDefault()
        this.addClickEnterHandler()
      } else if (btn === 'Del') {
        e.preventDefault()
        this.addClickDelHandler()
      } else if (btn === 'ArrowLeft' || btn === 'ArrowRight' || btn === 'ArrowUp' || btn === 'ArrowDown') {
        e.preventDefault()
        this.addClickArrowsHandler(btn)
      }
      this.checkPressedBtn(btn, e)
    })
    keyboard.addEventListener('mouseup', (e) => {
      const buttons = document.querySelectorAll('.btn')
      buttons.forEach((btn) => {
        if (btn.id === e.target.id) {
          this.defaultStyle(btn.id)
        }
      })
    })
  },

  listenRealKeyboard() {
    window.addEventListener('keydown', (e) => {
      const btn = e.code
      if (btn === 'CapsLock') {
        this.addCapsLockHandler(btn, e)
      } else if (btn === 'ShiftLeft' || btn === 'ShiftRight') {
        this.addShiftHandler(btn, e)
      } else if (btn === 'AltLeft' || btn === 'AltRight') {
        e.preventDefault()
      } else if (btn === 'Tab') {
        e.preventDefault()
        this.addClickTabHandler()
      } else if (e.altKey && e.ctrlKey) {
        this.checkPressedBtn(btn, e)
        this.changeLanguage()
      }
      this.checkPressedBtn(btn, e)
    })
    window.addEventListener('keyup', (e) => {
      const buttons = document.querySelectorAll('.btn')
      buttons.forEach((btn) => {
        if (btn.id === e.code) {
          this.defaultStyle(btn.id)
        }
      })
    })
  },
}


window.addEventListener('load', () => {
  Keyboard.addElements()
  if (localStorage.getItem('rusLang') === 'null') {
    Keyboard.createKeys(Keyboard.alphabet.eng)
  } else if (localStorage.getItem('rusLang') === 'false') {
    Keyboard.createKeys(Keyboard.alphabet.rus)
  } else {
    Keyboard.createKeys(Keyboard.alphabet.eng)
  }
  Keyboard.listenRealKeyboard()
  Keyboard.addClickKeyboardHandler()
})
