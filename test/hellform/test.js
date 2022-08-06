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
    hellForm.addSubmit(
        'Login',
        'login',
        (forms)=>{return true;}
    );
    document.getElementsByTagName('body')[0].appendChild(
        hellForm.render()
    );
}
