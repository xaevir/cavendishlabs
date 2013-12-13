
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: '' });
};

exports.contact = function(req, res){
  res.render('contact', { title: 'Contact Us' });
};
