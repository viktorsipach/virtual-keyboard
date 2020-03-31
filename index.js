const Keyboard = {

  alphabet: {
    rus: [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'del'],
      ['capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
      ['shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'up', 'shift'],
      ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', 'left', 'down', 'right']],

    eng: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'del'],
      ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter'],
      ['shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift'],
      ['ctrl', 'win', 'alt', ' ', 'alt', 'ctrl', 'left', 'down', 'right']],

  },

  keyCode: {
    id: [['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
      ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'del'],
      ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
      ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
      ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']],
  },

  properties: {
    capsLock: false,
    shift: false,
    alt: false,
    rusLang: false,
  },

  addElements() {
    const input = document.createElement('textarea')
    const section = document.createElement('section')
    const keyboard = document.createElement('div')
    section.className = 'main'
    input.className = 'input'
    keyboard.className = 'keyboard'
    document.body.append(section)
    document.querySelector('.main').appendChild(input)
    document.querySelector('.main').appendChild(keyboard)
  },

  createKeys(alphabet) {
    for (let i = 0; i < alphabet.length; i = 1 + i) {
      const row = document.createElement('div')
      row.className = `keyboard__row row-${i + 1}`
      document.querySelector('.keyboard').appendChild(row)
      for (let j = 0; j < alphabet[i].length; j = 1 + j) {
        const btn = document.createElement('div')
        btn.className = `btn btn-${i + 1}-${j + 1}}`
        btn.id = `${this.keyCode.id[i][j]}`
        document.querySelector(`.row-${i + 1}`).append(btn)
        if (this.properties.capsLock) {
          btn.innerHTML = alphabet[i][j].toUpperCase()
        } else {
          btn.innerHTML = alphabet[i][j]
        }
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
    const pressed = new Set()
    const codes = ['ShiftLeft', 'AltLeft']
    document.addEventListener('keydown', (e) => {
      pressed.add(e.code)
      for (const code of codes) {
        if (!pressed.has(code)) {
          return
        }
        pressed.clear()
        const delElem = document.querySelectorAll('.keyboard__row')
        for (let i = 0; i < delElem.length; i = 1 + i) {
          delElem[i].remove()
        }
        if (this.properties.rusLang) {
          this.properties.rusLang = false
          this.createKeys(this.alphabet.rus)
        } else {
          this.properties.rusLang = true
          this.createKeys(this.alphabet.eng)
        }
      }
    })
    document.addEventListener('keyup', (e) => {
      pressed.delete(e.code)
    })
  },

  printMassege(btn) {
    const output = document.querySelector('.input')
    const buttons = document.querySelectorAll('.btn')
    buttons.forEach((el) => {
      if (el.id === btn) {
        output.value += el.innerHTML
      }
    })
  },

  checkPressedBtn(btn, event) {
    const mainKeys = ['Backspace', 'del', 'Tab', 'CapsLock', 'Space', 'ShiftLeft', 'Enter', 'ControlLeft',
      'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ArrowUp']
    const buttons = document.querySelectorAll('.btn')
    if (mainKeys.includes(btn)) {
      buttons.forEach((el) => {
        if (el.id === btn) {
          this.animation(el.id)
        }
      })
    } else {
      buttons.forEach((el) => {
        if (el.id === btn) {
          event.preventDefault()
          this.animation(el.id)
          this.printMassege(el.id)
        }
      })
    }
  },

  listenRealKeyboard() {
    window.addEventListener('keydown', (e) => {
      const btn = e.code
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
  Keyboard.createKeys(Keyboard.alphabet.eng)
  Keyboard.changeLanguage()
  Keyboard.listenRealKeyboard()
})
