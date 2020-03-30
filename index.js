const Keyboard = {

  alphabet: {
    rus: [['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL'],
      ['capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter'],
      ['shiftleft', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'up', 'shift'],
      ['ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'down', 'right']],

    eng: [['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],
      ['tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL'],
      ['capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter'],
      ['shiftleft', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'up', 'shift'],
      ['ctrl', 'win', 'alt', 'space', 'alt', 'ctrl', 'left', 'down', 'right']],
  },

  properties: {
    capsLock: false,
    shift: false,
    alt: false,
    rusLang: true,
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
        btn.className = `btn btn-${i + 1}-${j + 1} ${alphabet[i][j]}`
        document.querySelector(`.row-${i + 1}`).append(btn)
        btn.innerHTML = alphabet[i][j]
      }
    }
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

}

window.addEventListener('load', () => {
  Keyboard.addElements()
  Keyboard.createKeys(Keyboard.alphabet.rus)
  Keyboard.changeLanguage()
})
