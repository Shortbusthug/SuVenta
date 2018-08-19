var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.clear();

//  +++++ UTIL FUNCTIONS
var fetchData = function fetchData(url) {
  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var _data = data.genericOfferItems;
    console.log('consume data: ', _data);
  }).catch(function (err) {
    console.log('fetch error', err);
  });
};
var MobPlatformCheck = function MobPlatformCheck() {
  var currURLX = window.location;
  var mob_preURL_str = 'm.snapdeal.com';
  currURLX = String(currURLX);
  var mobileSite_running = currURLX.indexOf(mob_preURL_str) > 0 ? true : false;
  return mobileSite_running;
};
var isISObject = function isISObject(obj) {
  return obj && obj !== 'null' && obj !== 'undefined';
};
var isLegit_pogId_item = function isLegit_pogId_item(item) {
  if (isISObject(item.commonMinProductDetailsDTO) && isISObject(item.commonMinProductDetailsDTO.priceInfo)) {
    return true;
  } else {
    return false;
  }
};
var isLegit_vendorDTO_item = function isLegit_vendorDTO_item(item) {
  if (isLegit_pogId_item(item) && isISObject(item.commonMinProductDetailsDTO.vendorDTO)) {
    return true;
  } else {
    return false;
  }
};

//  +++++ REACT CONTAINERS & COMPONENTS
var _React = React,
    Component = _React.Component;

// +++++ COMPONENTS & SUB-COMPONENTS
// +++++ IMAGE COMPONENTS

var BlazyImg = function BlazyImg(_ref) {
  var offerImageUrl = _ref.offerImageUrl,
      offerName = _ref.offerName;

  return React.createElement('img', {
    className: 'offerUnit_img OfferImg b-lazy',
    'data-src': offerImageUrl,
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    alt: offerName });
};
var ImgOfferUnit = function ImgOfferUnit(_ref2) {
  var item = _ref2.item;

  var offerImageUrl = void 0,
      userDefined_offerImageUrl = void 0,
      sdgold = void 0,
      offerName = void 0;
  offerName = item.offerName ? item.offerName : '';
  if (MobPlatformCheck()) {
    userDefined_offerImageUrl = item.mobileOfferImageUrl;
  } else {
    userDefined_offerImageUrl = item.webOfferImageUrl;
  }
  if (isLegit_pogId_item(item)) {
    offerImageUrl = userDefined_offerImageUrl ? userDefined_offerImageUrl : item.commonMinProductDetailsDTO.imgs[0];
    sdgold = item.commonMinProductDetailsDTO.vendorDTO.sdgold;
  } else {
    offerImageUrl = userDefined_offerImageUrl;
  }
  if (sdgold) {
    return React.createElement(
      'div',
      { className: 'offerUnit_imgWrap_sdPlusInc_rel' },
      React.createElement(SdPlusLogo, null),
      React.createElement(BlazyImg, { offerImageUrl: offerImageUrl, offerName: offerName })
    );
  } else {
    return React.createElement(
      'div',
      { className: 'offerUnit_imgWrap_sdPlusInc_rel' },
      React.createElement(BlazyImg, { offerImageUrl: offerImageUrl, offerName: offerName })
    );
  }
};

// +++++ LINK
var OfferLink = function OfferLink(_ref3) {
  var item = _ref3.item,
      children = _ref3.children;

  var OfferURL = void 0;
  var mobileLandingUrl = item.mobileLandingUrl,
      webLandingUrl = item.webLandingUrl;

  if (MobPlatformCheck()) {
    OfferURL = mobileLandingUrl ? mobileLandingUrl : webLandingUrl;
  } else {
    OfferURL = webLandingUrl;
  }
  return React.createElement(
    'a',
    { href: OfferURL, target: '_blank', className: 'offerUnit_href' },
    children
  );
};

// +++++ WRAPPERS
var OfferLinkAfterWrap = function OfferLinkAfterWrap(_ref4) {
  var children = _ref4.children;

  return React.createElement(
    'div',
    { className: 'offerUnit_href_afterWrap' },
    children
  );
};
var OfferNonImgWrap = function OfferNonImgWrap(_ref5) {
  var children = _ref5.children;

  return React.createElement(
    'div',
    { className: 'offerUnit_nonImgContWrap' },
    children
  );
};

// +++++ PRICE TAGLINE DISCOUNT
var OfferPriceTaglineDiscountWrap = function OfferPriceTaglineDiscountWrap(_ref6) {
  var item = _ref6.item;

  if (isLegit_pogId_item(item)) {
    var _item$commonMinProduc = item.commonMinProductDetailsDTO.priceInfo,
        finalPrice = _item$commonMinProduc.finalPrice,
        mrp = _item$commonMinProduc.mrp,
        discount = _item$commonMinProduc.discount;
    //price & discount

    return React.createElement(
      'div',
      { className: 'offerUnit_priceTaglineWrap_rel' },
      React.createElement(GetOfferPriceMRP, { price: finalPrice, mrp: mrp }),
      React.createElement(GetOfferDiscountUnit, { discount: discount })
    );
  } else {
    //tagLine
    return React.createElement(
      'div',
      { className: 'offerUnit_priceTaglineWrap_rel' },
      React.createElement(GetTagLineUnit, { item: item })
    );
  }
};
// +++++ PRICE
var GetOfferPriceMRP = function GetOfferPriceMRP(_ref7) {
  var price = _ref7.price,
      mrp = _ref7.mrp;

  if (price === mrp) {
    return React.createElement(OfferPriceOnly, { price: price });
  } else {
    return React.createElement(OfferPriceMRP, { price: price, mrp: mrp });
  }
};
var OfferPriceOnly = function OfferPriceOnly(_ref8) {
  var price = _ref8.price;

  return React.createElement(
    'div',
    { className: 'offerUnit_priceWrap' },
    React.createElement(
      'span',
      { className: 'offerUnit_priceWrapAll' },
      React.createElement(
        'span',
        { className: 'offerUnit_displayPrice' },
        'Rs. ' + price
      )
    )
  );
};
var OfferPriceMRP = function OfferPriceMRP(_ref9) {
  var mrp = _ref9.mrp,
      price = _ref9.price;

  return React.createElement(
    'div',
    { className: 'offerUnit_priceWrap' },
    React.createElement(
      'span',
      { className: 'offerUnit_priceWrapAll' },
      React.createElement(
        'span',
        { className: 'offerUnit_price' },
        'Rs. ' + mrp
      ),
      React.createElement(
        'span',
        { className: 'offerUnit_displayPrice' },
        'Rs. ' + price
      )
    )
  );
};
// +++++ DISCOUNT
var OfferDiscountUnit = function OfferDiscountUnit(_ref10) {
  var discount = _ref10.discount;
  return React.createElement(
    'div',
    { className: 'offerUnit_discountWrap' },
    React.createElement(
      'div',
      { className: 'offerUnit_discount' },
      discount + '% Off'
    )
  );
};
var GetOfferDiscountUnit = function GetOfferDiscountUnit(_ref11) {
  var discount = _ref11.discount;

  if (!discount || discount === null || discount === 0) {
    return null;
  } else {
    if (discount > 10) {
      return OfferDiscountUnit({ discount: discount });
    } else {
      return null;
    }
  }
};
// +++++ TAGLINE
var TagLineUnit = function TagLineUnit(_ref12) {
  var tagline = _ref12.tagline;
  return React.createElement(
    'div',
    { className: 'offerUnit_taglineWrap' },
    React.createElement(
      'div',
      { className: 'offerUnit_tagline' },
      tagline
    )
  );
};
var GetTagLineUnit = function GetTagLineUnit(_ref13) {
  var item = _ref13.item;

  var tagline = item.extraField1;
  return TagLineUnit({ tagline: tagline });
};

// +++++ OfferRatingWrap
var getRatingElemWidth = function getRatingElemWidth(rating) {
  var widthFactor = 0;
  var maxWidth = 70;
  var val = rating.toString();
  if (val < 1 || val > 5) {
    return false;
  }
  widthFactor = val / 5 * 100 / 100 * maxWidth;
  widthFactor = Math.round(widthFactor * 10) / 10;
  return widthFactor;
};
// +++++ NoOfReviews
var NoOfReviews = function NoOfReviews(_ref14) {
  var noOfReviews = _ref14.noOfReviews;
  return React.createElement(
    'span',
    { className: 'numberRevsX' },
    '(' + noOfReviews + ')'
  );
};
// +++++ RATING
var OfferRating = function OfferRating(_ref15) {
  var ratingWidthFactor = _ref15.ratingWidthFactor;
  return React.createElement(
    'div',
    { className: 'offerUnit_rating_rel' },
    React.createElement('div', { className: 'ratingBG_disabled' }),
    React.createElement('div', { className: 'ratingBG_active', style: { width: ratingWidthFactor } })
  );
};
var OfferRatingWrap = function OfferRatingWrap(_ref16) {
  var item = _ref16.item;

  if (!isLegit_pogId_item(item)) {
    return React.createElement('div', { className: 'offerUnit_ratingWrap' });
  } else {
    var noOfreviews = item.commonMinProductDetailsDTO.noOfreviews;

    var avgRating = item.commonMinProductDetailsDTO.avgRating;
    var ratingWidthFactor = getRatingElemWidth(avgRating);
    if (noOfreviews && avgRating) {
      return React.createElement(
        'div',
        { className: 'offerUnit_ratingWrap' },
        React.createElement(OfferRating, { ratingWidthFactor: ratingWidthFactor }),
        React.createElement(NoOfReviews, { noOfReviews: noOfreviews })
      );
    } else {
      return React.createElement(
        'div',
        { className: 'offerUnit_ratingWrap' },
        React.createElement(OfferRating, { ratingWidthFactor: ratingWidthFactor })
      );
    }
  }
};

var SdPlusLogo = function SdPlusLogo() {
  return React.createElement('div', { className: 'offerUnit_sdPlusWrap_abs' });
};

var TitleOfferUnit = function TitleOfferUnit(_ref17) {
  var item = _ref17.item;

  var title = void 0;
  if (isLegit_pogId_item(item)) {
    title = item.offerName ? item.offerName : item.commonMinProductDetailsDTO.title;
  } else {
    title = item.offerName;
  }
  return React.createElement(
    'div',
    { className: 'offerUnit_title twoLine_TitleX99' },
    title
  );
};
var OfferUnitLi = function OfferUnitLi(_ref18) {
  var item = _ref18.item,
      i = _ref18.i;

  return React.createElement(
    'li',
    { className: 'OfferUnitX99 OffersContentBoxLi', key: i },
    React.createElement(
      'div',
      { className: 'offerUnit_innerContWrap' },
      React.createElement(
        OfferLink,
        { item: item },
        React.createElement(
          OfferLinkAfterWrap,
          null,
          React.createElement(ImgOfferUnit, { item: item }),
          React.createElement(
            OfferNonImgWrap,
            null,
            React.createElement(TitleOfferUnit, { item: item }),
            React.createElement(OfferPriceTaglineDiscountWrap, { item: item }),
            React.createElement(OfferRatingWrap, { item: item })
          )
        )
      )
    )
  );
};

//CONTAINER

var OfferContainer = function (_Component) {
  _inherits(OfferContainer, _Component);

  function OfferContainer(props) {
    _classCallCheck(this, OfferContainer);

    var _this = _possibleConstructorReturn(this, (OfferContainer.__proto__ || Object.getPrototypeOf(OfferContainer)).call(this, props));

    _this.state = {
      data: []
    };
    return _this;
  }

  _createClass(OfferContainer, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //lifeCycle
      console.log('component will mount.. . .');
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      //lifeCycle
      console.log('component did mount. . .');
      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        var _data = data.genericOfferItems;
        console.log('consume data: ', _data);
        _this2.setState({ data: _data });
        //console.log('updated container state: ', this.state.data);
      }).catch(function (err) {
        console.log('fetch error', err);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      //_contentX99_Wrapper.style.opacity = 1;    
      //lifeCycle
      console.log('component is rendering. . .');
      //run lazyLoad
      setTimeout(function () {
        var blazy = new Blazy({
          loadInvisible: true
        });
      }, 100);

      document.getElementById('mainWrapperX_newX999').style.opacity = 1;

      return React.createElement(
        'ul',
        { className: 'offers_WrapperX99 relFontSize_util' },
        this.state.data.map(function (item, i) {
          return React.createElement(OfferUnitLi, { item: item, key: i });
        })
      );
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      //lifeCycle
      console.log('component did update. . .');
      _preLoader_Wrapper.style.opacity = 0;
      _preLoader_Wrapper.style.height = '0px';
    }
  }]);

  return OfferContainer;
}(Component);

// +++++ INIT APP


var _contentX99_Wrapper = document.getElementsByClassName('contentX99_Wrapper')[0];
var MountNode = document.getElementById('root');
var _preLoader_Wrapper = document.getElementsByClassName('preLoader_Wrapper')[0];
var url = 'https://codepen.io/TheEnd/pen/QGojMQ.js';

var _inactive = document.getElementsByClassName('inactive');
function preLoader_animation() {
  console.log('preLoader_animation running. . .');
  for (var i = 0; i < _inactive.length; i++) {
    _inactive[i].classList.add('preData_loading');
  }
}

preLoader_animation();

ReactDOM.render(React.createElement(OfferContainer, null), MountNode);