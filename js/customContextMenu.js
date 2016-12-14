var cm = _cm = (function () {
  'use strict';

  var menuElement = document.querySelector('context-menu');
  var menuContent = 
    '<div class="container" id="mainBodyContainer" oncontextmenu="return _cm.showContextMenu()">' +
      '<div id="contextMenu" class="context-menu">' +
        '<ul>' +
          '<li onclick="testClick()">Add an even listener</li>' +
          '<li>Disable default behavior</li>' +
          '<li>Design context menu</li>' +
          '<li>Show the context menu</li>' +
          '<li class="separator"></li>' +
          '<li>Hide on mouse click</li>' +
          '<li>Hide on esc key</li>' +
        '</ul>' +
      '</div>' +
    '</div>';
  menuElement.innerHTML = menuContent;

  var cm = function () {
    var self = this;
    var contextMenu = document.getElementById('contextMenu');

    var _cm = {
      showContextMenu: function () {
        contextMenu.style.maxHeight = window.innerHeight + "px";
        contextMenu.style.width = '200px';
        contextMenu.style.display = 'block';

        var cmHeight = contextMenu.clientHeight,
            cmWidth = contextMenu.clientWidth,
            vertClickPos = (event.clientY / window.innerHeight) * 100,
            horiClickPos = (event.clientX / window.innerWidth) * 100,
            posLeft = event.clientX,
            posTop = event.clientY;

        if(vertClickPos > 50 && horiClickPos > 50) {
          posLeft = (event.clientX - cmWidth);
          posTop = (event.clientY - cmHeight);
        }else
        if(vertClickPos > 50) {
          posTop = (event.clientY - cmHeight);
        }else
        if(horiClickPos > 50) {
          posLeft = (event.clientX - cmWidth);
        }

        contextMenu.style.left = posLeft + 'px';
        contextMenu.style.top = posTop + 'px';

        return false;
      },
      hideContextMenu: function () {
        contextMenu.style.maxHeight = '0';
        contextMenu.style.width = '0';
        contextMenu.style.display = "none";
      },
      listenKeys: function () {
        var keyCode = event.which || event.keyCode;
        if (keyCode == 27) {
          _.hideContextMenu();
        }
      },
      links: function(links) {
        var linkContainer = document.querySelector('#contextMenu ul');
        var linkHTML = '';
        for(var i = 0; i < links.length; i++) {
          var l = links[i];
          if(l.type == 'separator') {
            linkHTML += '<li class="separator"></li>';
          }else{
            linkHTML += '<li onclick="' + l.click + '">' + l.link + '</li>';
          }
        }
        linkContainer.innerHTML = linkHTML;
      }
    };

    document.querySelector('#mainBodyContainer').onclick = _cm.hideContextMenu;
    window.onkeydown = _cm.listenKeys;


    return _cm;
  };

  cm.prototype.applyLinks = function() {
    console.log(this);
  };

  return cm();

})();