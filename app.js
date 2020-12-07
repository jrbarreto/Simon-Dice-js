const bBox0 = document.getElementById('bBox0')
const bBox1 = document.getElementById('bBox1')
const bBox2 = document.getElementById('bBox2')
const bBox3 = document.getElementById('bBox3')
const bBox4 = document.getElementById('bBox4')
const bBox5 = document.getElementById('bBox5')
const bBox6 = document.getElementById('bBox6')
const bBox7 = document.getElementById('bBox7')
const bBox8 = document.getElementById('bBox8')
const uBox0 = document.getElementById('uBox0')
const uBox1 = document.getElementById('uBox1')
const uBox2 = document.getElementById('uBox2')
const uBox3 = document.getElementById('uBox3')
const uBox4 = document.getElementById('uBox4')
const uBox5 = document.getElementById('uBox5')
const uBox6 = document.getElementById('uBox6')
const uBox7 = document.getElementById('uBox7')
const uBox8 = document.getElementById('uBox8')
const btnStart = document.getElementById('btnStart')
const FINAL_LEVEL = 2

class Game {
  constructor() {
    this.initialize()
    this.generateSequence()
    setTimeout(() => this.nextLevel(), 500)
  }

  initialize() {
    // this.nextLevel = this.nextLevel.bind(this)
    this.chooseUserBox = this.chooseUserBox.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.botBoxes = {
      bBox0,
      bBox1,
      bBox2,
      bBox3,
      bBox4,
      bBox5,
      bBox6,
      bBox7,
      bBox8,
    }
    this.userBoxes = {
      uBox0,
      uBox1,
      uBox2,
      uBox3,
      uBox4,
      uBox5,
      uBox6,
      uBox7,
      uBox8,
    }
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }

  generateSequence() {
    this.sequence = new Array(FINAL_LEVEL).fill(0).map(n => Math.floor(Math.random() * 9))
  }

  nextLevel() {
    this.subLevel = 0
    this.illuminateBotSequence()
    this.addClickEvents()
  }

  transformNumberToBotBox(number) {
    switch(number) {
      case 0:
        return 'bBox0'
      case 1:
        return 'bBox1'
      case 2:
        return 'bBox2'
      case 3:
        return 'bBox3'
      case 4:
        return 'bBox4'
      case 5:
        return 'bBox5'
      case 6:
        return 'bBox6'
      case 7:
        return 'bBox7'
      case 8:
        return 'bBox8'
    }
  }

  transformUserBoxToNumber(uBox) {
    switch(uBox) {
      case 'uBox0':
        return 0
      case 'uBox1':
        return 1
      case 'uBox2':
        return 2
      case 'uBox3':
        return 3
      case 'uBox4':
        return 4
      case 'uBox5':
        return 5
      case 'uBox6':
        return 6
      case 'uBox7':
        return 7
      case 'uBox8':
        return 8
    }
  }

  illuminateBotSequence() {
    for(let i = 0; i < this.level; i++) {
      const bBox = this.transformNumberToBotBox(this.sequence[i])
      setTimeout(() => this.lightBotBox(bBox), 1000 * i)
    }
  }

  lightBotBox(bBox) {
    this.botBoxes[bBox].classList.add('light')
    setTimeout(() => this.offBotBox(bBox), 400)
  }

  offBotBox(bBox) {
    this.botBoxes[bBox].classList.remove('light')
  }

  addClickEvents() {
    this.userBoxes.uBox0.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox1.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox2.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox3.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox4.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox5.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox6.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox7.addEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox8.addEventListener('click', this.chooseUserBox)
  }

  deleteClickEvents() {
    this.userBoxes.uBox0.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox1.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox2.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox3.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox4.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox5.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox6.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox7.removeEventListener('click', this.chooseUserBox)
    this.userBoxes.uBox8.removeEventListener('click', this.chooseUserBox)
  }

  chooseUserBox(ev) {
    // console.log(ev)
    const userBoxName = ev.target.dataset.ubox
    console.log(userBoxName)
    const numberUserBox = this.transformUserBoxToNumber(userBoxName)
    this.lightUserBox(userBoxName)
    if (numberUserBox === this.sequence[this.subLevel]) {
      this.subLevel++
      if (this.subLevel === this.level) {
        this.level++
        this.deleteClickEvents()
        if (this.level === (FINAL_LEVEL + 1)) {
          this.wonTheGame()
        } else {
          setTimeout(() => this.nextLevel(), 2000)
        }
      }
    } else {
      this.lostTheGame()
    }
  }

  lightUserBox(uBox) {
    this.userBoxes[uBox].classList.add('light')
    setTimeout(() => this.offUserBox(uBox), 300)
  }

  offUserBox(uBox) {
    this.userBoxes[uBox].classList.remove('light')
  }

  wonTheGame() {
    swal('Felicitaciones!', 'Ganaste el juego', 'success')
      .then(() => this.initialize())
  }

  lostTheGame() {
    swal('Lamentable!', 'Perdiste el juego', 'error')
      .then(() => {
        this.deleteClickEvents()
        this.initialize()
      })
  }
}

function startGame() {
  window.game = new Game ()
}