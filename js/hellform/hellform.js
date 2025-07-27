/**
 * Fast like hell. form generator.
 *
 * @version 0.1.0
 *
 */

'use strict';


/**
 * This is a single-class tool. Implementation is easy :
 * const form = new HellForm();
 *
 * @class
 */
const HellForm = function(){
    /**
     * Class name resolver.
     * Return with the inside used class name.
     *
     * @param {string} name 
     * @returns {string}
     */
    this.class = function(name){
        return _class(name);
    };
    /**
     * Id string resolver.
     * Return with the id string
     * that is used inside.
     *
     * @param {string} name 
     * @returns {void}
     */
    this.id = function(name){
        return _id(name);
    };
    /**
     * 
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
     * @returns {void}
     */
    this.addCheckbox = function(label, name, func){
        return _add(4, label, name, func);
    };
    /**
     * This is set or add the main form title. 
     * Useful if we use multiple forms on the same page.
     *
     * @param {string} title 
     * @param {string} clas 
     * @returns {void}
     */
    this.addTitle = function(title, clas){
        return _addTitle(title, clas);
    };
    /**
     * Main notice set
     *
     * @param {string} notice message
     * @param {string} clas 
     * @returns {void}
     */
    this.addNotice = function(notice, clas){
        return _addNotice(notice, clas);
    };
    /**
     * Every form has only one submit button possibility.
     * However, the auto-submit is easy to do.  
     * So I see no reason to change that. 
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
     * The render function triggers the 
     * form render process, and come back with 
     * the DOM element. 
     * The original version had the retard object 
     * support. 
     * However, that was removed. Currently, this is 
     * always returned with the DOMElement.
     *
     * @returns {DOMElement}
     */
    this.render = function(){
        return _render();
    };
    /**
     * Come back with the input field element.
     *
     * @param {string} element basic id
     * @returns {DOMelement|null}
     */
    this.get = function(id){
        return _get(id);
    };
    /**
     * Come back with the input field value.
     *
     * @param {string} element basic id
     * @return {string}
     */
    this.value = function(id){
        return _value(id);
    };
    /**
     *
     * @return {Object<string, string>}
     */
    this.json = function(){
        const out = {};
        for(let i of _ids)
            out[i] = _value(i);
        return out;
    };
    /**
     * 
     * @let {object}
     */
    let _title = {};
    /**
     * 
     * @let {object}
     */
    let _notice = {};
    /**
     * 
     * @let {object}
     */
    let _notice_element = {};
    /**
     * 
     * @let {array}
     */
    let _forms = [];
    /**
     * 
     * @let {object}
     */
    let _submit;
    /**
     * 
     * @let {array<string>}
     */
    let _ids = [];
    /**
     * 
     * @let {object}
     */
    let _element;
    /**
     * 
     * @let {object}
     */
    let _lines = {};
    /**
     * 
     * @let {object}
     */
    let _labels = {};
    /**
     * 
     * @let {object}
     */
    let _fields = {};
    /**
     * 
     * @let {object}
     */
    let _submit_line;

    /**
     * 
     * @let {boolean}
     */
    let _rendered = false;

    const _get = function(id){
        return _fields[id];
    };
    const _value = function(id){
        return _get(id).value;
    };
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
     * @param  {...string}
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
        _ids.push(name);
        _forms.push(form);
    };
    /**
     * 
     * @param {string} title
     * @param {string} clas
     */
    const _addTitle = function(title, clas){
        if (typeof clas === 'undefined')
            clas = '';
        _title = {
            'name':title.toString(),
            'clas':clas.toString()
        };
    };
    /**
     * 
     * @param {string} title
     * @param {string} clas
     */
    const _addNotice = function(title, clas){
        if (typeof clas === 'undefined')
            clas = '';
        _notice = {
            'name':notice.toString(),
            'clas':clas.toString()
        };
    };
    const _addSubmit = function(title, id, func){
        _submit.innerHTML = '';
        const input = _input(
          'submit', 
          id.toString(),
          func,
          title.toString()
        );
        input.value = title;
        _submit.className = _class('submit_holder');
        _submit.appendChild(input);
    };
    /**
     *
     * @param  {...any} inner
     * @returns {object}
     */
    const _lineRender = function(...inner){
        const line =  _create('div');
        line.className = _class('line');
        for(let i of inner){
            line.appendChild(i);
        }
        return line;
    };
    /**
     * 
     * @param {string} label
     * @param {object} inner
     * @returns {object}
     */
    const _lineFormRender = function(name, label, inner){
        return _lineRender(
            _labelRender(name, label),
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
        _fields[name] = input;
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
     * @returns {DOMElement}
     */
    const _labelRender = function(name, label){
        const elem = _create('div');
        elem.className = _class('label');
        elem.textContent = label;
        _labels[name] = elem;
        return elem;
    };
    /**
     *
     * @returns {DOMElement}
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
     * @type {DOMElement}
     */
    const _noticeInit = function(){
        _notice_element = _create('div');
    };
    /**
     *
     * @returns {DOMElement}
     */
    const _noticeRender = function(){
        _notice_element.className = _attreses(
          _class('notice'),
          _notice.clas
        );
        _notice_element.textContent = _notice.name;
        return _lineRender(_notice_element);
    };
    /**
     *
     * @returns {DOMElement}
     */
    const _submitRender = function(){
        return _lineRender(_submit);
    };
    /**
     *
     * @param {string} label
     * @param {string} name
     * @param {function} func
     * @returns {DOMElement}
     */
    const _passRender = function(label, name, func){
        const input = _input('password', name, func, label);
        return _lineFormRender(
          name,
          label,
          input
        );
    };
    /**
     * 
     * @param {string} label
     * @param {string} name
     * @param {function} func
     * @returns {DOMElement}
     */
    const _checkboxRender = function(label, name, func){
        const input = _input('checkbox', name, func);
        return _lineFormRender(
          name,
          label,
          input
        );
    };
    /**
     *
     * @param {string} label
     * @param {string} name
     * @param {function} func
     * @returns {DOMElement}
     */
    const _textRender = function(label, name, func){
        const input = _input('text', name, func, label);
        return _lineFormRender(
            name,
            label,
            input
        );
    };
    /**
     *
     * @param {string} label
     * @param {string} name
     * @param {function} func
     * @returns {DOMElement}
     */
    const _areaRender = function(label, name, func){
        const area = _create('textarea');
        _inputAttribute(area, 'textarea', name, func);
        return _lineFormRender(
            name,
            label,
            area
        );
    };
    /**
     *
     * @param {DOMElement} select
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
     * @returns {DOMElement}
     */
    const _selectRender = function(label, name, list, func){
        const select = _create('select');
        _inputAttribute(select, 'select', name, func);
        _optionRender(select, list);
        _fields[name] = select;
        return _lineFormRender(
            name,
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
          const element = _fields[name];
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
     * @const {array<function>}
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
     * @returns {DOMElement}
     */
    const _render = function(){
        if(_rendered === true)
            return _element;
        _element = _create('div');
        _element.appendChild(_titleRender());
        _element.appendChild(_noticeRender());
        _element.className = _class('holder');
        for(let i of _forms){
            if(i.type === 2){
                _lines[i.name] = _renderTypes[i.type](
                  i.label,
                  i.name,
                  i.list,
                  i.func
                );
            }else if ( _renderTypes.length >= i.type){
                _lines[i.name] = _renderTypes[i.type](
                  i.label,
                  i.name,
                  i.func
                );
            }
            _element.appendChild(
              _lines[i.name]
            );
        }
        _element.appendChild(_submitRender());
        _rendered = true;
        return _element;
    };
    _noticeInit();
    _submit = _create('div');
};
