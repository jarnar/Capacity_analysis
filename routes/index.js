
/*
 * GET home page.
 */
 

exports.index = function(req, res){
  // res.render('index', { title: 'Express' });
  res.sendfile("./views/home.html"); 
  // res.sendfile("./views/index.html"); 
  // res.sendfile("./views/calendar-pie.html"); 
};

