serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    OLED.writeStringNewLine(serial.readString())
})
let connect_status = 0
OLED.init(128, 64)
let strip = neopixel.create(DigitalPin.P2, 8, NeoPixelMode.RGB)
strip.setBrightness(255)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
while (ESP8266_IoT.wifiState(false)) {
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
    "API key",
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
    Environment.octopus_BME280(Environment.BME280_state.BME280_pressure),
    Environment.octopus_BME280(Environment.BME280_state.BME280_altitude)
    )
    OLED.newLine()
    OLED.writeStringNewLine("Temp: " + Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeStringNewLine("Hum: " + Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    OLED.newLine()
    OLED.writeStringNewLine("Pr: " + Environment.octopus_BME280(Environment.BME280_state.BME280_pressure))
    OLED.newLine()
    OLED.writeStringNewLine("Alt: " + Environment.octopus_BME280(Environment.BME280_state.BME280_altitude))
    OLED.newLine()
    ESP8266_IoT.uploadData()
    strip.setPixelColor(0, neopixel.colors(NeoPixelColors.Red))
    strip.setPixelColor(1, neopixel.colors(NeoPixelColors.Orange))
    strip.setPixelColor(2, neopixel.colors(NeoPixelColors.Yellow))
    strip.setPixelColor(3, neopixel.colors(NeoPixelColors.Green))
    strip.setPixelColor(4, neopixel.colors(NeoPixelColors.Blue))
    strip.setPixelColor(5, neopixel.colors(NeoPixelColors.Indigo))
    strip.setPixelColor(6, neopixel.colors(NeoPixelColors.Violet))
    strip.setPixelColor(7, neopixel.colors(NeoPixelColors.Purple))
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
