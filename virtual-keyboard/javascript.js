const Keyboard = {
    elements: {
        main: null,
        keysContainer: null, 
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: null, 
        CapsLock: false
    }, 

    init() {
        //create
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        //settigns
        this.elements.main.classList.add("keyboard", "keyboard-hidden");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.keysContainer.appendChild(this.createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");
        //add DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //auto
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            document.addEventListener("click", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                    console.log('lol');
                });
            });
        });
    },

    createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "done", "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
            "space"
        ];

        const keyRuLayout = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з",
            "caps", "shift", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "enter",
            "done", "я", "ч", "с", "м", "и", "т", "ь", ",", ".", "?",
            "space"
        ];

        //create HTML icon
        const createHTMLicon = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

            //add atributes/clsess
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.innerHTML = createHTMLicon("backspace");

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this.eventTrigger("oninput");
                    });

                    break;

                case 'caps':
                    keyElement.classList.add('keyboard-key-wide', 'keyboard-key-activatable');
                    keyElement.innerHTML = createHTMLicon("keyboard_capslock");

                    keyElement.addEventListener('click', () => {
                        this.capsLockToggle();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.CapsLock);
                    });

                    break;

                case 'enter':
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.innerHTML = createHTMLicon("keyboard_return");

                    keyElement.addEventListener('click', () => {
                        this.properties.value += "\n";
                        this.eventTrigger("oninput");
                    });

                    break;

                case 'space':
                    keyElement.classList.add('keyboard-key-extra-wide');
                    keyElement.innerHTML = createHTMLicon("space_bar");

                    keyElement.addEventListener('click', () => {
                        this.properties.value += " ";
                        this.eventTrigger("check_circle");
                    });

                    break;

                case 'done':
                    keyElement.classList.add('keyboard-key-wide', 'keyboard-key-dark');
                    keyElement.innerHTML = createHTMLicon("done");

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this.eventTrigger("onclose");
                    });

                    break;

                case 'shift':
                    keyElement.classList.add('keyboard-key-wide');
                    keyElement.classList.add('func-kb');
                    keyElement.innerHTML = createHTMLicon("keyboard_shift");

                    keyElement.addEventListener('click', () => {
                        key.textContent = key.toUpperCase();
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += this.properties.CapsLock ? key.toUpperCase() : key.toLowerCase();
                        this.eventTrigger("oninput");
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if(insertLineBreak) {
                fragment.appendChild(document.createElement("span"));
            }
        });

        return fragment;
    },

    eventTrigger(handlerName) {
        console.log('Event Triggered! EventName: ' + handlerName);
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    capsLockToggle() {
        console.log('CapsLock toggled!');
        this.properties.CapsLock = !this.properties.CapsLock;
        for (const key of this.elements.keys) {
            // if (key.classList.contains('func-kb'))
            key.textContent = this.properties.CapsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
        }
    },

    open(initialalue, oninput, onclose) {
        this.properties.value = initialalue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard-hidden');
    }, 

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }
}

Keyboard.init();
