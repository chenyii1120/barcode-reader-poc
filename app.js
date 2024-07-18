var firstDeviceId;
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('status').textContent = 'OK';
    document.getElementById('script_ver').textContent = '13';

    const codeReader = new ZXing.BrowserMultiFormatReader();

    codeReader.listVideoInputDevices()
    .then(videoInputDevices => {
        firstDeviceId = videoInputDevices[0].deviceId;
    });

    document.getElementById('startButton').addEventListener('click', () => {

        let activeStream = null;

        codeReader.decodeFromVideoDevice(firstDeviceId, 'video', (result, err) => {
            if (result) {
                document.getElementById('barcodeResult').textContent = result.text;
                console.log(result);

                // 停止相機
                if (activeStream) {
                    activeStream.getTracks().forEach(track => track.stop());
                }
                codeReader.reset();
            }
            if (err && !(err instanceof ZXing.NotFoundException)) {
                console.error(err);
                document.getElementById('barcodeResult').textContent = err;
            }
        })
    })
});

