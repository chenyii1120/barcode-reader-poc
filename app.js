var firstDeviceId = null;
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('status').textContent = 'OK';
    document.getElementById('script_ver').textContent = '11';

    const codeReader = new ZXing.BrowserMultiFormatReader();
    const videoElement = document.getElementById('video');

    codeReader.listVideoInputDevices()
    .then(videoInputDevices => {
        if (firstDeviceId == null){
            firstDeviceId = videoInputDevices[0].deviceId;
        }
        // const firstDeviceId = videoInputDevices[0].deviceId;
        document.getElementById('cam_id').textContent = firstDeviceId;
        document.getElementById('cam_id_list').textContent = videoInputDevices;
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
            .catch(err => console.error(err));
});

