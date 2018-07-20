window.onload = function() {
  gq.init().get('^p').get('.elem2').setAttr('name', 'name5');
  gq.init().get('.elem2').addClass('myclass1');
  gq.init().get('#test2').setAttr('name', 'nnn3');
  gq.init().get('+nnn3').addClass('a123').addClass('abc1234');

  gq.init().get('+nnn3').del();



  gq2().get('^p').get('.elem2').setAttr('name', 'name5');
  gq2().get('.elem2').addClass('myclass1');
  gq2().get('#test2').setAttr('name', 'nnn3');
  gq2().get('+nnn3').addClass('a123').addClass('abc1234');

  gq2().get('.elem2').setText('fff');

  gq2().get('.elem2').del();

}
