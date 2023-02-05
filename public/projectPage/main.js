window.addEventListener('DOMContentLoaded',async ()=>{
    getProjectsList();
})

const token=localStorage.getItem('token');
let listProducts=document.getElementById('list_products')

async function getProjectsList(){
    try{
        const userProject=await axios.get('http://localhost:3000/project/getProjects',{headers:{'Authentication':token}})
        const arrayProject=userProject.data.projects;        
        
        arrayProject.forEach((eachProject)=>{          
            
            listProducts.innerHTML +=`<li><button onclick="editProject(${eachProject._id})">${eachProject.title}</button></li>`
            console.log(listProducts);
        })
        
        
        console.log(userProject.data.projects)

    }catch(err){
        console.log(err);
    }
}