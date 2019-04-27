const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Vote=require('../models/vote');
const Pusher=require('pusher');

var pusher = new Pusher({
    appId: '738666',
    key: 'ff0c848d82e9b09c93d5',
    secret: '892b750f73817943537b',
    cluster: 'ap2',
    encrypted: true
  });
router.get('/',(req,res)=>{
    Vote.find().then(votes=>res.json({success:true,votes:votes}));
});
router.post('/',(req,res)=>{
  const newVote={
    ls:req.body.ls,
    points:1
  }
  new Vote(newVote).save().then(vote=>{
    pusher.trigger('ls-poll', 'ls-vote', {
      points:parseInt(vote.points),
      ls:vote.ls
    });
return res.json({success:true,message:'Thank you for voting'});
  });
    
});
module.exports=router;