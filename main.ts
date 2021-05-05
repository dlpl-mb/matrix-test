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
    showtext("ABCDEFGHI",true)
})
function init_alphabet () {
    // bstreihenfolge einhalten
    // bst_reihe = "? ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜäöüZ0123456789!?.,*+-=≠:%abcdefghijklmnopqrstuvwxyz#$&()/@;<>[]|{}~€"; //99
    // 50+29
    
    bst_reihe = "? ABCDEFG"
    // HIJKLMNOPQRSTUVWXYZÄÖÜ0123456789!?+-.:=≠*abcdefghijklmnopqrstuvwxyzäöü"
    arr_zeichen = [[14, 17, 1, 2, 4, 0, 4], [0, 0, 0, 0, 0, 0, 0], [14, 17, 17, 31, 17, 17, 17], [30, 17, 17, 30, 17, 17, 30], [14, 17, 16, 16, 16, 17, 14], [30, 17, 17, 17, 17, 17, 30], [31, 16, 16, 30, 16, 16, 31], [31, 16, 16, 30, 16, 16, 16], [14, 17, 16, 23, 17, 17, 14], [17, 17, 17, 31, 17, 17, 17]]
}
function init () {
    
    gesamt = neopixel.create(DigitalPin.P0, 64, NeoPixelMode.RGB)
    gesamt.setBrightness(80)
    gesamt.showColor(neopixel.colors(NeoPixelColors.Black))
    gesamt.clear()
    for (let n = 0; n <= 7; n++) {
        zstrip[n] = gesamt.range(n * hwx, hwx)
    }
    // scrolltext("ABCDEFGHI")
    showtext("ABCDEFGHI",false)
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
