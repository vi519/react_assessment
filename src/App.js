
import './App.css';
import { useEffect, useState } from 'react';
import logo from './companylogo.jpg';


function App() {
  
  const[data,setData]=useState('')
  const [search, setSearch] = useState("");
  const [showList,setShowList]= useState(false)
  const apiUrl = 'https://jsonplaceholder.typicode.com/albums';
  const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack',
    'Kate', 'Leo', 'Mia', 'Nate', 'Olivia', 'Peter', 'Quincy', 'Rita', 'Sam', 'Tina',
    "Magnus","Moldof","Mursi","Njall","Oddr","Olaf","Orlyg","Ormr","Ornolf","Osvald",
    "Ozurr","Poror","Prondir","Ragi","Ragnvald","Refr","Runolf","Saemund","Siegfried",
	  "Sigmundr","Sigurd","Sigvat","Skeggi","Skomlr","Slode","Snorri","Sokkolf","Solvi",
    "Surt","Sven","Thangbrand","Thjodoft","Thorod","Thorgest","Thorvald","Thrain","Throst",
		"Torfi","Torix","Tryfing","Ulf","Valgaror","Vali","Vifil","Vigfus","Vika"];

  const generateRandomName = () => {
    const randomIndex = Math.floor(Math.random() * names.length);
    const name = names[randomIndex];
    return name;
  };

  useEffect(() => {
    get_api_data()
   
  }, []);


  async function get_api_data()
  {
   return await fetch(apiUrl).then((response) => response.json()).then(data => {
      const ablumCount = 'ablumCount'
      const seenCheck='seenCheck'
      const name='name'
      const color='color'
      const updatedArray = data.map(obj => ({
        ...obj,[ablumCount]: 10,[seenCheck]:'', [name]:generateRandomName()+' '+ obj.userId,[color]:''

      }));
    

        setData(updatedArray);
      }).catch(error => {console.error('Error:', error);});
  }

  function handleChange(e,index,type)
  {
    
      let ablumCount=data[index].ablumCount-1
      let color= data[index].color==''?"blue":"lightblue"
      let seenCheck="seen"

    const updatedItem = { ...data[index] };
    updatedItem.ablumCount = ablumCount;
    updatedItem.color = color;
    updatedItem.seenCheck = seenCheck;
    const updatedArray = [...data];
    updatedArray[index] = updatedItem;
    setData(updatedArray);

  

   
    
    

    
  }




  return (
    <div className="App">
       <i>  <b>Note:</b> If you clicked on card it take you the title list and vice versa</i>
       
    
      <p className="solid">
        <div ><img  className="logo"src={logo} /></div>
        <div className="search"> <input   type="text" placeholder='search by name,title...' onChange={e => setSearch(e.target.value)}></input></div>
        </p>

        <div className={!showList?"flex-container":"flex-container-coloumn"}>
  
    {data?.length > 0 && data.filter((searchfilter)=>{
      return search?.toLowerCase()===''? searchfilter: searchfilter?.name.toLowerCase().includes(search)|| searchfilter?.title.toLowerCase().includes(search)
    }).map((item,index)=>{return (
      !showList?
         <div className="card" onClick={(e)=>[handleChange(e,index),setShowList(true)]}>
         <span className="circle"  id="albumCount" ><b className='randomnumber' >{item.ablumCount}</b></span>
  <div className="container" >
        
          <h4 className='name' style={{color:item.color}}><b>{item?.name}
          <><br/>
        <h6 className='seentag'><l style={{color:'green'}}>{item?.seenCheck}</l></h6> </></b></h4> 
       

        </div>
      </div>
     : <div className="listcard" onClick={(e)=>[handleChange(e,index),setShowList(false)]}>
    <div className="list-container" >
    
      <h4 style={{color:item.color}}><b>{item?.title}
      </b></h4> 
   

    </div>
  </div> )
})}
</div>
     
    </div>
  );
}

export default App;
