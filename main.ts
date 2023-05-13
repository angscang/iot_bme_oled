input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    OLED.clear()
})
input.onButtonPressed(Button.B, function () {
    basic.clearScreen()
    OLED.clear()
    // calibrate the weight sensor with a known weight item e.g. 85g
    SGBotic.cali_UserLoad(85)
})
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    OLED.writeStringNewLine(serial.readString())
})
let weight = 0
let connect_status = 0
OLED.init(128, 64)
basic.clearScreen()
OLED.writeStringNewLine("Start weighing...")
OLED.newLine()
let strip = neopixel.create(DigitalPin.P2, 10, NeoPixelMode.RGB)
strip.setBrightness(255)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
SGBotic.init_loadcell(
DigitalPin.P16,
DigitalPin.P1
)
SGBotic.loadCell_noLoad(
)
while (ESP8266_IoT.wifiState(false)) {
    // must be mobile data sharing of wifi SSID and password.
    // Can't use guest@SSoE or SWN@SSoE
    ESP8266_IoT.connectWifi("SSID", "password")
    connect_status += 1
    basic.showNumber(connect_status)
    ESP8266_IoT.wait(10000)
}
basic.showIcon(IconNames.Heart)
OLED.newLine()
OLED.writeStringNewLine("Wifi connected")
basic.forever(function () {
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "Thingspeak Write API",
    weight
    )
    ESP8266_IoT.uploadData()
    if (ESP8266_IoT.wifiState(false)) {
        basic.showIcon(IconNames.No)
        OLED.newLine()
        OLED.writeStringNewLine("wifi down")
        ESP8266_IoT.wait(5000)
    } else if (ESP8266_IoT.thingSpeakState(false)) {
        basic.showIcon(IconNames.Sword)
        OLED.newLine()
        OLED.writeStringNewLine("Thingspeak down")
        ESP8266_IoT.wait(5000)
    } else {
        basic.showIcon(IconNames.Heart)
        ESP8266_IoT.wait(5000)
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        OLED.newLine()
        OLED.writeStringNewLine("wifi & Thingspeak ok")
        ESP8266_IoT.wait(15000)
    }
})
basic.forever(function () {
    weight = SGBotic.read_grams(
    )
    basic.showNumber(weight)
    OLED.writeStringNewLine("Weight: " + convertToText(weight))
    OLED.newLine()
    OLED.writeStringNewLine("Weight: " + convertToText(weight))
    OLED.writeStringNewLine("")
    OLED.newLine()
})
basic.forever(function () {
    if (weight >= 200) {
        music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.Once)
    } else if (weight >= 100) {
        music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)
    } else if (weight >= 50) {
        music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    } else if (weight >= 20) {
        music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
    }
})
basic.forever(function () {
    if (weight >= 200) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Blue))
        strip.setPixelColor(5, neopixel.colors(NeoPixelColors.Indigo))
        strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Violet))
        strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Purple))
        strip.setPixelColor(8, neopixel.colors(NeoPixelColors.White))
        strip.setPixelColor(9, neopixel.colors(NeoPixelColors.Red))
        strip.show()
        for (let index = 0; index < 32; index++) {
            basic.pause(100)
            strip.rotate(1)
            strip.show()
        }
        strip.clear()
        for (let index = 0; index < 4; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.White))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
            basic.pause(200)
        }
        strip.clear()
    } else if (weight >= 100) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Blue))
        strip.setPixelColor(5, neopixel.colors(NeoPixelColors.Indigo))
        strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Violet))
        strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Purple))
        strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(9, neopixel.colors(NeoPixelColors.Black))
        strip.show()
        for (let index = 0; index < 32; index++) {
            basic.pause(100)
            strip.rotate(1)
            strip.show()
        }
        strip.clear()
        for (let index = 0; index < 4; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.Orange))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            basic.pause(200)
        }
        strip.clear()
    } else if (weight >= 50) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Blue))
        strip.setPixelColor(5, neopixel.colors(NeoPixelColors.Indigo))
        strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(9, neopixel.colors(NeoPixelColors.Black))
        strip.show()
        for (let index = 0; index < 32; index++) {
            basic.pause(100)
            strip.rotate(1)
            strip.show()
        }
        strip.clear()
        for (let index = 0; index < 4; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Violet))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            basic.pause(200)
        }
        strip.clear()
    } else if (weight >= 20) {
        strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
        strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
        strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
        strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
        strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(5, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(8, neopixel.colors(NeoPixelColors.Black))
        strip.setPixelColor(9, neopixel.colors(NeoPixelColors.Black))
        strip.show()
        for (let index = 0; index < 32; index++) {
            basic.pause(100)
            strip.rotate(1)
            strip.show()
        }
        strip.clear()
        for (let index = 0; index < 4; index++) {
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Indigo))
            basic.pause(200)
            strip.showColor(neopixel.colors(NeoPixelColors.Green))
            basic.pause(200)
        }
        strip.clear()
    }
})
