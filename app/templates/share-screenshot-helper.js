(function (global) {
  var styleId = 'ftc-share-screenshot-style';
  var overlayId = 'ftc-share-screenshot-overlay';
  var footerId = 'ftc-share-screenshot-footer';
  var overlayTargetAttr = 'data-ftc-share-overlay-target';
  var overlayOriginalPositionAttr = 'data-ftc-share-overlay-original-position';
  var hiddenElementAttr = 'data-ftc-share-hidden';
  var hiddenStyleAttr = 'data-ftc-share-hidden-style';
  var mutationObserver = null;
  var activeTarget = null;
  var hiddenStyleMissingValue = '__ftc_share_style_missing__';
  var hideSelectors = [
    '.o-ads',
    '.o-ads__outer',
    '[data-o-ads-name]',
    '.bn-ph',
    '.adiframe',
    '.banner',
    '.banner-container',
    '.banner-inner',
    '.banner-iframe',
    '.banner-content',
    '.in-article-advert',
    '.mpu',
    '.mpu-container',
    '.mpu-container-instory',
    '.mpu-phone',
    '.db-ad',
    '.db-mobile-banner',
    '.db-mobile-information',
    '.adsbox',
    '.hide-iframe',
    '.fullscreen-ad',
    '.fullscreen-pc',
    '.subscription-promo-container',
    '#promo-box-container',
    '#story-quiz-container',
    '.chat-talk',
    '.chat-talk-inner',
    '.speedread-questions-container',
    '.speedread-questions',
    '.check-quiz-container',
    '.start-reading-container',
    '.quizlist',
    '.quiztip',
    '.rightanswer',
    '.list-recommendation',
    '.reorder-description',
    '.reorder-controls',
    '.related-stories',
    '.items[data-layout="recommendation"]',
    '[data-purpose="recommendation"]',
    '[data-purpose="reorder"]',
    '[data-recommendation-items]'
  ];

  function removeElementById(id) {
    var element = document.getElementById(id);
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  function isNightMode() {
    var root = document.documentElement;
    var body = document.body;
    return Boolean(
      (root && root.classList.contains('night')) ||
      (body && body.classList.contains('night'))
    );
  }

  function ensureStyle() {
    if (document.getElementById(styleId)) {
      return;
    }

    var style = document.createElement('style');
    style.id = styleId;
    style.textContent = [
      '#ftc-share-screenshot-overlay {',
      '  position: absolute;',
      '  left: 0;',
      '  right: 0;',
      '  top: 0;',
      '  bottom: 0;',
      '  pointer-events: none;',
      '  z-index: 2147483000;',
      '  overflow: hidden;',
      '}',
      '#ftc-share-screenshot-overlay .ftc-share-watermark {',
      '  position: absolute;',
      '  display: flex;',
      '  flex-direction: column;',
      '  gap: 2px;',
      '  align-items: center;',
      '  transform: rotate(-18deg);',
      '  transform-origin: center center;',
      '  opacity: 0.23;',
      '  color: #6a5245;',
      '  font-size: 17px;',
      '  line-height: 1.16;',
      '  font-weight: 600;',
      '  letter-spacing: 0.04em;',
      '  white-space: nowrap;',
      '  text-align: center;',
      '  padding: 4px 12px;',
      '  border-radius: 999px;',
      '  border: 1px solid rgba(122, 93, 78, 0.12);',
      '  background: rgba(255, 249, 245, 0.14);',
      '  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.14);',
      '  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.12);',
      '  backdrop-filter: blur(1px);',
      '}',
      '#ftc-share-screenshot-overlay.theme-night .ftc-share-watermark {',
      '  color: rgba(255, 241, 224, 0.8);',
      '  border-color: rgba(255, 241, 224, 0.08);',
      '  background: rgba(27, 24, 23, 0.2);',
      '  text-shadow: none;',
      '}',
      '#ftc-share-screenshot-overlay .ftc-share-watermark-meta {',
      '  font-size: 11px;',
      '  font-weight: 500;',
      '  opacity: 0.9;',
      '}',
      hideSelectors.map(function (selector) {
        return 'body.is-screenshot ' + selector;
      }).join(',\n') + ' {',
      '  display: none !important;',
      '  visibility: hidden !important;',
      '  height: 0 !important;',
      '  min-height: 0 !important;',
      '  max-height: 0 !important;',
      '  margin: 0 !important;',
      '  padding: 0 !important;',
      '  border: 0 !important;',
      '  overflow: hidden !important;',
      '}',
      '#ftc-share-screenshot-footer {',
      '  margin: 24px 0 0;',
      '  padding: 18px 18px 16px;',
      '  border-top: 1px solid rgba(60, 48, 42, 0.12);',
      '  border-bottom: 1px solid rgba(60, 48, 42, 0.08);',
      '  border-radius: 0;',
      '  background: linear-gradient(180deg, rgba(255, 249, 245, 0.86), rgba(255, 244, 235, 0.78));',
      '  color: #33302e;',
      '}',
      '#ftc-share-screenshot-footer.theme-night {',
      '  border-top-color: rgba(255, 241, 224, 0.14);',
      '  border-bottom-color: rgba(255, 241, 224, 0.08);',
      '  background: linear-gradient(180deg, rgba(49, 44, 41, 0.78), rgba(27, 24, 23, 0.72));',
      '  color: #fff1e0;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-note {',
      '  margin: 0 0 10px;',
      '  font-size: 11px;',
      '  line-height: 1.5;',
      '  letter-spacing: 0.03em;',
      '  color: inherit;',
      '  opacity: 0.7;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-main {',
      '  display: flex;',
      '  gap: 14px;',
      '  align-items: center;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-copy {',
      '  flex: 1 1 auto;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-title {',
      '  margin: 0 0 6px;',
      '  font-size: 17px;',
      '  line-height: 1.28;',
      '  font-weight: 700;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-body {',
      '  margin: 0;',
      '  font-size: 13px;',
      '  line-height: 1.58;',
      '  opacity: 0.86;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-qr {',
      '  flex: 0 0 auto;',
      '  width: 92px;',
      '  text-align: center;',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-qr img {',
      '  display: block;',
      '  width: 92px;',
      '  height: 92px;',
      '  margin: 0 auto 6px;',
      '  border-radius: 8px;',
      '  background: #ffffff;',
      '  padding: 6px;',
      '  box-sizing: border-box;',
      '}',
      '#ftc-share-screenshot-footer.theme-night .ftc-share-footer-qr img {',
      '  background: rgba(255, 255, 255, 0.96);',
      '}',
      '#ftc-share-screenshot-footer .ftc-share-footer-qr-text {',
      '  font-size: 10px;',
      '  line-height: 1.4;',
      '  opacity: 0.68;',
      '}'
    ].join('\n');
    document.head.appendChild(style);
  }

  function applyHiddenStyles(element) {
    if (!element || element.nodeType !== 1) {
      return;
    }
    element.style.setProperty('display', 'none', 'important');
    element.style.setProperty('visibility', 'hidden', 'important');
    element.style.setProperty('height', '0', 'important');
    element.style.setProperty('min-height', '0', 'important');
    element.style.setProperty('max-height', '0', 'important');
    element.style.setProperty('margin', '0', 'important');
    element.style.setProperty('padding', '0', 'important');
    element.style.setProperty('border', '0', 'important');
    element.style.setProperty('overflow', 'hidden', 'important');
  }

  function hideElement(element) {
    if (!element || element.nodeType !== 1) {
      return;
    }
    if (element.getAttribute(hiddenElementAttr) !== 'true') {
      var originalStyle = element.getAttribute('style');
      element.setAttribute(hiddenElementAttr, 'true');
      element.setAttribute(hiddenStyleAttr, originalStyle === null ? hiddenStyleMissingValue : originalStyle);
    }
    applyHiddenStyles(element);
  }

  function hideMatchedElements() {
    if (!document.body) {
      return;
    }
    var elements = document.querySelectorAll(hideSelectors.join(','));
    for (var i = 0; i < elements.length; i += 1) {
      hideElement(elements[i]);
    }
  }

  function restoreHiddenElements() {
    var elements = document.querySelectorAll('[' + hiddenElementAttr + '="true"]');
    for (var i = 0; i < elements.length; i += 1) {
      var element = elements[i];
      var originalStyle = element.getAttribute(hiddenStyleAttr);
      if (originalStyle === hiddenStyleMissingValue) {
        element.removeAttribute('style');
      } else if (originalStyle !== null) {
        element.setAttribute('style', originalStyle);
      }
      element.removeAttribute(hiddenElementAttr);
      element.removeAttribute(hiddenStyleAttr);
    }
  }

  function startMutationObserver() {
    if (!document.body || mutationObserver) {
      return;
    }
    mutationObserver = new MutationObserver(function () {
      hideMatchedElements();
      focusOnTarget(activeTarget);
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });
  }

  function stopMutationObserver() {
    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }
  }

  function getMountTarget() {
    var bodyNode = document.getElementById('ios-story-body');
    if (bodyNode && bodyNode.parentNode) {
      return (
        bodyNode.closest('.story-container') ||
        bodyNode.closest('.ebook-container') ||
        bodyNode.parentNode
      );
    }

    return (
      document.querySelector('.story-container') ||
      document.querySelector('.ebook-container') ||
      document.body
    );
  }

  function ensureOverlayTarget(target) {
    if (!target) {
      return null;
    }
    if (target.getAttribute(overlayTargetAttr) === 'true') {
      return target;
    }
    var originalPosition = '';
    if (global.getComputedStyle && global.getComputedStyle(target).position === 'static') {
      originalPosition = target.style.position || '';
      target.style.position = 'relative';
    }
    target.setAttribute(overlayTargetAttr, 'true');
    target.setAttribute(overlayOriginalPositionAttr, originalPosition);
    return target;
  }

  function restoreOverlayTarget() {
    var target = document.querySelector('[' + overlayTargetAttr + '="true"]');
    if (!target) {
      return;
    }
    var originalPosition = target.getAttribute(overlayOriginalPositionAttr);
    if (originalPosition === '') {
      target.style.removeProperty('position');
    } else if (originalPosition !== null) {
      target.style.position = originalPosition;
    }
    target.removeAttribute(overlayTargetAttr);
    target.removeAttribute(overlayOriginalPositionAttr);
  }

  function isAllowedTargetChild(element) {
    if (!element || element.nodeType !== 1) {
      return false;
    }
    if (element.id === overlayId || element.id === footerId) {
      return true;
    }
    return element.matches('.story-topper, .story-byline, .story-body');
  }

  function hideSiblingElements(parent, keepChild) {
    if (!parent || !parent.children) {
      return;
    }
    for (var i = 0; i < parent.children.length; i += 1) {
      var child = parent.children[i];
      if (child !== keepChild) {
        hideElement(child);
      }
    }
  }

  function pruneTargetChildren(target) {
    if (!target || !target.classList || !target.classList.contains('story-container')) {
      return;
    }
    for (var i = 0; i < target.children.length; i += 1) {
      var child = target.children[i];
      if (!isAllowedTargetChild(child)) {
        hideElement(child);
      }
    }
  }

  function focusOnTarget(target) {
    if (!target || target.nodeType !== 1) {
      return;
    }
    pruneTargetChildren(target);
    var current = target;
    while (current && current.parentNode && current.parentNode.nodeType === 1) {
      hideSiblingElements(current.parentNode, current);
      current = current.parentNode;
      if (current === document.body) {
        break;
      }
    }
  }

  function appendLine(element, className, text) {
    if (!text) {
      return;
    }
    var line = document.createElement('div');
    line.className = className;
    line.textContent = text;
    element.appendChild(line);
  }

  function createWatermark(payload, left, top) {
    var watermark = document.createElement('div');
    watermark.className = 'ftc-share-watermark';
    watermark.style.left = left;
    watermark.style.top = top;

    appendLine(watermark, 'ftc-share-watermark-primary', payload.watermarkPrimary || '');
    appendLine(watermark, 'ftc-share-watermark-meta', payload.watermarkSecondary || '');
    return watermark;
  }

  function createOverlay(payload, themeNight, target) {
    var overlay = document.createElement('div');
    var bodyNode = document.getElementById('ios-story-body');
    var storyBody = bodyNode ? bodyNode.closest('.story-body') : null;
    var targetHeight = Math.max(
      bodyNode ? bodyNode.offsetTop + Math.max(bodyNode.scrollHeight, bodyNode.offsetHeight) : 0,
      storyBody ? storyBody.offsetTop + Math.max(storyBody.scrollHeight, storyBody.offsetHeight) : 0,
      target ? target.offsetHeight : 0
    );
    var rowSpacing = 430;
    var topPadding = 150;
    var columns = ['12%', '58%'];
    var rowCount = Math.max(5, Math.ceil((targetHeight - 120) / rowSpacing));

    overlay.id = overlayId;
    overlay.style.height = targetHeight + 'px';
    if (themeNight) {
      overlay.className = 'theme-night';
    }

    for (var row = 0; row < rowCount; row += 1) {
      var top = topPadding + row * rowSpacing;
      if (top > targetHeight - 120) {
        break;
      }
      var column = row % columns.length;
      var horizontalOffset = row % 4 < 2 ? 0 : 10;
      overlay.appendChild(
        createWatermark(
          payload || {},
          'calc(' + columns[column] + ' + ' + horizontalOffset + 'px)',
          top + 'px'
        )
      );
    }

    return overlay;
  }

  function createFooter(payload, themeNight) {
    var footer = document.createElement('div');
    footer.id = footerId;
    footer.className = themeNight ? 'theme-night' : '';

    appendLine(footer, 'ftc-share-footer-note', payload.notice || '');

    var main = document.createElement('div');
    main.className = 'ftc-share-footer-main';

    var copy = document.createElement('div');
    copy.className = 'ftc-share-footer-copy';
    appendLine(copy, 'ftc-share-footer-title', payload.footerTitle || '');
    appendLine(copy, 'ftc-share-footer-body', payload.footerBody || '');
    main.appendChild(copy);

    if (payload.qrCodeDataUrl) {
      var qr = document.createElement('div');
      qr.className = 'ftc-share-footer-qr';

      var image = document.createElement('img');
      image.alt = payload.qrCodeAlt || 'FT中文网 App 下载二维码';
      image.src = payload.qrCodeDataUrl;
      qr.appendChild(image);

      appendLine(qr, 'ftc-share-footer-qr-text', payload.qrCodeText || '');
      main.appendChild(qr);
    }

    footer.appendChild(main);
    return footer;
  }

  function appendFooter(target, footer) {
    if (!target || !footer) {
      return;
    }
    var bodyNode = document.getElementById('ios-story-body');
    var storyBody = bodyNode ? bodyNode.closest('.story-body') : null;
    if (storyBody && storyBody.parentNode === target) {
      if (storyBody.nextSibling) {
        target.insertBefore(footer, storyBody.nextSibling);
      } else {
        target.appendChild(footer);
      }
      return;
    }
    target.appendChild(footer);
  }

  function mount(payload) {
    if (!document.body || !document.head) {
      return false;
    }

    unmount();
    ensureStyle();

    var themeNight = isNightMode();
    var target = ensureOverlayTarget(getMountTarget());
    if (!target) {
      return false;
    }
    activeTarget = target;
    document.body.classList.add('is-screenshot');
    hideMatchedElements();
    focusOnTarget(target);
    startMutationObserver();
    target.appendChild(createOverlay(payload, themeNight, target));
    appendFooter(target, createFooter(payload || {}, themeNight));

    return true;
  }

  function unmount() {
    stopMutationObserver();
    activeTarget = null;
    removeElementById(overlayId);
    removeElementById(footerId);
    restoreHiddenElements();
    restoreOverlayTarget();
    if (document.body) {
      document.body.classList.remove('is-screenshot');
    }
  }

  global.FTCShareScreenshotHelper = {
    mount: mount,
    unmount: unmount
  };
})(window);
