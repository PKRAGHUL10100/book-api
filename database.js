let books=[{

    isbn:"12345book",
    title:"getting started with mern",
    pubDate:"0707",
    language:"en,tamil,telungu",
    numPage:30,
    author:[1,2],
    publications:[1],
    category:["tech","progeamming","horror"]
},{

   isbn:"54321book",
   title:"getting started with bang",
   pubDate:"0707",
   language:"en,tamil,telungu,malayalam",
   numPage:30,
   author:[1,2],
   publications:[0],
   category:["tech","progeamming","horror"]
}];

const author=[{
   id:1,
   name:"raghul",
   books:["ponniyenselvan","arichandran"]
},
{
   id:2,
   name:"elon musk",
   books:["ponniyenselvan"],

}];


const publications=[{

   id:1,
   name:"writex",
   books:["ponniyenselvan"],
},{

   id:2,
   name:"world",
   books:[]}];

module.exports={books,author,publications };