'use strict';

const hellFormClass = function(){
    this.class = function(name){
        return _class(name)
    };
    this.id = function(name){
        return _id(name)
    };
    this.addPass = function(label, name, func){
        return _add(1,  label, name, func);
    };
    this.addText = function(label, name, func){
        return _add(0, label, name, func);
    };
    this.addArea = function(label, name, func){
        return _add(3, label, name, func);
    };
    this.addSelect = function(label, name, list, func){
        return _add(2, label, name, func, list);
    };
    this.addTitle = function(title, clas){
        return _addTitle(title, clas);
    };
    this.addSubmit = function(name, id, func){
        return _addSubmit(name, id, func);
    };
    this.render = function(){
        return _render();
    };
    let _title = {};
    let _forms = [];
    let _submit = {};
    let _element;
    let _rendered = false;
    let _elem;
    const _id = (name)=>{
        return ('hellform_id_'+name);
    };
    const _class = (name)=>{
        return ('hellform_'+name);
    };
    const _create = function(tag){
        return document.createElement(tag);
    };
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
    }
    const _addTitle = function(title, clas){
        _title = {
            'name':title.toString(),
            'clas':clas.toString()
        }
    };
    const _addSubmit = function(title, id, func){
        _submit = {
            'name':title.toString(),
            'id':id.toString(),
            'func':func
        }
    };
    const _lineRender = function(...inner){
        const line =  _create('div');
        line.className = _class('line');
        for(let i of inner)
            line.appendChild(i);
        return line;
    };
    const _lineFormRender = function(label, inner){
        return _lineRender(
            _labelRender(label),
            inner
        );
    };
    const _input = function(type, name, func){
        const input = _create('input');
        _inputAttribute(input, type, name, func);
        return input;
    };
    const _inputAttribute = function(input, type, name, func){
        input.className = _class(type);
        input.setAttribute('type', type);
        input.setAttribute('id', _id(name));
        input.setAttribute('name', name);
        if(type === 'submit') {
            input.addEventListener("onclick", func); 
        }else
            input.addEventListener("keyup", func); 
    };
    const _labelRender = function(label){
        const elem = _create('div');
        elem.className = _class('label');
        elem.textContent = label;
        return elem;
    };
    const _titleRender = function(){
        const title =  _create('div');
        title.className = (_class('title')+ _title.clas);
        title.textContent = _title.name;
        return _lineRender(title);
    };
    const _submitRender = function(){
        const holder =  _create('div');
        const input = _input('submit', _submit.id, _submit.func)
        input.value = _submit.name; 
        holder.className = _class('submit_holder');
        holder.appendChild(input);
        return _lineRender(holder);
    };
    const _passRender = function(label, name, func){
        const input = _input('password', name, func)
        return _lineFormRender(
            label,
            input
        );
    };
    const _textRender = function(label, name, func){
        const input = _input('text', name, func)
        return _lineFormRender(
            label,
            input
        );
    };
    const _areaRender = function(label, name, func){
        const area = _create('textarea');
        _inputAttribute(area, 'textarea', name, func);
        return _lineFormRender(
            label,
            area
        );
    };
    const _selectRender = function(label, name, list, func){
        const select = _create('select');
        _inputAttribute(select, 'select', name, func);
        for(let i in list){
            let option = _create('option');
            option.setAttribute('value', i.toString());
            option.textContent = list[i].toString();
            select.appendChild(option);
        }
        return _lineFormRender(
            label,
            select
        );
    };
    const _render = function(){
        if(_rendered === true)
            return _element;
        _element = _create('div');
        _element.appendChild(_titleRender());
        _element.className = _class('holder');
        for(let i of _forms)
            if(i.type === 0){
                _element.appendChild(
                     _textRender(i.label, i.name, i.func)
                );
            }else if (i.type === 1){
                _element.appendChild(
                     _passRender(i.label, i.name, i.func)
                );
            }else if (i.type === 2){
                _element.appendChild(
                     _selectRender(i.label, i.name, i.list, i.func)
                );
            }else if (i.type === 3){
                _element.appendChild(
                     _areaRender(i.label, i.name, i.func)
                );
            }
        _element.appendChild(_submitRender());
         _rendered = false;
        return _element;
    };
};
