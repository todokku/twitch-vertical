/*
 *  Fetch from extension "localStorage"
 * if the user has set "vertical" before
 */

let localVertical = false;
chrome.storage.sync.get('vertical', function(obj) {
  localVertical = obj.vertical;
});

/*
 * Create a observer to wait the Twitch Player to load before
 * fetching for it in the DOM
 */
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (!mutation.addedNodes) {
      return;
    }
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      if (mutation.addedNodes[i].classList.contains('persistent-player')) {
        initExtension();
      } else {
        return;
      }
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

/*
 * EXTENSION ACTUAL CODE
 */
function initExtension() {
  /*
   * Get each element from the DOM
   */
  let player = _getTwitchPlayer();
  let chat = _getChatColumn();
  let sidenav = _getSideNav();
  let wrapper = chat.parentElement.parentElement;

  let playerParent = document.getElementsByTagName('main')[0];
  let chatParent = chat.parentElement;

  /*
   * When user click's the button
   */

  chrome.runtime.onMessage.addListener(({ vertical }) => {
    if (vertical) {
      addStyle(player, chat, wrapper, sidenav, playerParent, chatParent);
    } else {
      removeStyle(player, chat, wrapper, sidenav, playerParent, chatParent);
    }
  });

  /*
   * update styles based on the value of
   * the localVertical variable
   * * Clicking the extension icon OR the localStorage value changes
   */

  if (localVertical) {
    addStyle(player, chat, wrapper, sidenav, playerParent, chatParent);
    window.onresize = () => addStyle(player, chat, wrapper, sidenav, playerParent, chatParent);
  } else {
    removeStyle(player, chat, wrapper, sidenav, playerParent, chatParent);
  }
}

function _getTwitchPlayer() {
  return document.querySelector('.persistent-player');
}

function _getChatColumn() {
  return document.querySelector('.right-column');
}

function _getSideNav() {
  return document.querySelector('.side-nav');
}

function addStyle(player, chat, wrapper, sidenav, playerParent, chatParent) {
  /*
   * Add classes to elements
   */
  player.classList.add('twitch-vertical--player');
  chat.classList.add('twitch-vertical--chat');
  wrapper.classList.add('twitch-vertical--wrapper');
  sidenav.classList.add('twitch-vertical--sidenav');

  playerParent.classList.add('twitch-vertical--player-parent');
  chatParent.classList.add('twitch-vertical--chat-parent');

  /*
   * Custom style to limit chat height
   */
  chatParent.setAttribute(
    'style',
    `height: calc(100vh - ${player.scrollHeight + 100}px); max-height: calc(100vh - ${player.scrollHeight + 100}px); transition: all 200ms ease-out;`
  );

  /*
   * blocks twitch from hiding the chat element
   */
  if (window.innerWidth <= 920) {
    chat.classList.remove('tw-hide');
  }
}

function removeStyle(player, chat, wrapper, sidenav, playerParent, chatParent) {
  // Undo all the styling
  player.classList.remove('twitch-vertical--player');
  chat.classList.remove('twitch-vertical--chat');
  wrapper.classList.remove('twitch-vertical--wrapper');
  sidenav.classList.remove('twitch-vertical--sidenav');

  playerParent.classList.remove('twitch-vertical--player-parent');
  chatParent.classList.remove('twitch-vertical--chat-parent');

  chatParent.setAttribute('style', 'width: fit-content;');

  if (window.innerWidth <= 920) {
    chat.classList.add('tw-hide');
  }
}
