export default class Mask {
    constructor(element,options = {}){
        if (!element) return;
        var _this = this;
        this.symbol = options.symbol || '_'; // Символ заменитель незаполненных ячеек
        this.mask = options.mask || '+7 (___) ___-__-__'; // Маска с учётом символа заменителя
        this.allowedChars = options.allowedChars || '[0-9]'; // Разрешённые символы (будут частью регекспа)
        this.empty = options.empty || 'false'; // Разрешить пустое поле
        this.legalLength = options.legalLength; // Допустимые длины заполнения

        this.element = element;
        element.value = this.value = this.mask;

        this.regex = `${this.allowedChars}|${this.symbol}`;
        this.maskSymbols = this.mask.match(new RegExp(this.regex,'gi'));
        this.allowedCharsLength = 0;
        this.maskSymbols.forEach( elem => {
            if (elem == this.symbol)
                this.allowedCharsLength++;
        });

        // Это индикатор того, вводилась ли первой 8 или еще нет
        // Далее на 93 строку
        this.phonePrefix = false;

        this.checkKeyCodeSupport();

        element.addEventListener('focus', function() {
            requestAnimationFrame( ()=>{
                requestAnimationFrame( ()=>{
                    var indexedSymbol = _this.element.value.indexOf(_this.symbol);
                    if (indexedSymbol != -1)
                        _this.caretPosition = indexedSymbol;
                    else
                        _this.caretPosition = _this.element.value.length;

                    _this.setCaretPosition(_this.element,_this.caretPosition,_this.caretPosition);
                });
            });
        });

        element.addEventListener('blur', function() {

            if (!_this.element.value) _this.element.value = _this.mask;

        });

        element.addEventListener('paste', (e) => {
            if (this.method == 'mask') this.pasteWithMask(e);
            if (this.method == 'simpleMask') this.pasteWithSimpleMask(e);
        });

        this.__bindedRoute = this.route.bind(this);
        element.addEventListener('load', this.__bindedRoute);
        // element.addEventListener('input', this.__bindedRoute);
        element.addEventListener('keydown', this.__bindedRoute);


    }

    route(e){

        if (e.keyCode === 0 || e.keyCode === 229)
            this.__simpleMask(e);
        else
            this.__mask(e);
    }

    __simpleMask(e){

        var stack = new Promise((resolve,reject) => {
            requestAnimationFrame( ()=>{
                requestAnimationFrame( ()=>{
                    if (this.value && this.value.length >= this.element.value.length) {
                        reject();
                        this.value = this.element.value;
                    }

                    resolve(this.element.value);
                });
            });

        });

        stack.then( result => {
            var numbers = result.match(new RegExp(this.allowedChars,'ig'));
            return numbers;
        })
            .then( result => {
                var maskArray = this.mask.split('');
                var maskArrayChars = this.mask.match(new RegExp(this.allowedChars,'ig'));
                var count = 0;

                // Если первой ввели 8, то мы ее удаляем и переключаем флаг того,
                // Что 8 первой уже вводили и теперь уже можно вводить ее еще раз
                if (result[1] == 8 && result.length < 3 && !this.phonePrefix) {
                    result.pop();
                    this.phonePrefix = true;
                } else {
                    this.phonePrefix = false;
                }

                for (var i = 0; i < maskArray.length; i++) {
                    if (maskArrayChars && maskArrayChars[count]) {
                        if (result && maskArrayChars[count] == result[count]){
                            count++;
                            continue;
                        }
                    }
                    if (maskArray[i] == this.symbol && result && result[count]) {
                        maskArray[i] = result[count];
                        this.carerPosition = i + 1;
                        count++;
                    } else if (maskArray[i] == this.symbol && result && !result[count]) {
                        maskArray = maskArray.slice(0,i);
                        this.carerPosition = i + 1;
                    }
                }

                return maskArray;
            })
            .then( result => {
                this.value = result.join('');
            })
            .then( ()=>{
                this.displayResult();
            })
            .catch( e => {

            });
    }

    __mask(e){

        if(e.key == "Meta"
            || e.keyIdentifier == "Meta"
            || e.keyCode == 91
            || e.metaKey == true
            || e.ctrlKey == true) {

        } else {
            e.preventDefault();
        }
        var key = this.whatIsKey(e);
        var keys = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Delete'];

        !this.keysArray && (this.keysArray = []);

        if (keys.indexOf(key) === -1) {
            return;
        }

        if (key == 'Backspace' || key == 'Delete') {
            if (!this.keysArray.length) return;
            this.keysArray.pop();
        } else {
            var symbolsInMask = this.mask.match(new RegExp(this.symbol,'ig'));

            if (symbolsInMask.length > this.keysArray.length)
                this.keysArray.push(key);
            // Если первая 8, то увеличиваем длину массива
            else if (this.keysArray[0] == 8 && symbolsInMask.length == this.keysArray.length) {
                this.keysArray.push(key);
            } else return;
        }

        if (this.keysArray.length == 0) {

            this.value = this.mask;
            this.carerPosition = this.mask.indexOf(this.symbol);

        } else {
            var maskArray = this.mask.split('');
            var count = 0;

            // Если первая 8, то не пишем ее и оставляем каретку на месте
            if (this.keysArray[0] == 8) {
                count++;
                this.carerPosition = 4;
            }

            for (var i = 0; i < maskArray.length; i++) {
                if (maskArray[i] == this.symbol && this.keysArray[count]) {
                    maskArray[i] = this.keysArray[count];
                    this.carerPosition = i + 1;
                    count++;
                }
            }

            this.value = maskArray.join('');

        }

        this.displayResult();
    }

    setCaretPosition(ctrl, start, end) {
        // IE >= 9 and other browsers
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(start, end);
        }
        // IE < 9
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    }

    whatIsKey(e){
        var key = null;

        if (e.key) {
            key = e.key;
        }
        else if (event.keyCode) {
            switch ('' + event.keyCode) {
                case '48': key = '0'; break;
                case '49': key = '1'; break;
                case '50': key = '2'; break;
                case '51': key = '3'; break;
                case '52': key = '4'; break;
                case '53': key = '5'; break;
                case '54': key = '6'; break;
                case '55': key = '7'; break;
                case '56': key = '8'; break;
                case '57': key = '9'; break;
                case '8':  key = 'Backspace'; break;
                case '46': key = 'Delete'; break;
            }
        }
        else if (event.keyIdentifier) {
            switch ('' + event.keyIdentifier) {
                case 'U+0030': key = '0'; break;
                case 'U+0031': key = '1'; break;
                case 'U+0032': key = '2'; break;
                case 'U+0033': key = '3'; break;
                case 'U+0034': key = '4'; break;
                case 'U+0035': key = '5'; break;
                case 'U+0036': key = '6'; break;
                case 'U+0037': key = '7'; break;
                case 'U+0038': key = '8'; break;
                case 'U+0039': key = '9'; break;
                case 'U+0008': key = 'Backspace'; break;
            }
        }

        return key;
    }

    pasteWithMask(e){
        var pasteData = e.clipboardData && e.clipboardData.getData('Text');

        Promise.resolve()
            .then( () => {
                if (pasteData) {
                    e.preventDefault();
                    return pasteData.match(new RegExp(this.allowedChars,'gi'));
                } else {
                    return new Promise( resolve => {
                        requestAnimationFrame( ()=>{
                            requestAnimationFrame( ()=>{
                                resolve(this.element.value.match(new RegExp(this.allowedChars,'gi')));
                            });
                        });
                    });
                }
            })
            .then( data => {
                if (!data) throw new Error('Пусто во вставке')
                if (data.length >= this.maskSymbols.length) {
                    this.checkDoubleMaskSymbols(data)
                } else {
                    for (var i = 0; i < data.length; i++) {
                        if (this.keysArray.length < this.allowedCharsLength)
                            this.keysArray.push(data[i]);
                    }
                }
            })
            .then( () => {
                var maskArray = this.mask.split('');
                var count = 0;

                for (var i = 0; i < maskArray.length; i++) {
                    if (maskArray[i] == this.symbol && this.keysArray[count]) {
                        maskArray[i] = this.keysArray[count];
                        this.carerPosition = i + 1;
                        count++;
                    }
                }
                this.value = maskArray.join('');
                this.displayResult();

            })
            .catch((e)=>{
                console.log('Пустота',e);
            });
    }

    pasteWithSimpleMask() {
        this.__simpleMask();
    }

    displayResult(){
        var lengthAllowedChars = this.value && this.value.match( new RegExp(this.allowedChars,'gi') );
        if (this.maskSymbols.length === lengthAllowedChars) {
            if (this.value != this.lastValue) {

                this.lastValue = this.value;
            }
        }

        this.element.value = this.value;
        this.setCaretPosition(this.element,this.carerPosition,this.carerPosition);
        this.element.dispatchEvent(new Event('input'));
    }
    checkKeyCodeSupport(){
        this.method = 'mask';

        var checkKeyCode = (e) => {
            if (this.allowedChars == '[0-9]' && e.keyCode !== 0 || e.keyCode !== 229){
                this.method = 'mask';
            } else {
                this.method = 'simpleMask';
            }
            removeEventListener('keydown',checkKeyCode)
        };

        addEventListener('keydown',checkKeyCode);
    }

    checkDoubleMaskSymbols(data) {
        this.keysArray = [];
        for (var i = 0; i < this.maskSymbols.length; i++) {
            if (data[i] != this.maskSymbols[i] && this.keysArray.length < this.allowedCharsLength) {
                this.keysArray.push(data[i])
            }
        }

        for (;i < data.length;i++) {
            if (this.keysArray.length < this.allowedCharsLength)
                this.keysArray.push(data[i])
            else
                break;
        }
    }

    test(){
        let regexp = new RegExp(this.symbol);
        return !regexp.test(this.value);
    }

    clear() {
        this.keysArray = []
        this.element.value =''
    }
}
