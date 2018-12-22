

let form;

window.biaoForm = function (formSelector, onSuccess) {
    form = document.querySelector(formSelector);
    form.addEventListener('submit', e => {
        e.preventDefault();
        onSuccess(getData());
        form.reset();
    })
    return {
        getData,//相当于getData:getData
        setData,//相当于setData:setData
    };
}






/**
 * 解析表单数据
 *
 * @param {HTMLFormElement} form 选好的form元素
 * @return {Object}
 */
function getData() {
    let data = {};
    let inputs = form.querySelectorAll('[name]');

    inputs.forEach(it => {
        switch (it.type) {
            case 'number':
                data[it.name] = parseFloat(it.value);
                break;
            case 'radio':
                // if (!it.checked)
                //     return;
                // data[it.name]=it.value;
                if (it.checked)
                    data[it.name] = it.value;
                break;
            case 'checkbox':
                if (!Array.isArray(data[it.name]))
                    data[it.name] = [];
                if (it.checked)
                    data[it.name].push(it.value);
                break;
            default:
                data[it.name] = it.value;
                break;
            case 'week':
            case 'date':
                data[it.name] = it.valueAsDate;
                break;
        }


        // data[it.name] = val;
    });
    return data;
}
/**
 * 填充表单
 *
 * @param {Object} data 要填充的数据
 * @param {HTMLFormElement} form 目标表单
 */


function setData(data) {
    for (let key in data) {
        let input = form.querySelector(`[name=${key}]`);
        switch (input.type) {
            case 'radio':
                let radio = form.querySelector(`[type=radio][name=${key}][value=${data[key]}]`);
                radio && (radio.checked = true);
                break;
            default:
                input.value = data[key];
                break;
            case 'checkbox':
                data[key].forEach(it => {
                    let check = form.querySelector(`[type=checkbox][name=${key}][value=${it}]`)
                    // console.log(check);
                    check && (check.checked = true);
                });
                break;
        }
    }
}