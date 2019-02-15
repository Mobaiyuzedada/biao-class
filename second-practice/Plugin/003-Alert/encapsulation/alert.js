/*
|-------------------------------------------------------
| encapsulation with oop
|-------------------------------------------------------
*/

; (function () {
    'use strict';

    class Alert {
        constructor(title, { type = 'info', el = 'body', timeout = 3000, alert_container = '.alert-container', content, } = {}) {
            this.title = title;
            this.type = type;
            this.timeout = timeout;
            this.alert_container = alert_container;
            this.content = content;
            this.el = document.querySelector(`${el}`);
            this.container;

            this.prepareEnv();
            this.render();
        }
        prepareEnv() {
            this.container = document.querySelector(this.alert_container);
            if (this.container)
                return;
            console.log('done');
            this.container = document.createElement('div');
            this.container.classList.add('alert-container');
            console.log(this.el);
            this.el.appendChild(this.container);
        }
        render() {
            let item = document.createElement('div');
            item.classList.add('alert-item');
            item.classList.add(this.type);
            item.innerHTML = `
                <div class="inner">
                    <div class="title">${this.title}</div>
                    ${this.content ?
                    `<div class="content">
                        ${this.content}
                    </div>` : ''
                }
                </div>
                <div class="close-alert">
                    <span></span>
                </div>
            `
            this.container.appendChild(item);
            this.show(item, this.timeout);
            item.querySelector('.close-alert')
                .addEventListener('click', () => {
                    item.remove();
                })
        }
        show(item, timeout) {
            // config.el.hidden = false;
            if (!timeout)
                return;
            setTimeout($ => {
                item.remove();
            }, timeout);
        }
    }

    window.Alert = Alert;
})();

