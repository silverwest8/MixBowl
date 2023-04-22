const checkEmail = (email)=>{

}

const checkPassword = (password)=>{
    if (password.length >=8 && password.length <=16){
        const num = password.search(/[0-9]/g);
        const eng = password.search(/[a-z]/ig);
        if (num === -1)
            return false;
        if (eng === -1)
            return false;
        return true;
    }
    return false; 
}

export {checkEmail,checkPassword};