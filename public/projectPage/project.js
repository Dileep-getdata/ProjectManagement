const productForm=document.getElementById('product-form');
const token=localStorage.getItem('token');

productForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const title=e.target.title.value;
    const description=e.target.description.value;    
    const status=e.target.status.value;
    
    const project_details={
        title:title,
        description:description,
        status:status,
    } 
    console.log(project_details);
    axios.post('http://localhost:3000/project/addproject',project_details,{headers:{'Authentication':token}})
    .then(response=>{        
             
        if(response.status===200){
            MesageShow(response.data.message,'green');
            document.getElementById('title').value='';
            document.getElementById('description').value='';            
            window.location.href="./main.html";
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