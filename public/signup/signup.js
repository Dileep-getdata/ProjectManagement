const signupForm=document.getElementById('signUp_form');

signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const nameI=e.target.name.value;
    const email=e.target.email.value;
    const password=e.target.password.value;
    const phoneno=e.target.phoneno.value;
    const age=e.target.age.value;
    const gender=e.target.gender.value;
    
    const signup_details={
        name:nameI,
        email:email,
        password:password,
        phoneno:phoneno,
        age:age,
        gender:gender
    } 
    // console.log(signup_details);
    axios.post('http://localhost:3000/user/signup',signup_details)
    .then(response=>{        
             
        if(response.status===200){
            MesageShow(response.data.message,'green');
            document.getElementById('name').value='';
            document.getElementById('email').value='';
            document.getElementById('password').value='';
            document.getElementById('age').value='';
            document.getElementById('phoneno').value='';
            window.location.href="../signin/signin.html";
        }else{
            throw new Error('Aleary exits');
        }       
        
    })
    .catch(err=>{
        console.log(err);
        MesageShow(err.response.data.message,'red');
    })     
   
    
})
function MesageShow(msg,color){    
        const message=document.getElementById('message');
        const notification=document.createElement('h3');
        notification.innerHTML=msg;
        notification.style.color=color;
        message.appendChild(notification);
        setTimeout(()=>{
                 notification.remove() },3000);
    
}