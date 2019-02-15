; (function () {
    'use strict';


    window.Alert = Alert;
    let container;
    const Default_config = {
        type: 'info',
        el: 'body',
        timeout: 3000,
        alert_container: '.alert-container',
    }
    function prepareEnv(config) {
        container = document.querySelector(config.alert_container);
        if (container)
            return;
        console.log('done');
        container = document.createElement('div');
        container.classList.add('alert-container');
        config.el.appendChild(container);
    }
    function Alert(title, config) {
        config = { ...Default_config, ...config, title };
        config.el = document.querySelector(`${config.el}`);
        prepareEnv(config);
        console.log(config);
        render(config);
    }
    function render(config) {
        let item = document.createElement('div');
        // config.el.hidden = true;
        item.classList.add('alert-item');
        item.classList.add(config.type);
        item.innerHTML = `
            <div class="inner">
                <div class="title">${config.title}</div>
                ${config.content ?
                `<div class="content">
                    ${config.content}
                </div>` : ''
            }
            </div>
            <div class="close-alert">
                <span></span>
            </div>
        `
        container.appendChild(item);
        show(item, config.timeout);
        item.querySelector('.close-alert')
            .addEventListener('click', () => {
                item.remove();
            })
    }
    function show(item, timeout) {
        // config.el.hidden = false;
        if (!timeout)
            return;
        setTimeout($ => {
            item.remove();
        }, timeout);
    }
})();