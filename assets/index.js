document.addEventListener('alpine:init', () => {
    Alpine.data('data', () => {
        return {
            imageUrl: '/assets/image/placeholder.png',
            outputResult: '',
            progressStatus: '就绪.',
            progressValue: 100,
            simdSupported: false,
            selectedLang: 'eng',

            pasteHandler: function (event) {
                var items = (event.clipboardData || event.originalEvent.clipboardData).items;
                if (items.length > 0) {
                    var item = items[0];
                    if (item.kind === 'file') {
                        var blob = item.getAsFile();
                        for (var index in items) {
                            var item = items[index];
                            if (item.kind === 'file') {
                                var blob = item.getAsFile();
                                this.recognize(blob);
                                break;
                            }
                        }
                    }
                }
            },
            langChangeHandler: function (event) {
                console.log(event);
                this.recognizeImgBox();
            },
            inputChangeHandler: function (event) {
                var items = event.target.files;
                if (items.length > 0) {
                    this.recognize(items[0]);
                }
                this.preventDefaults(event);
            },
            dropHandler: function (event) {
                var items = event.dataTransfer.files;
                if (items.length > 0) {
                    this.recognize(items[0]);
                }
                this.preventDefaults(event);
            },
            preventDefaults: function (event) {
                event.preventDefault();
                event.stopPropagation();
            },
            recognize: function (file) {
                const reader = new FileReader();
                reader.addEventListener('load', event => {
                    this.imageUrl = event.target.result;
                    this.recognizeImgBox();
                });
                reader.readAsDataURL(file);
            },
            recognizeImgBox: function(){
                Tesseract.recognize(
                    document.getElementById("imgbox"),
                    this.selectedLang,
                    {
                        workerPath: '/assets/core/worker.min.js',
                        corePath: this.simdSupported ? '/assets/core/tesseract-core-simd.wasm.js' : '/assets/core/tesseract-core.wasm.js',
                        langPath: '/assets/lang-data',
                        logger: m => {
                            this.progressStatus = m.status;
                            this.progressValue = Math.ceil(m.progress * 100);
                        }
                    }
                ).then(({ data: { text } }) => {
                    this.outputResult = text;
                    this.progressStatus = '就绪.';
                });
            }
        }
    })
})