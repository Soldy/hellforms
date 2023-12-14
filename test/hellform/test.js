window.onload=function(){
    const hellForm = new hellFormClass();
    hellForm.addTitle(
        'test form',
        'title_extra_class'
    );
    hellForm.addText(
        'Login',
        'login',
        (value)=>{console.log(value);}
    );
    hellForm.addPass(
        'Password',
        'password',
        (pass)=>{return true;}
    );
    hellForm.addSelect(
        'Server',
        'server',
        {
            'int1':'international 1',
            'int2':'international 2',
            'na1':'North America East',
            'na2':'North America West'
        },
        (value)=>{console.log(value);}
    );
    hellForm.addArea(
        'Feed back',
        'feedback',
        (text)=>{return true;}
    );
    hellForm.addCheckbox(
        'Are you happy?',
        'happy',
        (happy)=>{console.log('happines: '+happy)}
    );
    hellForm.addSubmit(
        'Login',
        'login',
        (forms)=>{console.log('click');return true;}
    );
    document.getElementsByTagName('body')[0].appendChild(
        hellForm.render()
    );
};
