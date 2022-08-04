window.onload=function(){
    const hellForm = new hellMenuClass(document.getElementsByTagName('body')[0]);
    hellForm.addTitle(
        'test form',
        'title_extra_class'
    );
    hellMenu.addText(
        'Login',
        'login',
        (value)=>{console.log(value);}
    );
    hellMenu.addPassword(
        'Password',
        'password',
        (pass)=>{return true;}
    );
    hellMenu.addSubmit(
        'Login',
        'login',
        (forms)=>{return true;}
    );
    hellForm.render();
}
