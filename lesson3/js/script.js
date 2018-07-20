window.onload = function() {
  // gq.init().get('^p').get('.elem2').setAttr('name', 'name5');
  // gq.init().get('.elem2').addClass('myclass1');
  // gq.init().get('#test2').setAttr('name', 'nnn3');
  // gq.init().get('+nnn3').addClass('a123').addClass('abc1234');



  gq().get('^p').get('.elem2').setAttr('name', 'name5');
  gq().get('.elem2').addClass('myclass1');
  gq().get('#test2').setAttr('name', 'nnn3');
  gq().get('+nnn3').addClass('a123').addClass('abc1234');

  gq().get('.elem2').setText('fff');

}
