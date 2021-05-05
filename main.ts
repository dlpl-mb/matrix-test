function scrollen () {
    for (let strip = 0; strip < hwy; strip++) {
        let sh = (strip % 2) ? -1:1
        zstrip[strip].shift(sh)
    }
}
function show_streifen_x(bit:number=0,x_add:number=0) {
    zeichen_matrix.forEach(function (zahl, zeile) {
        if (zahl & Math.pow(2, bit)) {
            let b=bit+x_add
            let px=(zeile % 2) ? (hwx-1-b):b
            zstrip[zeile].setPixelColor(px, neopixel.colors(NeoPixelColors.Green))
        }
    })
    gesamt.show()
}
function showtext (txt:string="A",scroll_flag:boolean=false) {
    const center=Math.floor((hwx-zch_bit_breite)/2)
    gesamt.clear()
    for (let bst_pos = 0; bst_pos < txt.length; bst_pos++) {
        if (!scroll_flag) {
            gesamt.clear()
        }
        zeichen_matrix=get_bst_matrix(txt[bst_pos])
        let str = zch_bit_breite;
        for (let n=str;n>=0;n--) {
            if (scroll_flag) {
                show_streifen_x(n,-n)
                basic.pause(pause_scroll)
                scrollen()
            } else {
                show_streifen_x(n,center)
            }
        }
        gesamt.show()
        if (!scroll_flag) {
            basic.pause(pause_bst)
        }    
    }
}



input.onButtonPressed(Button.A, function () {
    showtext("1+1=2 öäü",true)
})
function init_alphabet () {
    // bstreihenfolge einhalten
    // bst_reihe = "? ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜäöüZ0123456789!?.,*+-=≠:%abcdefghijklmnopqrstuvwxyz#$&()/@;<>[]|{}~€"; //99
  bst_reihe = "? ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789!?+-.:=≠*abcdefghijklmnopqrstuvwxyzäöü"; //50+29

    arr_zeichen = [
        [14, 17, 1, 2, 4, 0, 4],
        [0, 0, 0, 0, 0, 0, 0],
        [14, 17, 17, 31, 17, 17, 17],
        [30, 17, 17, 30, 17, 17, 30],
        [14, 17, 16, 16, 16, 17, 14],
        [30, 17, 17, 17, 17, 17, 30],
        [31, 16, 16, 30, 16, 16, 31],
        [31, 16, 16, 30, 16, 16, 16],
        [14, 17, 16, 23, 17, 17, 14],
        [17, 17, 17, 31, 17, 17, 17],
        [14, 4, 4, 4, 4, 4, 14],
        [15, 2, 2, 2, 2, 18, 12],
        [17, 18, 20, 24, 20, 18, 17],
        [16, 16, 16, 16, 16, 16, 31],
        [17, 27, 21, 21, 17, 17, 17],
        [17, 17, 25, 21, 19, 17, 17],
        [14, 17, 17, 17, 17, 17, 14],
        [30, 17, 17, 30, 16, 16, 16],
        [14, 17, 17, 17, 21, 18, 13],
        [30, 17, 17, 30, 20, 18, 17],
        [14, 17, 16, 14, 1, 17, 14],
        [31, 4, 4, 4, 4, 4, 4],
        [17, 17, 17, 17, 17, 17, 14],
        [17, 17, 17, 17, 17, 10, 4],
        [17, 17, 17, 21, 21, 27, 17],
        [17, 17, 10, 4, 10, 17, 17],
        [17, 17, 10, 4, 4, 4, 4],
        [31, 1, 2, 4, 8, 16, 31],
        [10, 0, 4, 10, 17, 31, 17],
        [17, 14, 17, 17, 17, 17, 14],
        [17, 0, 17, 17, 17, 0, 14],
        [14, 17, 19, 21, 25, 17, 14],
        [4, 12, 4, 4, 4, 4, 14],
        [14, 17, 1, 2, 4, 8, 31],
        [31, 2, 4, 2, 1, 17, 14],
        [2, 6, 10, 18, 31, 2, 2],
        [31, 16, 30, 1, 1, 17, 14],
        [6, 8, 16, 30, 17, 17, 14],
        [31, 1, 2, 4, 4, 4, 4],
        [14, 17, 17, 14, 17, 17, 14],
        [14, 17, 17, 15, 1, 2, 12],
            [4, 4, 4, 4, 4, 0, 4],
            [14, 17, 1, 2, 4, 0, 4],
        [0, 4, 4, 31, 4, 4, 0],
        [0, 0, 0, 31, 0, 0, 0],
            [0, 0, 0, 0, 12, 12, 0],
            [0,12, 12, 0, 12, 12, 0],
        [0, 0, 31, 0, 31, 0, 0],
        [1, 2, 31, 4, 31, 8, 16],
            [0, 4, 21, 14, 21, 4, 0],
    [0, 0, 14, 1, 15, 17, 15],
    [16, 16, 22, 25, 17, 17, 14],
    [0, 0, 14, 16, 16, 17, 14],
    [1, 1, 13, 19, 17, 17, 15],
    [0, 0, 14, 17, 31, 16, 14],
    [2, 5, 4, 14, 4, 4, 4],
    [0, 0, 15, 17, 15, 1, 14],
    [16, 16, 22, 25, 17, 17, 17],
    [4, 0, 12, 4, 4, 4, 14],
    [2, 0, 2, 2, 2, 18, 12],
    [8, 8, 9, 10, 12, 10, 9],
    [12, 4, 4, 4, 4, 4, 14],
    [0, 0, 26, 21, 21, 21, 21],
    [0, 0, 22, 25, 17, 17, 17],
    [0, 0, 14, 17, 17, 17, 14],
    [0, 0, 30, 17, 30, 16, 16],
    [0, 0, 15, 17, 15, 1, 1],
    [0, 0, 11, 12, 8, 8, 8],
    [0, 0, 15, 16, 14, 1, 30],
    [4, 14, 4, 4, 4, 5, 2],
    [0, 0, 17, 17, 17, 19, 13],
    [0, 0, 17, 17, 17, 10, 4],
    [0, 0, 17, 17, 17, 21, 10],
    [0, 0, 25, 6, 4, 12, 19],
    [0, 0, 17, 9, 6, 4, 24],
    [0, 0, 31, 2, 4, 8, 31],
        [10, 0, 14, 1, 15, 17, 15],
        [10, 0, 0, 14, 17, 17, 14],
        [10, 0, 0, 17, 17, 17, 14]
    ]

}
function init () {
    gesamt = neopixel.create(DigitalPin.P0, 64, NeoPixelMode.RGB)
    gesamt.setBrightness(80)
    gesamt.showColor(neopixel.colors(NeoPixelColors.Black))
    gesamt.clear()
    for (let n = 0; n <= 7; n++) {
        zstrip[n] = gesamt.range(n * hwx, hwx)
    }
    showtext("ABCDÜÖÄöäü",false)
}

//pins.setAudioPin(AnalogPin.P8)
let zeichen_matrix: Array<number> = []
let bst_reihe: string = ""
const zch_bit_breite:number=5
let pause_bst:number=2000
let pause_scroll:number=200
let hwx=8
let hwy=8

let zstrip: neopixel.Strip[] = []
let akt_streifen_pos = 0
let gesamt: neopixel.Strip = null

let arr_zeichen: number[][];
basic.showIcon(IconNames.Heart)
init_alphabet()
init()
function get_bst_matrix(zch: string = "A") {
    let found = bst_reihe.indexOf(zch)
    if (found==-1) {
        found=0;
    }
    return arr_zeichen[found]
}
