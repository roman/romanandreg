var MenuHiglighter = new Class({
  
  Implements: [Options],
  options: {
    items: null,
    titleSpace: null,
    hoverClass: "hover"
  },
  
  initialize: function(options) {
    this.setOptions(options);
    this.options.items = $$(this.options.items);
    this.options.titleSpace = $(this.options.titleSpace);
    this.options.titleSpace.set("tween", { duration: "normal" });
    this.addBehaviorToMenuItems();
  },

  addBehaviorToMenuItems: function() {
    $$(this.options.items).each(function(item){
      item.addEvent("mouseover", this.mouseInItem.bind(this, item));
      item.addEvent("mouseout", this.mouseOutItem.bind(this,item));
    }, this);
  },
  
  changeTitleSpace: function(item, recoverTitle) {
    var titleable = this.getElementWithItemTitle(item);
    if(!recoverTitle) {
      this.setToTitleSpace(titleable.get("title"));
      titleable.set("title", "");
    }
    else {
      titleable.set("title", this.getFromTitleSpace());
    }
  },
  
  getElementWithItemTitle: function(item) {
    return item.getElement("a");
  },
  
  setToTitleSpace: function(text) {
    this.options.titleSpace.set("html", text)
    this.options.titleSpace.fade("in");
  },
    
  getFromTitleSpace: function() {
    this.options.titleSpace.fade("out");
    return this.options.titleSpace.get("html");
  },
  
  fadeAllItemsExcept: function(currentItem) {
    this.options.items.each(function(item){
      if (currentItem == item) { return; }
      item.tween("opacity", 0.5);
    });
  },
  
  showAllItems: function() {
    this.options.items.each(function(item){
      item.tween("opacity", 1);
    });
  },
  
  mouseInItem: function(listItem) {
    listItem.addClass(this.options.hoverClass);
    this.changeTitleSpace(listItem);
    this.fadeAllItemsExcept(listItem);
  },
  
  mouseOutItem: function(listItem) {
    listItem.removeClass(this.options.hoverClass);
    this.changeTitleSpace(listItem, true);
    this.showAllItems();
  }
  
});

var Scroller = new Class({
  Implements: [Options],
  options: {
    items: null,
    clickers: null
  },
  
  initialize: function(options) {
    this.setOptions(options);
    this.buildMask();
    this.buildScroll();
    this.fetchClickers();
    this.fetchItems();
    this.appendScrollToMask();
    this.getItemMeasure();
    this.resizeScroll();
  },
  
  buildScroll: function() {
    this.scroll = new Element("div", { "class": "scroll" });
    this.scroll.set("tween", { duration: 'long', transition: "cubic:in:out" });
  },
  
  buildMask: function() {
    this.mask = new Element("div", { "class": "mask" });
  },
  
  fetchClickers: function() {
    this.clickers = $$(this.options.clickers);
    this.clickers.each(function(clicker, index){
      clicker.addEvent("click", this.onClickerClick.bindWithEvent(this, index));
    }, this);
  },
  
  fetchItems: function() {
    this.items = $$(this.options.items);
    this.moveItemsToScroll();
  },
  
  moveItemsToScroll: function() {
    var scrollParent = this.items[0].parentNode;
    this.items.each(function(item){
      item.dispose();
      this.scroll.appendChild(item);
    }, this);
    scrollParent.appendChild(this.scroll);
  },
  
  appendScrollToMask: function() {
    var parentNode = this.scroll.parentNode;
    this.scroll.dispose();
    this.mask.appendChild(this.scroll);
    parentNode.appendChild(this.mask);
  },
  
  getItemMeasure: function() {
    var firstItem = this.items[0];
    var scrollParent = firstItem.parentNode;
    this.itemMeasure = firstItem.getSize();
  },
  
  resizeScroll: function() {
    var scrollWidth = this.itemMeasure.x * this.items.length;
    this.scroll.setStyle("width", scrollWidth);
  },
  
  onClickerClick: function(event, index) {
    event.stop();
    this.scrollTo(index);
  },
  
  scrollTo: function(index) {
    var scrollDistance = this.itemMeasure.x * index;
    this.scroll.tween("left", -scrollDistance);
  }
  
});

var ListItemSelector = new Class({
  
  initialize: function(items) {
    this.items = $$(items);
    this.addBehaviorToItems();
  },
  
  addBehaviorToItems: function() {
    this.items.each(function(item) {
      var without = this.items.filter(function(it){ return it != item });
      var anchor = item.getElement("a");
      anchor.addEvent("click", function(event) {
        event.stop();
        without.each(function(it) { it.removeClass("selected"); });
        item.addClass("selected");
      });
    }, this);
  }
  
})

window.addEvent("domready", function() {
  new MenuHiglighter({
    items: "#menu ul li",
    titleSpace: "title-space"
  });
  new Scroller({
    clickers: "#menu ul li a",
    items: "#main div"
  });
  new ListItemSelector('#menu ul li');
});
