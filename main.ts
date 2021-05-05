function scrolle () {
    for (let strip = 0; strip <= 7; strip++) {
        let sh = (strip % 2) ? -1:1
        zstrip[strip].shift(sh)
    }
}

function scrolltext (txt:string="A") {
    for (let bst_pos = 0; bst_pos < txt.length; bst_pos++) {
        zeichen_matrix=get_bst_matrix(txt[bst_pos])
        let str = 4 + 1;  //breite der buchstaben
        for (let n=str;n>=0;n--) {
            show_streifen_x(n)
            basic.pause(100)
            scrolle()
        }
    }
    gesamt.show()
}
function show_streifen_x(bit:number=0,x_add:number=0) {
    let mx = 8;
    let my = 8;

    zeichen_matrix.forEach(function (zahl, zeile) {
        //for (let bit = pos_bit_x; bit>(pos_bit_x-anzahl); bit--) {
            if (zahl & Math.pow(2, bit)) {
                let b=0
                b=bit+x_add
                let px=(zeile % 2) ? (7-b):b
                zstrip[zeile].setPixelColor(px, neopixel.colors(NeoPixelColors.Green))
            }
        //}
    })
    gesamt.show()
}

function showtext (txt:string="A",scroll_flag:boolean=false) {
    for (let bst_pos = 0; bst_pos < txt.length; bst_pos++) {
        gesamt.clear()
        zeichen_matrix=get_bst_matrix(txt[bst_pos])
        let str = 4 + 1;  //breite der buchstaben
        for (let n=str;n>=0;n--) {
            show_streifen_x(n,2)
            basic.pause(50)    
            if (scroll_flag) {
                scrolle()
            }
        }
        gesamt.show()
        basic.pause(2000)
    }
    //gesamt.show()
}

input.onButtonPressed(Button.A, function () {
    scrolltext("ABCDEFGHI")
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
        zstrip[n] = gesamt.range(n * 8, 8)
    }
    //scrolltext("ABCDEFGHI")
    showtext("ABCDEFGHI")
}

//pins.setAudioPin(AnalogPin.P8)
let zeichen_matrix: Array<number> = []
let bst_reihe: string = ""
let pkt = 0
let f = 0
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
