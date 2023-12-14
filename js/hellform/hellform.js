'use strict';

const hellFormClass = function(){
    /**
     * 
     * @param {string} name 
     * @returns {string}
     */
    this.class = function(name){
        return _class(name);
    };
    /**
     *
     * @param {string} name 
     * @returns {void}
     */
    this.id = function(name){
        return _id(name);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {void}
     */
    this.addPass = function(label, name, func){
        return _add(1,  label, name, func);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {void}
     */
    this.addText = function(label, name, func){
        return _add(0, label, name, func);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {void}
     */
    this.addArea = function(label, name, func){
        return _add(3, label, name, func);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {object} list 
     * @param {function} func 
     * @returns {VOID}
     */
    this.addSelect = function(label, name, list, func){
        return _add(2, label, name, func, list);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {VOID}
     */
    this.addCheckbox = function(label, name, func){
        return _add(4, label, name, func);
    };
    /**
     * 
     * @param {string} title 
     * @param {string} clas 
     * @returns {void}
     */
    this.addTitle = function(title, clas){
        return _addTitle(title, clas);
    };
    /**
     * 
     * @param {string} name 
     * @param {string} id 
     * @param {function} func 
     * @returns {void}
     */
    this.addSubmit = function(name, id, func){
        return _addSubmit(name, id, func);
    };
    /**
     * 
     * @param {string} name 
     * @param {array} list 
     */
    this.updateSelect = function(name, list){
        _selectUpdate(name,list);
    };
    /**
     * 
     * @returns {object}
     */
    this.render = function(){
        return _render();
    };
    /**
     * 
     * @let {object}
     */
    let _title = {};
    /**
     * 
     * @let {array}
     */
    let _forms = [];
    /**
     * 
     * @let {object}
     */
    let _submit = {};
    /**
     * 
     * @let {object}
     */
    let _element;
    /**
     * 
     * @let {boolean}
     */
    let _rendered = false;
    /**
     *
     * @param {string} name 
     * @returns {string}
     */
    const _id = (name)=>{
        return ('hellform_id_'+name);
    };
    /**
     * 
     * @param {string} name 
     * @returns {string}
     */
    const _class = (name)=>{
        return ('hellform_'+name);
    };
    /**
     * 
     * @param  {...string} c 
     * @returns {string}
     */
    const _attreses = (...c)=>{
        let out = '';
        let s = 0;
        for(let i of c){
            if(s>0) out+=' ';
            out+=i;
            s++;
        }
        return out;
    };
    /**
     * 
     * @param {string} tag 
     * @returns {object}
     */
    const _create = function(tag){
        return document.createElement(tag);
    };
    /**
     * 
     * @param {string} type 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @param {array} list 
     */
    const _add = function(type, label, name, func, list){
        let form = {
            type,
            label,
            name,
            func
        };
        if(type === 2){
            form.list = {}; 
            for(let i in list)
                form.list[i.toString()] = list[i].toString(); 
        }
        _forms.push(form);
    };
    /**
     * 
     * @param {string} title 
     * @param {string} clas 
     */
    const _addTitle = function(title, clas){
        _title = {
            'name':title.toString(),
            'clas':clas.toString()
        };
    };
    const _addSubmit = function(title, id, func){
        _submit = {
            'name':title.toString(),
            'id':id.toString(),
            'func':func
        };
    };
    /**
     * 
     * @param  {...any} inner 
     * @returns {object}
     */
    const _lineRender = function(...inner){
        const line =  _create('div');
        line.className = _class('line');
        for(let i of inner)
            line.appendChild(i);
        return line;
    };
    /**
     * 
     * @param {string} label 
     * @param {object} inner 
     * @returns {object}
     */
    const _lineFormRender = function(label, inner){
        return _lineRender(
            _labelRender(label),
            inner
        );
    };
    /**
     * 
     * @param {string} type 
     * @param {string} name 
     * @param {function} func 
     * @param {string} label
     * @returns {object}
     */
    const _input = function(type, name, func, label){
        const input = _create('input');
        _inputAttribute(input, type, name, func);
        if(typeof label !== 'undefined')
            input.setAttribute('placeholder', label);
        return input;
    };
    /**
     * 
     * @param {string} input 
     * @param {string} type 
     * @param {string} name 
     * @param {function} func 
     */
    const _inputAttribute = function(input, type, name, func){
        input.className = _class(type);
        input.setAttribute('type', type);
        input.setAttribute('id', _id(name));
        input.setAttribute('name', name);
        if(type === 'submit') {
            input.addEventListener('click', func); 
        }else
            input.addEventListener('keyup', func); 
    };
    /**
     * 
     * @param {string} label 
     * @returns {object}
     */
    const _labelRender = function(label){
        const elem = _create('div');
        elem.className = _class('label');
        elem.textContent = label;
        return elem;
    };
    /**
     * 
     * @returns {object}
     */
    const _titleRender = function(){
        const title =  _create('div');
        title.className = _attreses(
            _class('title'), 
            _title.clas
        );
        title.textContent = _title.name;
        return _lineRender(title);
    };
    /**
     * 
     * @returns {object}
     */
    const _submitRender = function(){
        const holder =  _create('div');
        const input = _input('submit', _submit.id, _submit.func);
        input.value = _submit.name; 
        holder.className = _class('submit_holder');
        holder.appendChild(input);
        return _lineRender(holder);
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {object}
     */
    const _passRender = function(label, name, func){
        const input = _input('password', name, func, label);
        return _lineFormRender(
            label,
            input
        );
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {object}
     */
    const _checkboxRender = function(label, name, func){
        const input = _input('checkbox', name, func);
        return _lineFormRender(
            label,
            input
        );
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {object}
     */
    const _textRender = function(label, name, func){
        const input = _input('text', name, func, label);
        return _lineFormRender(
            label,
            input
        );
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {function} func 
     * @returns {object}
     */
    const _areaRender = function(label, name, func){
        const area = _create('textarea');
        _inputAttribute(area, 'textarea', name, func);
        return _lineFormRender(
            label,
            area
        );
    };
    /**
     * 
     * @param {string} select 
     * @param {array} list 
     */
    const _optionRender = function(select, list){
        for(let i in list){
            let option = _create('option');
            option.setAttribute('value', i.toString());
            option.textContent = list[i].toString();
            select.appendChild(option);
        }
    };
    /**
     * 
     * @param {string} label 
     * @param {string} name 
     * @param {array} list 
     * @param {function} func 
     * @returns {object}
     */
    const _selectRender = function(label, name, list, func){
        const select = _create('select');
        _inputAttribute(select, 'select', name, func);
        _optionRender(select, list);
        return _lineFormRender(
            label,
            select
        );
    };
    /**
     * 
     * @param {string} name 
     * @param {array} list 
     */
    const _selectUpdate = function(name,list){
          const element = _element.getElementById(_id(name));
          if(typeof element === 'undefined')
              throw Error(name+' not exist');
          const val = element.value.toString(); 
          while (element.firstChild)
              element.removeChild(element.firstChild);
          _optionRender(element,list);
          element.value = val.toString(); 
    };
    /**
     *
     * @const {array}
     */
    const _renderTypes = [
        _textRender,
        _passRender,
        _selectRender,
        _areaRender,
        _checkboxRender
    ];
    /**
     * 
     * @returns {@object}
     */
    const _render = function(){
        if(_rendered === true)
            return _element;
        _element = _create('div');
        _element.appendChild(_titleRender());
        _element.className = _class('holder');
        for(let i of _forms)
            if(i.type === 2){
                _element.appendChild(
                    _renderTypes[i.type](i.label, i.name, i.list, i.func)
                );
            }else if ( _renderTypes.length >= i.type){
                _element.appendChild(
                    _renderTypes[i.type](i.label, i.name, i.func)
                );
            }
        _element.appendChild(_submitRender());
        _rendered = false;
        return _element;
    };
};
