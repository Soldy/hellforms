'use strict';

const hellFormClass = function(){
    this.class = function(name){
        return _class(name)
    };
    this.id = function(name){
        return _id(name)
    };
    this.addPass = function(label, name, func){
        return _addPass(label, name, func);
    };
    this.addText = function(label, name, func){
        return _addText(label, name, func);
    };
    this.addTitle = function(title, clas){
        return _addTitle(title, clas);
    };
    this.addSubmit = function(name, clas, func){
        return _addSubmit(name, clas, func);
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
    const _addText = function(label, name, func){
         _forms.push({
             type:0,
             label:label,
             name:name,
             func:func
         });
    };
    const _addPass = function(label, name, func){
         _forms.push({
             type:1,
             label:label,
             name:name,
             func:func
         });
    };
    const _addTitle = function(title, clas){
        _title = {
            'name':title.toString(),
            'clas':clas.toString()
        }
    };
    const _addSubmit = function(title, clas, func){
        _submit = {
            'name':title.toString(),
            'clas':clas.toString(),
            'func':func
        }
    };
    const _lineRender = function(...inner){
        const line =  document.createElement('div');
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
    const _labelRender = function(label){
        const elem =  document.createElement('div');
        elem.className = _class('label');
        elem.textContent = label;
        return elem;
    }
    const _titleRender = function(){
        const title =  document.createElement('div');
        title.className = (_class('title')+ _title.clas);
        title.textContent = _title.name;
        return _lineRender(title);
    };
    const _submitRender = function(){
        const holder =  document.createElement('div');
        const input = document.createElement('input');
        holder.className = _class('submit_holder');
        input.className = _class('submit');
        input.setAttribute('type', 'submit');
        input.setAttribute('id', _id(_submit.clas));
        input.addEventListener("onclick", _submit.func); 
        input.value = _submit.name; 
        holder.appendChild(input);
        return _lineRender(holder);
    };
    const _passRender = function(label, name, func){
        const input = document.createElement('input');
        input.className = _class('password');
        input.setAttribute('type', 'password');
        input.setAttribute('id', _id(name));
        input.setAttribute('name', name);
        input.addEventListener("keyup", func); 
        return _lineFormRender(
            label,
            input
        );
    };
    const _textRender = function(label, name, func){
        const input = document.createElement('input');
        input.className = _class('text');
        input.setAttribute('type', 'text');
        input.setAttribute('id', _id(name));
        input.setAttribute('name', name);
        input.addEventListener("keyup", func); 
        return _lineFormRender(
            label,
            input
        );
    };
    const _render = function(){
        _element = document.createElement('div');
        _element.appendChild(_titleRender());
        _element.className = _class('holder');
        for(let i of _forms)
            if(i.type === 0)
                _element.appendChild(
                     _textRender(i.label, i.name, i.func)
                );
            else if (i.type === 1)
                _element.appendChild(
                     _passRender(i.label, i.name, i.func)
                );
        _element.appendChild(_submitRender());
        return _element;
    };
};
