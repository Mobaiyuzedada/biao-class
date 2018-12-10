window.biaoDropdown = {
    boot,
};

function boot(triggerSelector = '#trigger',dropdownSelector = '.dropdown') {
    const dd = document.querySelectorAll(dropdownSelector)[0];
    const trigger=document.querySelector(triggerSelector);

    dd.classList.add('my-dropdown');
    trigger.classList.add('my-btn');

    document.body.addEventListener('click', (e) => {
        // if (e.target.id === trigger.id) {
        //     dd.hidden = !dd.hidden;
        //     return;
        // } else if (!e.target.closest(`.${dd.className}`)) {
        //     dd.hidden = true;
        // }
        if (e.target.id === trigger.id) {
            dd.hidden = !dd.hidden;
            return;
        } else if (!e.target.closest(dropdownSelector)) {
            dd.hidden = true;
        }

    })
};