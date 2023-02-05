
const logInForm=document.getElementById('logIn_form');

logInForm.addEventListener('submit',(e)=>{
    e.preventDefault();    
    const email=e.target.email.value;
    const password=e.target.password.value;
    const logIn_details={        
        email:email,
        password:password
    };   
    
    axios.post('http://localhost:3000/user/login',logIn_details)
        .then(response=>{  
            if(response.status==200)  {
                // console.log(response.data);
                localStorage.setItem('token',response.data.token);                
                errorSHow(response.data.message,'green');
                alert('Ding');  
                window.location.href="../projectPage/main.html";       
            }else{
                console.log(response.data); 
                errorSHow(response.data.message); 
            }
        })
        .catch(err=>{
            console.log(err.response.data.message)
            errorSHow(err.response.data.message);
        })
   
   
    
})
function errorSHow(err,color='red'){
    const error=document.getElementById('error');
    const notification=document.createElement('h3');
    notification.innerHTML=err;
    notification.style.color=color;
    error.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },3000);
}
