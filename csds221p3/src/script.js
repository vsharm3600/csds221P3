async function getData(){
  const labels=[]
  let dataset=[]
  const input=await     axios.get("https://data.nasa.gov/resource/y77d-th95.json");
  input.data.forEach(event=>{
    const data=[]
    const label=event.name
    const date=new Date(event.year).getFullYear()
    const mass=+event.mass
    if(date && mass){
      data.push({
        x:date,
        y:mass
      })
      const datasetObj={
        label,data
      }
      dataset.push(datasetObj)
    }
    
  })
  return {dataset,labels};
}

const button=document.getElementById("generate");
button.addEventListener("click",generateGraph)

async function generateGraph(){
  const data=await getData();
  const ctx = document.getElementById('myChart').getContext("2d");
  console.log(data)
  const chart= new Chart(ctx,{
    type: 'scatter',
    data: {
  datasets:data.dataset
},
    options: {
      
    scales: {
      x: {
        title: {
          color: 'red',
          display: true,
          text: 'Year'
        },
        type: 'linear',
        position: 'bottom',
        display:true,
        min:1800,
        max: 2020,
      },
      y: {
        title: {
          color: 'red',
          display: true,
          text: 'Mass of Meteorite (grams)'
        },
        type: 'linear',
        max:400000
      }
    }
  }
  });
}
function changeColor(){
  setTimeout(() =>{ document.getElementById("myChart").style.backgroundColor="white";
  },"5");
}
function showMeteor(){ document.getElementById("meteor").style.display="block";}
