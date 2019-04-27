const form=document.getElementById('vote-form');
form.addEventListener('submit',(e)=>{
    const choice=document.querySelector('input[name=ls]:checked').value;
const data={ls:choice};
fetch('http://localhost:3000/poll',{
    method:'post',
    body:JSON.stringify(data),
    headers:new Headers({
    'Content-Type':'application/json'
})
})
.then(res=>res.json())
.then(data=>console.log(data))
.catch(err=>console.log(err));
e.preventDefault();
});
fetch('http://localhost:3000/poll')
.then(res=>res.json())
.then(data=>{
    const votes = data.votes;
    const totalVotes = votes.length;
    const voteCounts = votes.reduce(
        (acc,vote)=>
        ((acc[vote.ls]=(acc[vote.ls]||0)+ parseInt(vote.points)),acc),
        {});
        let dataPoints=[
            {label:'BJP',y:voteCounts.BJP},
            {label:'CPI',y:voteCounts.CPI},
            {label:'INC',y:voteCounts.INC},
            {label:'Other',y:voteCounts.Other},
        ];
        const chartContainer=document.querySelector('#chartContainer');
        if(chartContainer){
            const chart= new CanvasJS.Chart('chartContainer',{
                animationEnabled:true,
                theme:'theme1',
                title:{
                    text:`Total Votes  ${totalVotes}`
                },
                data:[
                    {
                    type:'column',
                    dataPoints: dataPoints
                }
                ]
            });
            chart.render();
         // Enable pusher logging - don't include this in production
         Pusher.logToConsole = true;
        
         var pusher = new Pusher('ff0c848d82e9b09c93d5', {
           cluster: 'ap2',
           forceTLS: true
         });
        
         var channel = pusher.subscribe('ls-poll');
         channel.bind('ls-vote', function(data) {
           dataPoints=dataPoints.map(x=>{
               if(x.label==data.ls){
                   x.y+=data.points;
                   return x;
               }else{
                   return x;
               }
           
            });
            chart.render();
         });
        
        }
    });

