window.onload = function() {
  gq.init().get('^p').get('.elem2').setAttr('name', 'name5');
  gq.init().get('.elem2').addClass('myclass1');
  gq.init().get('#test2').setAttr('name', 'nnn3');
  gq.init().get('+nnn3').addClass('a123').addClass('abc1234');



  // gq.init().myTest1().myTest1();
  // gq.init().myTest1();


}
